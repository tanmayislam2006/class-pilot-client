"use client";

import { useQuery } from "@tanstack/react-query";

import DataTable from "@/components/modules/data-table/DataTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { adminQueryKeys, fetchAdminBatchesQuery } from "@/queries/admin";

import { batchColumns } from "./batch-columns";
import { mapBatchToRow } from "./batch-table-data";

export default function AdminBatchesTable() {
  const { data, error, isPending, isFetching, refetch } = useQuery({
    queryKey: adminQueryKeys.batches,
    queryFn: fetchAdminBatchesQuery,
  });
  if (error && !data) {
    return (
      <Alert>
        <AlertTitle>Unable to load batches</AlertTitle>
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
      title="Batch directory"
      subtitle="Admin resource tables can prefetch on the server and hydrate into client-side queries cleanly."
      columns={batchColumns}
      data={(data?.data ?? []).map(mapBatchToRow)}
      getRowId={(row) => row.id}
      search={{
        placeholder: "Search batch by name, teacher, or schedule",
        getText: (row) => `${row.name} ${row.teacherName} ${row.schedule}`,
      }}
      emptyMessage="No batch records found."
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
