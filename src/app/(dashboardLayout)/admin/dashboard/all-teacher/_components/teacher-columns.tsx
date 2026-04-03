import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { DataTableColumn } from "@/components/modules/data-table/DataTable";

import type { AdminTeacherRow } from "./teacher-table-data";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export const teacherColumns: DataTableColumn<AdminTeacherRow>[] = [
  {
    id: "teacher",
    header: "Teacher",
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
    id: "specialty",
    header: "Specialty",
    cell: (row) => <span>{row.specialty}</span>,
  },
  {
    id: "batches",
    header: "Batches",
    cell: (row) => (
      <Badge variant="outline" className="rounded-full px-3 py-1">
        {row.batches} active
      </Badge>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: (row) => (
      <Badge
        className="rounded-full px-3 py-1"
        variant={row.status === "Active" ? "default" : "outline"}
      >
        {row.status}
      </Badge>
    ),
  },
  {
    id: "joinedAt",
    header: "Joined",
    cell: (row) => <span className="text-muted-foreground">{row.joinedAt}</span>,
  },
];
