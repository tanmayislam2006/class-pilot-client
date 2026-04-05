"use client";

import React from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import DataTable, { DataTableColumn } from "@/components/modules/data-table/DataTable";
import { toast } from "sonner";
import { TeacherAllQuizItem } from "@/types/teacher.types";

interface AllQuizzesTableClientProps {
  initialData: TeacherAllQuizItem[];
}

export default function AllQuizzesTableClient({ initialData }: AllQuizzesTableClientProps) {
  const router = useRouter();
  
  const toggleMutation = useMutation({
    mutationFn: async ({ batchId, quizId, isPublished }: { batchId: string, quizId: string, isPublished: boolean }) => {
      const res = await fetch(`/api/teacher/batches/${batchId}/quizzes/${quizId}/publish`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quiz: { isPublished } })
      });
      if (!res.ok) throw new Error("Failed to toggle publish");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Publication status updated");
      router.refresh();
    },
    onError: (e: Error) => toast.error(e.message || "Something went wrong")
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ batchId, quizId }: { batchId: string, quizId: string }) => {
      const res = await fetch(`/api/teacher/batches/${batchId}/quizzes/${quizId}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete quiz");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Quiz removed successfully");
      router.refresh();
    },
    onError: (e: Error) => toast.error(e.message || "Failed to delete quiz")
  });

  const columns: DataTableColumn<TeacherAllQuizItem>[] = [
    {
      id: "title",
      header: "Quiz Info",
      cell: (row) => (
        <div className="space-y-1">
          <p className="font-medium text-primary">{row.title}</p>
          <p className="text-xs text-muted-foreground line-clamp-1">{row.description}</p>
        </div>
      ),
    },
    {
      id: "batch",
      header: "Target Batch",
      cell: (row) => <Badge variant="outline" className="bg-primary/5">{row.batch.name}</Badge>,
    },
    {
      id: "duration",
      header: "Duration",
      cell: (row) => <span className="text-sm font-medium">{row.duration} Min</span>,
    },
    {
      id: "publishToggle",
      header: "Published",
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <Button 
            variant={row.isPublished ? "default" : "outline"}
            size="sm"
            className={`h-7 px-3 text-xs ${row.isPublished ? "bg-green-600 hover:bg-green-700 text-white border-green-600" : "text-muted-foreground"}`}
            disabled={toggleMutation.isPending}
            onClick={() => 
               toggleMutation.mutate({ batchId: row.batchId, quizId: row.id, isPublished: !row.isPublished })
            }
          >
             {row.isPublished ? "Published" : "Draft"}
          </Button>
        </div>
      )
    },
    {
      id: "dueDate",
      header: "Due Date",
      cell: (row) => (
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", year: "numeric", hour: "numeric", minute: "numeric" }).format(new Date(row.dueDate))}
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: (row) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
            <Link href={`/teacher/dashboard/all-quiz/${row.batchId}/${row.id}`}>
               View Details
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer sm:hidden">
                <Link href={`/teacher/dashboard/all-quiz/${row.batchId}/${row.id}`}>
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  toast.error("Are you sure you want to permanently delete this quiz?", {
                    action: {
                      label: "Delete",
                      onClick: () => deleteMutation.mutate({ batchId: row.batchId, quizId: row.id })
                    },
                    cancel: {
                      label: "Cancel",
                      onClick: () => {}
                    }
                  });
                }}
                className="text-red-500 focus:text-red-600 cursor-pointer"
              >
                <Trash2 className="mr-2 w-4 h-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      title="All Created Quizzes"
      subtitle={`Showing ${initialData.length} quizzes globally.`}
      columns={columns}
      data={initialData}
      getRowId={(row) => row.id}
      search={{
        placeholder: "Search tests by title or batch...",
        getText: (row) => `${row.title} ${row.batch.name}`,
      }}
      emptyMessage="You have no created quizzes."
    />
  );
}
