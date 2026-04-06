"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DataTableColumn } from "@/components/modules/data-table/DataTable";
import type { StudentQuiz } from "@/types/student.types";
import { format } from "date-fns";
import { CheckCircle2, Clock, PlayCircle } from "lucide-react";
import Link from "next/link";

export const quizColumns: DataTableColumn<StudentQuiz>[] = [
  {
    id: "title",
    header: "Quiz Title",
    cell: (row) => (
      <div className="space-y-1">
        <p className="font-medium">{row.title}</p>
        <p className="text-xs text-muted-foreground line-clamp-1">{row.description}</p>
      </div>
    ),
  },
  {
    id: "batch",
    header: "Batch",
    cell: (row) => <span className="text-sm">{row.batch.name}</span>,
  },
  {
    id: "info",
    header: "Details",
    cell: (row) => (
      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {row.duration} mins
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" />
          {row.questionCount} Qs
        </span>
      </div>
    ),
  },
  {
    id: "dueDate",
    header: "Due Date",
    cell: (row) => (
      <span className="text-sm">
        {format(new Date(row.dueDate), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: (row) => {
      const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
        pending: "secondary",
        submitted: "default",
        overdue: "destructive",
      };
      
      return (
        <Badge variant={variants[row.status] || "outline"} className="capitalize">
          {row.status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: (row) => {
      if (row.status === "submitted") {
        return (
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/submission-history/${row.submission?.id}`}>
              View Result
            </Link>
          </Button>
        );
      }

      if (row.status === "overdue") {
        return (
          <Button variant="ghost" size="sm" disabled className="text-destructive">
            Closed
          </Button>
        );
      }

      return (
        <Button size="sm" className="gap-2" asChild>
          <Link href={`/dashboard/submit-quiz/${row.batchId}/${row.id}`}>
            <PlayCircle className="h-4 w-4" />
            Start Quiz
          </Link>
        </Button>
      );
    },
  },
];
