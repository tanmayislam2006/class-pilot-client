import { Badge } from "@/components/ui/badge";
import type { DataTableColumn } from "@/components/modules/data-table/DataTable";

import type { AdminBadgeRow } from "./badge-table-data";

export const badgeColumns: DataTableColumn<AdminBadgeRow>[] = [
  {
    id: "name",
    header: "Badge",
    cell: (row) => (
      <div className="space-y-1">
        <p className="font-medium">{row.name}</p>
        <p className="text-sm text-muted-foreground">{row.category}</p>
      </div>
    ),
  },
  {
    id: "audience",
    header: "Audience",
    cell: (row) => <span>{row.audience}</span>,
  },
  {
    id: "totalAwarded",
    header: "Awarded",
    cell: (row) => <span>{row.totalAwarded}</span>,
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
