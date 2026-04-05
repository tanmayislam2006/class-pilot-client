import { Badge } from "@/components/ui/badge";
import type { DataTableColumn } from "@/components/modules/data-table/DataTable";
import type { TeacherBatchStudent } from "@/types/teacher.types";

export const batchStudentColumns: DataTableColumn<TeacherBatchStudent>[] = [
  {
    id: "name",
    header: "Student",
    cell: (row) => (
      <div className="space-y-1">
        <p className="font-medium flex items-center gap-2">
          {row.user?.name || "Unknown"}
        </p>
        <p className="text-xs text-muted-foreground">{row.user?.email}</p>
      </div>
    ),
  },
  {
    id: "phone",
    header: "Phone",
    cell: (row) => <span className="text-sm">{row.phone}</span>,
  },
  {
    id: "enrollmentDate",
    header: "Enrollment Date",
    cell: (row) => <span className="text-sm">{new Date(row.enrollmentDate).toLocaleDateString()}</span>,
  },
  {
    id: "status",
    header: "Status",
    cell: (row) => (
      <Badge variant={row.user?.status === "ACTIVE" ? "default" : "secondary"}>
        {row.user?.status || "PENDING"}
      </Badge>
    ),
  },
];
