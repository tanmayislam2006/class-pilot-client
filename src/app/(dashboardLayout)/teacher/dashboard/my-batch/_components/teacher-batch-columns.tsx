import { Badge } from "@/components/ui/badge";
import type { DataTableColumn } from "@/components/modules/data-table/DataTable";
import type { TeacherAssignedBatch } from "@/types/teacher.types";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const teacherBatchColumns: DataTableColumn<TeacherAssignedBatch>[] = [
  {
    id: "name",
    header: "Batch Info",
    cell: (row) => (
      <div className="space-y-1">
        <p className="font-medium">{row.name}</p>
        <p className="text-xs text-muted-foreground line-clamp-1">{row.description}</p>
      </div>
    ),
  },
  {
    id: "schedule",
    header: "Schedule",
    cell: (row) => <span className="text-sm">{row.schedule}</span>,
  },
  {
    id: "students",
    header: "Students Enrolled",
    cell: (row) => (
      <Badge variant="secondary" className="px-2">
        {row._count.students} Students
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: (row) => (
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/teacher/dashboard/my-batch/${row.id}`}>
            View Details
          </Link>
        </Button>
      </div>
    ),
  },
];
