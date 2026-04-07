"use client";

import { useQuery } from "@tanstack/react-query";

import DataTable from "@/components/modules/data-table/DataTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { adminQueryKeys, fetchAdminStudentsQuery } from "@/queries/admin";

import { studentColumns } from "./student-columns";
import { mapStudentToRow } from "./student-table-data";

export default function AdminStudentsTable() {
  const { data, error, isPending, isFetching, refetch } = useQuery({
    queryKey: adminQueryKeys.students,
    queryFn: fetchAdminStudentsQuery,
  });

  if (error && !data) {
    return (
      <Alert>
        <AlertTitle>Unable to load students</AlertTitle>
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
      title="Student directory"
      subtitle="Shared table structure with route-specific columns keeps the page component clean."
      columns={studentColumns}
      data={(data?.data ?? []).map(mapStudentToRow)}
      getRowId={(row) => row.id}
      isLoading={isPending}
      search={{
        placeholder: "Search student by name, email, or batch",
        getText: (row) => `${row.name} ${row.email} ${row.batch}`,
      }}
      emptyMessage="No student records found."
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
