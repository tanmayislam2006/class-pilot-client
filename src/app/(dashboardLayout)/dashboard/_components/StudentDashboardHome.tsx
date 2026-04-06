"use client";

import { useQuery } from "@tanstack/react-query";
import { BookOpen, CreditCard, SendHorizontal, Trophy, Loader2 } from "lucide-react";

import RoleDashboardHome from "@/components/modules/dashboard/RoleDashboardHome";
import { studentRoutes } from "@/routes";
import { studentQueryKeys, fetchStudentDashboardQuery } from "@/queries/student";

export default function StudentDashboardHome() {
  const { data, isLoading, error } = useQuery({
    queryKey: studentQueryKeys.dashboard,
    queryFn: fetchStudentDashboardQuery,
  });

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-destructive font-medium">Failed to load dashboard data</p>
        <p className="text-muted-foreground text-sm">{error?.message || "Unknown error"}</p>
      </div>
    );
  }

  const { summary } = data.data;

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
    <RoleDashboardHome
      eyebrow="Student workspace"
      title="Keep up with quizzes, submissions, and your academic progress."
      description="Track upcoming work, monitor your recent activity, and move through your quiz workflow from one clean dashboard."
      metrics={metrics}
      routes={studentRoutes}
    />
  );
}
