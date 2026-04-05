"use client";

import { useQuery } from "@tanstack/react-query";

import DataTable from "@/components/modules/data-table/DataTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { teacherQueryKeys, fetchTeacherBatchesQuery } from "@/queries/teacher";

import { teacherBatchColumns } from "./teacher-batch-columns";

export default function MyBatchesTable() {
  const { data, error, isPending, isFetching, refetch } = useQuery({
    queryKey: teacherQueryKeys.myBatches,
    queryFn: fetchTeacherBatchesQuery,
  });

  if (error && !data) {
    return (
      <Alert>
        <AlertTitle>Unable to load your batches</AlertTitle>
        <AlertDescription className="mt-2 flex items-center justify-between gap-3">
          <span>{error.message}</span>
          <Button variant="outline" onClick={() => void refetch()}>
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <DataTable
      title="My Batches"
      subtitle="Select a batch to view enrolled students and manage operations."
      columns={teacherBatchColumns}
      data={data?.data ?? []}
      getRowId={(row) => row.id}
      search={{
        placeholder: "Search batch by name or schedule",
        getText: (row) => `${row.name} ${row.schedule}`,
      }}
      emptyMessage="You have no assigned batches."
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
  );
}
