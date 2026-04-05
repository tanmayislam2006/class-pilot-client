"use client";

import { useCallback, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  CalendarDays,
  Check,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  Clock,
  Loader2,
  RefreshCw,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { teacherQueryKeys, fetchTeacherBatchesQuery } from "@/queries/teacher";
import type {
  AttendanceRecord,
  AttendanceSession,
  AttendanceStatus,
  BatchAttendanceResponse,
  FetchedAttendanceRecord,
  TeacherBatchStudent,
} from "@/types/teacher.types";

// ─── helpers ────────────────────────────────────────────────────────────────
function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const STATUS_STYLES: Record<
  AttendanceStatus,
  { bg: string; text: string; border: string; pill: string }
> = {
  PRESENT: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-400/50",
    pill: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  },
  ABSENT: {
    bg: "bg-red-500/10 dark:bg-red-500/20",
    text: "text-red-700 dark:text-red-400",
    border: "border-red-400/50",
    pill: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  },
  LATE: {
    bg: "bg-amber-500/10 dark:bg-amber-500/20",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-400/50",
    pill: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  },
};

// ─── API helpers ─────────────────────────────────────────────────────────────
async function fetchStudentsForBatch(batchId: string) {
  const res = await fetch(`/api/teacher/batches/${batchId}/students`, {
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to load students");
  return data.data as { students: TeacherBatchStudent[]; name: string; schedule: string };
}

async function fetchAttendanceHistory(batchId: string) {
  const res = await fetch(`/api/teacher/batches/${batchId}/attendance`, {
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to load attendance");
  return data.data as BatchAttendanceResponse;
}

async function submitAttendance(
  batchId: string,
  date: string,
  records: AttendanceRecord[],
) {
  const res = await fetch(`/api/teacher/batches/${batchId}/attendance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ attendance: { date: `${date}T00:00:00.000Z`, records } }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to submit attendance");
  return data;
}

// ─── Student Roll Card ───────────────────────────────────────────────────────
interface StudentCardProps {
  student: TeacherBatchStudent;
  status: AttendanceStatus;
  onCycle: () => void;
}

function StudentRollCard({ student, status, onCycle }: StudentCardProps) {
  const style = STATUS_STYLES[status];
  return (
    <button
      type="button"
      onClick={onCycle}
      className={`group relative flex w-full cursor-pointer items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${style.bg} ${style.border}`}
    >
      <Avatar className="h-10 w-10 shrink-0 border-2 border-border/50">
        <AvatarFallback className="text-xs font-medium">
          {getInitials(student.user?.name || "?")}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{student.user?.name || "Unknown"}</p>
        <p className="truncate text-xs text-muted-foreground">{student.user?.email}</p>
      </div>
      <span
        className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${style.pill}`}
      >
        {status === "PRESENT" ? (
          <Check className="h-3 w-3" />
        ) : status === "ABSENT" ? (
          <X className="h-3 w-3" />
        ) : (
          <Clock className="h-3 w-3" />
        )}
        {status}
      </span>
    </button>
  );
}

// ─── Attendance History Session Row ──────────────────────────────────────────
function SessionRow({ session }: { session: AttendanceSession }) {
  const [open, setOpen] = useState(false);

  const presentCount = session.records.filter((r) => r.status === "PRESENT").length;
  const absentCount = session.records.filter((r) => r.status === "ABSENT").length;
  const lateCount = session.records.filter((r) => r.status === "LATE").length;

  return (
    <div className="rounded-xl border border-border/70 bg-card/80 overflow-hidden">
      {/* Session header — clickable */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
          <span className="font-medium text-sm">{formatDate(session.date)}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:flex gap-2 text-xs">
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              {presentCount} present
            </span>
            {absentCount > 0 && (
              <span className="font-medium text-red-600 dark:text-red-400">
                · {absentCount} absent
              </span>
            )}
            {lateCount > 0 && (
              <span className="font-medium text-amber-600 dark:text-amber-400">
                · {lateCount} late
              </span>
            )}
          </span>
          {open ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Expanded student list */}
      {open && (
        <div className="border-t border-border/50 px-5 py-4">
          {session.records.length === 0 ? (
            <p className="text-sm text-muted-foreground">No records for this session.</p>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {session.records.map((record) => {
                const style = STATUS_STYLES[record.status];
                return (
                  <div
                    key={record.id}
                    className={`flex items-center gap-3 rounded-xl border p-3 ${style.bg} ${style.border}`}
                  >
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="text-xs">
                        {getInitials(record.student?.user?.name || "?")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {record.student?.user?.name || "Unknown"}
                      </p>
                      {record.remarks && (
                        <p className="truncate text-xs text-muted-foreground">{record.remarks}</p>
                      )}
                    </div>
                    <span
                      className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold uppercase ${style.pill}`}
                    >
                      {record.status === "PRESENT" ? (
                        <Check className="h-3 w-3" />
                      ) : record.status === "ABSENT" ? (
                        <X className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                      {record.status}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function AttendanceSheet() {
  const [selectedBatchId, setSelectedBatchId] = useState<string>("");
  const [date, setDate] = useState(todayISO());
  // Tracks manual overrides only — keyed by studentId
  const [userOverrides, setUserOverrides] = useState<Record<string, AttendanceStatus>>({});
  const queryClient = useQueryClient();

  // Fetch teacher's batches for the selector
  const { data: batchesData, isPending: batchesPending } = useQuery({
    queryKey: teacherQueryKeys.myBatches,
    queryFn: fetchTeacherBatchesQuery,
  });

  // Fetch students when batch is selected
  const { data: batchDetails, isPending: studentsPending } = useQuery({
    queryKey: ["batch-roll-call", selectedBatchId],
    queryFn: () => fetchStudentsForBatch(selectedBatchId),
    enabled: !!selectedBatchId,
  });

  // Fetch attendance history for the selected batch
  const { data: historyData, isPending: historyPending } = useQuery({
    queryKey: teacherQueryKeys.batchAttendance(selectedBatchId),
    queryFn: () => fetchAttendanceHistory(selectedBatchId),
    enabled: !!selectedBatchId,
  });

  const students = useMemo(() => batchDetails?.students ?? [], [batchDetails]);

  // Group flat records into sessions by date
  const sessions = useMemo(() => {
    if (!historyData || !historyData.attendance) return [];
    
    const records = historyData.attendance;
    // Group by date (ignoring time)
    const grouped = records.reduce<Record<string, FetchedAttendanceRecord[]>>((acc, record) => {
      // Safely extract just the YYYY-MM-DD part
      const datePart = record.date.split("T")[0]!;
      if (!acc[datePart]) acc[datePart] = [];
      acc[datePart].push(record);
      return acc;
    }, {});

    // Convert to AttendanceSession[]
    const sessionList: AttendanceSession[] = Object.entries(grouped).map(([dateStr, recs]) => ({
      id: dateStr,
      date: recs[0]?.date ?? dateStr,
      batchId: selectedBatchId,
      records: recs,
    }));

    // Sort most recent first
    return sessionList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [historyData, selectedBatchId]);

  // "Baseline" for the selected date: existing session or default PRESENT for all
  const baselineMap = useMemo<Record<string, AttendanceStatus>>(() => {
    if (students.length === 0) return {};
    const base: Record<string, AttendanceStatus> = Object.fromEntries(
      students.map((s) => [s.id, "PRESENT" as AttendanceStatus]),
    );
    const existingSession = sessions.find((s) => s.date.split("T")[0] === date);
    if (existingSession) {
      existingSession.records.forEach((r) => {
        const enrolled = students.find((s) => s.id === r.studentId || s.id === r.student?.id);
        if (enrolled) base[enrolled.id] = r.status;
      });
    }
    return base;
  }, [students, sessions, date]);

  // Merge baseline with any manual overrides the teacher has made this session
  const effectiveStatusMap = useMemo<Record<string, AttendanceStatus>>(
    () => ({ ...baselineMap, ...userOverrides }),
    [baselineMap, userOverrides],
  );

  // Cycle PRESENT → ABSENT → LATE → PRESENT (stores as an override)
  const cycleStatus = useCallback((studentId: string) => {
    setUserOverrides((prev) => {
      const current = prev[studentId] ?? baselineMap[studentId] ?? "PRESENT";
      const next: AttendanceStatus =
        current === "PRESENT" ? "ABSENT" : current === "ABSENT" ? "LATE" : "PRESENT";
      return { ...prev, [studentId]: next };
    });
  }, [baselineMap]);

  // Summary counts
  const counts = useMemo(() => {
    const vals = Object.values(effectiveStatusMap);
    return {
      present: vals.filter((s) => s === "PRESENT").length,
      absent: vals.filter((s) => s === "ABSENT").length,
      late: vals.filter((s) => s === "LATE").length,
    };
  }, [effectiveStatusMap]);

  const markAllPresent = useCallback(() => {
    setUserOverrides(Object.fromEntries(students.map((s) => [s.id, "PRESENT" as AttendanceStatus])));
  }, [students]);

  const markAllAbsent = useCallback(() => {
    setUserOverrides(Object.fromEntries(students.map((s) => [s.id, "ABSENT" as AttendanceStatus])));
  }, [students]);

  const handleBatchChange = (batchId: string) => {
    setSelectedBatchId(batchId);
    setUserOverrides({});
  };

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    setUserOverrides({}); // clear overrides so baseline re-computes for new date
  };

  const { mutate: submit, isPending: submitting } = useMutation({
    mutationFn: () => {
      const records: AttendanceRecord[] = students.map((s) => ({
        studentId: s.id,
        status: effectiveStatusMap[s.id] ?? "PRESENT",
      }));
      return submitAttendance(selectedBatchId, date, records);
    },
    onSuccess: () => {
      toast.success(`Attendance submitted for ${formatDate(date)}!`);
      setUserOverrides({});
      queryClient.invalidateQueries({
        queryKey: teacherQueryKeys.batchAttendance(selectedBatchId),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to submit attendance");
    },
  });

  const batches = batchesData?.data ?? [];
  const alreadySubmittedToday = useMemo(
    () => sessions.some((s) => s.date.split("T")[0] === date),
    [sessions, date],
  );

  return (
    <div className="space-y-6">
      {/* Controls row */}
      <Card className="border-border/70 bg-card/95 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Roll Call Setup</CardTitle>
          <CardDescription>Select a batch and date to begin marking attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 space-y-1.5 min-w-[200px]">
              <label className="text-sm font-medium">Batch</label>
              <select
                value={selectedBatchId}
                onChange={(e) => handleBatchChange(e.target.value)}
                disabled={batchesPending}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
              >
                <option value="">— Select a batch —</option>
                {batches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b._count.students} students)
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 space-y-1.5 min-w-[180px]">
              <label className="text-sm font-medium">Session Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => handleDateChange(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Only show tabs after batch is selected */}
      {selectedBatchId && (
        <Tabs defaultValue="take">
          <TabsList className="mb-4 rounded-xl">
            <TabsTrigger value="take">Take Attendance</TabsTrigger>
            <TabsTrigger value="history">
              History
              {sessions.length > 0 && (
                <span className="ml-2 rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium">
                  {sessions.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* ── Tab 1: Roll-call ── */}
          <TabsContent value="take" className="space-y-4">
            {/* Already submitted banner */}
            {alreadySubmittedToday && (
              <div className="flex items-center gap-3 rounded-xl border border-amber-300/50 bg-amber-50/80 px-4 py-3 text-sm text-amber-800 dark:border-amber-700/40 dark:bg-amber-900/20 dark:text-amber-300">
                <RefreshCw className="h-4 w-4 shrink-0" />
                Attendance for this date was already submitted. You can re-submit to update it.
              </div>
            )}

            {/* Summary bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/70 bg-card/95 px-5 py-4 shadow-sm">
              <div className="flex items-center gap-5 text-sm">
                <span className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                  <Check className="h-4 w-4" /> {counts.present} Present
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-red-600 dark:text-red-400">
                  <X className="h-4 w-4" /> {counts.absent} Absent
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-amber-600 dark:text-amber-400">
                  <Clock className="h-4 w-4" /> {counts.late} Late
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={markAllPresent}>
                  <CheckSquare className="mr-2 h-4 w-4" />
                  All Present
                </Button>
                <Button variant="outline" size="sm" onClick={markAllAbsent}>
                  <X className="mr-2 h-4 w-4" />
                  All Absent
                </Button>
              </div>
            </div>

            {/* Student cards grid */}
            {studentsPending ? (
              <div className="flex items-center justify-center py-16 text-muted-foreground">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Loading students...
              </div>
            ) : students.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
                No students enrolled in this batch yet.
              </div>
            ) : (
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {students.map((student) => (
                  <StudentRollCard
                    key={student.id}
                    student={student}
                    status={effectiveStatusMap[student.id] ?? "PRESENT"}
                    onCycle={() => cycleStatus(student.id)}
                  />
                ))}
              </div>
            )}

            {/* Submit button */}
            {students.length > 0 && (
              <div className="flex justify-end pt-2">
                <Button
                  onClick={() => submit()}
                  disabled={submitting || !date}
                  className="gap-2 px-6"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4" />
                      {alreadySubmittedToday ? "Update Attendance" : "Submit Attendance"}
                    </>
                  )}
                </Button>
              </div>
            )}
          </TabsContent>

          {/* ── Tab 2: History ── */}
          <TabsContent value="history" className="space-y-3">
            {historyPending ? (
              <div className="flex items-center justify-center py-16 text-muted-foreground">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Loading history...
              </div>
            ) : sessions.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
                No attendance sessions recorded yet for this batch.
              </div>
            ) : (
              <div className="space-y-2">
                {sessions.map((session) => (
                  <SessionRow key={session.id} session={session} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
