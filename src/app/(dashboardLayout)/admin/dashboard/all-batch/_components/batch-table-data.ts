import type { Batch } from "@/types/admin.types";

export type AdminBatchRow = {
  id: string;
  name: string;
  quizCount: number;
  schedule: string;
  status: string;
  studentCount: number;
  teacherName: string;
};

function getBatchStatus(endDate?: string) {
  if (!endDate) return "Active";

  return new Date(endDate) > new Date() ? "Active" : "Completed";
}

export function mapBatchToRow(batch: Batch): AdminBatchRow {
  return {
    id: batch.id,
    name: batch.name,
    teacherName: batch.teacher.user.name,
    schedule: batch.schedule ?? "Schedule not set",
    studentCount: batch._count?.students ?? 0,
    quizCount: batch._count?.quizzes ?? 0,
    status: getBatchStatus(batch.endDate),
  };
}
