"use client";

import DataTable from "@/components/modules/data-table/DataTable";

import { teacherColumns } from "./teacher-columns";
import { adminTeacherRows } from "./teacher-table-data";

export default function AdminTeachersTable() {
  return (
    <DataTable
      title="Teacher directory"
      subtitle="A reusable headless table pattern for admin resource pages."
      columns={teacherColumns}
      data={adminTeacherRows}
      getRowId={(row) => row.id}
      search={{
        placeholder: "Search teacher by name, email, or specialty",
        getText: (row) => `${row.name} ${row.email} ${row.specialty}`,
      }}
      emptyMessage="No teacher records found."
    />
  );
}
