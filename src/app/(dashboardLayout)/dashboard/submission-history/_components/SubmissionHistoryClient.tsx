"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import DataTable, { DataTableColumn } from "@/components/modules/data-table/DataTable";
import DashboardFeaturePage from "@/components/modules/dashboard/DashboardFeaturePage";
import { studentRoutes } from "@/routes";
import { studentQueryKeys, fetchSubmissionHistoryQuery } from "@/queries/student";
import { submissionColumns } from "./submission-columns";

export default function SubmissionHistoryClient() {
  const { data, isLoading } = useQuery({
    queryKey: studentQueryKeys.submissionHistory,
    queryFn: fetchSubmissionHistoryQuery,
  });

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const { summary, history } = data?.data || { summary: { totalSubmittedQuizzes: 0, averageScorePercentage: 0, bestScorePercentage: 0 }, history: [] };

  const stats = [
    {
      label: "Recent Attempts",
      value: summary.totalSubmittedQuizzes.toString().padStart(2, "0"),
      note: "Total number of quizzes you have completed.",
    },
    {
      label: "Average Score",
      value: `${summary.averageScorePercentage}%`,
      note: summary.averageScorePercentage >= 50 ? "Your performance is on the right track." : "Keep practicing to improve your average.",
    },
    {
      label: "Best Score",
      value: `${summary.bestScorePercentage}%`,
      note: "Your top performance across all quizzes.",
    },
    {
      label: "Performance Trend",
      value: summary.averageScorePercentage > 0 ? "Analyzed" : "Pending",
      note: "Monitoring your growth across every submission.",
    },
  ];



  return (
    <div className="space-y-10">
      <DashboardFeaturePage
        currentHref="/dashboard/submission-history"
        title="Review your submission timeline and recent results."
        eyebrow="Student workspace"
        description="Inspect previous attempts, monitor marks, and see where your quiz activity is improving."
        routes={studentRoutes}
        stats={stats}
      />

      <section className="px-1 pb-10">
        <div className="rounded-[24px] border border-border/60 bg-card/40 p-1 shadow-sm transition-all hover:border-border/80 hover:bg-card/60">
          <DataTable<{ id: string; quiz: { title: string } }>
            data={history}
            columns={submissionColumns as unknown as DataTableColumn<{ id: string; quiz: { title: string } }>[]}
            getRowId={(row) => row.id}
            search={{
              getText: (row) => row.quiz.title,
              placeholder: "Search by quiz title...",
            }}
          />
        </div>
      </section>
    </div>
  );
}
