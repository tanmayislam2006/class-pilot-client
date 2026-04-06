"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import DataTable from "@/components/modules/data-table/DataTable";
import DashboardFeaturePage from "@/components/modules/dashboard/DashboardFeaturePage";
import { studentRoutes } from "@/routes";
import { studentQueryKeys, fetchAssignedQuizzesQuery, fetchStudentDashboardQuery } from "@/queries/student";
import { quizColumns } from "./quiz-columns";

export default function AssignedQuizzesClient() {
  const { data, isLoading } = useQuery({
    queryKey: studentQueryKeys.assignedQuizzes,
    queryFn: fetchAssignedQuizzesQuery,
  });

  const { data: dashboardData } = useQuery({
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

  const { counts, quizzes } = data?.data || { counts: { totalAssigned: 0, submitted: 0, pending: 0, overdue: 0 }, quizzes: [] };
  const avgScore = dashboardData?.data.summary.averageScorePercentage || 0;

  const stats = [
    {
      label: "Available Now",
      value: counts.totalAssigned.toString().padStart(2, "0"),
      note: "Quizzes currently visible for your enrolled courses.",
    },
    {
      label: "Pending",
      value: counts.pending.toString().padStart(2, "0"),
      note: counts.overdue > 0 ? `${counts.overdue} overdue items need attention.` : "No overdue quizzes currently.",
    },
    {
      label: "Completed",
      value: counts.submitted.toString().padStart(2, "0"),
      note: "Finished quizzes are always available for review.",
    },
    {
      label: "Average Score",
      value: `${avgScore}%`,
      note: "Overall academic performance across quizzes.",
    },
  ];

  const steps = [
    {
      title: "Review the latest quiz list",
      description: "Scan assigned assessments and prioritize the ones closing first.",
    },
    {
      title: "Prepare and START",
      description: "Ensure you have a stable connection before hitting 'Start Quiz'.",
    },
    {
      title: "Track your outcomes",
      description: "Review scores and correct answers after each submission to improve.",
    },
  ];

  return (
    <div className="space-y-10">
      <DashboardFeaturePage
        currentHref="/dashboard/all-quiz"
        title="Browse every quiz assigned to your class."
        eyebrow="Student workspace"
        description="Review available quizzes, see what is pending, and jump into submissions from one organized page."
        routes={studentRoutes}
        stats={stats}
        steps={steps}
      />

      <section className="px-1 pb-10">
        <div className="rounded-[24px] border border-border/60 bg-card/40 p-1 shadow-sm transition-all hover:border-border/80 hover:bg-card/60">
          <DataTable
            data={quizzes}
            columns={quizColumns}
            searchKey="title"
            searchPlaceholder="Search quizzes by title..."
          />
        </div>
      </section>
    </div>
  );
}
