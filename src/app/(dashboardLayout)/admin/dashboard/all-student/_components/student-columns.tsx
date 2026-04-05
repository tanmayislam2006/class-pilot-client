import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { DataTableColumn } from "@/components/modules/data-table/DataTable";
import UpdateUserStatusAction from "@/components/modules/dashboard/UpdateUserStatusAction";

import type { AdminStudentRow } from "./student-table-data";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export const studentColumns: DataTableColumn<AdminStudentRow>[] = [
  {
    id: "student",
    header: "Student",
    cell: (row) => (
      <div className="flex items-center gap-3">
        <Avatar className="bg-card shadow-sm">
          <AvatarFallback>{getInitials(row.name)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="font-medium">{row.name}</p>
          <p className="text-sm text-muted-foreground">{row.email}</p>
        </div>
      </div>
    ),
  },
  {
    id: "batch",
    header: "Batch",
    cell: (row) => <span>{row.batch}</span>,
  },
  {
    id: "feeStatus",
    header: "Fee",
    cell: (row) => (
      <Badge
        variant={row.feeStatus === "Paid" ? "default" : "outline"}
        className="rounded-full px-3 py-1"
      >
        {row.feeStatus}
      </Badge>
    ),
  },
  {
    id: "performance",
    header: "Performance",
    cell: (row) => <span>{row.performance}</span>,
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
  {
    id: "actions",
    header: "Actions",
    cell: (row) => (
      <UpdateUserStatusAction userId={row.userId} currentStatus={row.status} />
    ),
  },
];
