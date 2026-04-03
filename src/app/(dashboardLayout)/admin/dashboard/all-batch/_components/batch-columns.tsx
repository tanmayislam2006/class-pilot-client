import { Badge } from "@/components/ui/badge";
import type { DataTableColumn } from "@/components/modules/data-table/DataTable";

import type { AdminBatchRow } from "./batch-table-data";

export const batchColumns: DataTableColumn<AdminBatchRow>[] = [
  {
    id: "name",
    header: "Batch",
    cell: (row) => (
      <div className="space-y-1">
        <p className="font-medium">{row.name}</p>
        <p className="text-sm text-muted-foreground">{row.schedule}</p>
      </div>
    ),
  },
  {
    id: "teacherName",
    header: "Teacher",
    cell: (row) => <span>{row.teacherName}</span>,
  },
  {
    id: "studentCount",
    header: "Students",
    cell: (row) => <span>{row.studentCount}</span>,
  },
  {
    id: "quizCount",
    header: "Quizzes",
    cell: (row) => <span>{row.quizCount}</span>,
  },
  {
    id: "status",
    header: "Status",
    cell: (row) => (
      <Badge
        variant={row.status === "Active" ? "default" : "outline"}
        className="rounded-full px-3 py-1"
      >
        {row.status}
      </Badge>
    ),
  },
];
