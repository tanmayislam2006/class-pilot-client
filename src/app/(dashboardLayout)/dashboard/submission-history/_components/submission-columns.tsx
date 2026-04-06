"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DataTableColumn } from "@/components/modules/data-table/DataTable";
import type { StudentSubmission, StudentQuiz } from "@/types/student.types";
import { format } from "date-fns";
import { Trophy, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";

type SubmissionWithQuiz = StudentSubmission & { quiz: StudentQuiz };

export const submissionColumns: DataTableColumn<SubmissionWithQuiz>[] = [
  {
    id: "quiz",
    header: "Quiz Title",
    cell: (row) => (
      <div className="space-y-1">
        <p className="font-medium">{row.quiz.title}</p>
        <p className="text-xs text-muted-foreground">{row.quiz.batch.name}</p>
      </div>
    ),
  },
  {
    id: "score",
    header: "Score",
    cell: (row) => (
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <span className="text-sm font-semibold">
            {row.score} / {row.totalPoints}
          </span>
          <span className="text-[10px] text-muted-foreground">Points</span>
        </div>
      </div>
    ),
  },
  {
    id: "percentage",
    header: "Percentage",
    cell: (row) => {
      const isHigh = row.percentage >= 80;
      const isLow = row.percentage < 40;
      
      return (
        <div className="flex items-center gap-2">
          <Badge 
            variant={isHigh ? "default" : isLow ? "destructive" : "secondary"}
            className="font-mono"
          >
            {row.percentage}%
          </Badge>
          {isHigh && <Trophy className="h-3.5 w-3.5 text-amber-500" />}
        </div>
      );
    }
  },
  {
    id: "date",
    header: "Submitted At",
    cell: (row) => (
      <div className="flex flex-col text-sm">
        <span>{format(new Date(row.submittedAt), "MMM dd, yyyy")}</span>
        <span className="text-[10px] text-muted-foreground">
          {format(new Date(row.submittedAt), "hh:mm a")}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    header: "Review",
    cell: (row) => (
      <Button variant="ghost" size="sm" className="group gap-2 hover:bg-primary/5 hover:text-primary" asChild>
        <Link href={`/dashboard/submission-history/${row.id}`}>
          <FileText className="h-4 w-4" />
          <span>Details</span>
          <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Button>
    ),
  },
];
