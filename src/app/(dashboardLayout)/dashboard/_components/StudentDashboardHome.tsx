"use client";

import { useQuery } from "@tanstack/react-query";
import { BookOpen, CreditCard, SendHorizontal, Trophy, Loader2, Sparkles } from "lucide-react";

import { studentRoutes } from "@/routes";
import { studentQueryKeys, fetchStudentDashboardQuery } from "@/queries/student";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import RoleDashboardHome from "@/components/modules/dashboard/RoleDashboardHome";

// New specialized components
import BatchOverview from "./BatchOverview";
import ActivityCharts from "./ActivityCharts";
import RecentActivityLists from "./RecentActivityLists";

export default function StudentDashboardHome() {
  const { data, isLoading, error } = useQuery({
    queryKey: studentQueryKeys.dashboard,
    queryFn: fetchStudentDashboardQuery,
  });

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-sm font-medium animate-pulse text-muted-foreground italic">Synchronizing your dashboard workspace...</p>
        </div>
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4 px-4 py-8 text-center max-w-md mx-auto">
        <div className="rounded-full bg-destructive/10 p-3 text-destructive">
             <CreditCard className="size-8" />
        </div>
        <p className="text-destructive font-bold text-lg leading-snug">Sync Failure: Our student console is momentarily unreachable</p>
        <p className="text-muted-foreground text-sm">Reason: {error?.message || "Internal connection error. Please refresh."}</p>
      </div>
    );
  }

  const dashboardData = data?.data;

  if (!dashboardData) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">No dashboard data available.</p>
      </div>
    );
  }

  const { summary, student, charts, recentAssignedQuizzes, recentSubmissions } = dashboardData;

  const metrics = [
    {
      label: "Quizzes Available",
      value: summary.assignedQuizCount.toString().padStart(2, "0"),
      note: `${summary.pendingQuizCount} pending your attempt`,
      icon: BookOpen,
    },
    {
      label: "Pending Submissions",
      value: summary.pendingQuizCount.toString().padStart(2, "0"),
      note: summary.overdueQuizCount > 0 ? `${summary.overdueQuizCount} overdue quizzes` : "Keep up with your deadlines",
      icon: SendHorizontal,
    },
    {
      label: "Fee Updates",
      value: summary.pendingFeeCount.toString().padStart(2, "0"),
      note: `Total due: ${summary.totalUnpaidAmount} BDT`,
      icon: CreditCard,
    },
    {
      label: "Performance",
      value: `${summary.averageScorePercentage}%`,
      note: "Average score across all quizzes",
      icon: Trophy,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. Header Hero Page Section */}
      <RoleDashboardHome
        eyebrow={`Academic session: ${student.batch.name}`}
        title={`Dashboard: Hello, ${student.user.name}`}
        description="Monitor your curriculum progress, track your latest quiz outcomes, and manage academic billing from one interactive hub."
        metrics={metrics}
        routes={studentRoutes}
      />

      {/* 2. Batch & Mentorship Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
           <Badge variant="secondary" className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Batches & Teachers</Badge>
           <div className="h-px flex-1 bg-border/40" />
        </div>
        <BatchOverview student={student} />
      </section>

      {/* 3. Performance & Charts Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
           <Badge variant="secondary" className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Analytics & Trends</Badge>
           <div className="h-px flex-1 bg-border/40" />
        </div>
        <ActivityCharts charts={charts} />
      </section>

      {/* 4. Activity Tracking Lists */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
           <Badge variant="secondary" className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">Real-time Activity</Badge>
           <div className="h-px flex-1 bg-border/40" />
        </div>
        <RecentActivityLists quizzes={recentAssignedQuizzes} submissions={recentSubmissions} />
      </section>

      {/* 5. Quick Welcome Card */}
      <Card className="relative overflow-hidden border-primary/20 bg-[linear-gradient(135deg,rgba(var(--primary),0.05),transparent,rgba(var(--primary),0.03))] p-6 shadow-sm ring-1 ring-primary/10">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Sparkles className="size-20 text-primary" />
          </div>
          <div className="relative space-y-2">
             <h3 className="text-base font-bold text-primary">Your next step awaits</h3>
             <p className="text-sm text-muted-foreground leading-relaxed">
               You have <span className="font-bold text-foreground underline decoration-primary/30 decoration-2">{summary.pendingQuizCount} pending quizzes</span> closing this week. Click on any quiz in the list above to begin your attempt.
             </p>
          </div>
      </Card>
      
      <div className="h-10" /> {/* Bottom Spacing */}
    </div>
  );
}
