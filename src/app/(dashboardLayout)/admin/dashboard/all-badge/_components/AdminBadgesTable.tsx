"use client";

import DataTable from "@/components/modules/data-table/DataTable";

import { badgeColumns } from "./badge-columns";
import { adminBadgeRows } from "./badge-table-data";

export default function AdminBadgesTable() {
  return (
    <DataTable
      title="Badge catalog"
      subtitle="Badge pages can use the exact same table component with their own data model and columns."
      columns={badgeColumns}
      data={adminBadgeRows}
      getRowId={(row) => row.id}
      search={{
        placeholder: "Search badge by name, category, or audience",
        getText: (row) => `${row.name} ${row.category} ${row.audience}`,
      }}
      emptyMessage="No badge records found."
    />
  );
}
