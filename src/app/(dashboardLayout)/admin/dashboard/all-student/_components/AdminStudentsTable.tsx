"use client";

import DataTable from "@/components/modules/data-table/DataTable";

import { studentColumns } from "./student-columns";
import { adminStudentRows } from "./student-table-data";

export default function AdminStudentsTable() {
  return (
    <DataTable
      title="Student directory"
      subtitle="Shared table structure with route-specific columns keeps the page component clean."
      columns={studentColumns}
      data={adminStudentRows}
      getRowId={(row) => row.id}
      search={{
        placeholder: "Search student by name, email, or batch",
        getText: (row) => `${row.name} ${row.email} ${row.batch}`,
      }}
      emptyMessage="No student records found."
    />
  );
}
