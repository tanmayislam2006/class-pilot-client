"use client";

import { useQuery } from "@tanstack/react-query";

import DataTable from "@/components/modules/data-table/DataTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { teacherQueryKeys, fetchBatchStudentsQuery } from "@/queries/teacher";
import { batchStudentColumns } from "./batch-student-columns";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface BatchStudentsTableProps {
  batchId: string;
}

export default function BatchStudentsTable({ batchId }: BatchStudentsTableProps) {
  const { data, error, isPending, isFetching, refetch } = useQuery({
    queryKey: teacherQueryKeys.batchStudents(batchId),
    queryFn: () => fetchBatchStudentsQuery(batchId),
  });

  if (error && !data) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/teacher/dashboard/my-batch">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Batches
          </Link>
        </Button>
        <Alert>
          <AlertTitle>Unable to load students</AlertTitle>
          <AlertDescription className="mt-2 flex items-center justify-between gap-3">
            <span>{error.message}</span>
            <Button variant="outline" onClick={() => void refetch()}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const batchData = data?.data;
  const students = batchData?.students ?? [];

  return (
    <div className="space-y-4">
      <div>
        <Button variant="ghost" asChild className="mb-4 -ml-2">
          <Link href="/teacher/dashboard/my-batch">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Batches
          </Link>
        </Button>
      </div>
      <DataTable
        title={`Students in ${batchData?.name || "Batch"}`}
        subtitle={`${students.length} students enrolled. Schedule: ${batchData?.schedule || ""}`}
        columns={batchStudentColumns}
        data={students}
        getRowId={(row) => row.id}
        search={{
          placeholder: "Search by student name or email",
          getText: (row) => `${row.user?.name} ${row.user?.email} ${row.phone}`,
        }}
        emptyMessage="No students are enrolled in this batch yet."
        toolbarAction={
          <Button
            variant="outline"
            onClick={() => void refetch()}
            disabled={isPending || isFetching}
          >
            {isPending || isFetching ? "Refreshing..." : "Refresh"}
          </Button>
        }
      />
    </div>
  );
}
