"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DataTableColumn } from "@/components/modules/data-table/DataTable";
import type { StudentFee } from "@/types/student.types";
import { format } from "date-fns";
import { CreditCard, Download, ExternalLink } from "lucide-react";

export const feeColumns: DataTableColumn<StudentFee>[] = [
  {
    id: "monthYear",
    header: "Period",
    cell: (row) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.month}</span>
        <span className="text-xs text-muted-foreground">{row.year}</span>
      </div>
    ),
  },
  {
    id: "amount",
    header: "Amount",
    cell: (row) => (
      <span className="font-mono font-medium">
        {row.amount.toLocaleString()} BDT
      </span>
    ),
  },
  {
    id: "dueDate",
    header: "Due Date",
    cell: (row) => (
      <span className="text-sm">
        {format(new Date(row.dueDate), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: (row) => {
      const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
        paid: "default",
        overdue: "destructive",
        pending: "secondary",
      };
      
      return (
        <Badge variant={variants[row.normalizedStatus] || "outline"} className="capitalize">
          {row.normalizedStatus}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: (row) => {
      if (row.status === "PAID") {
        return (
          <Button variant="ghost" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Receipt
          </Button>
        );
      }

      return (
        <Button size="sm" className="gap-2 bg-primary/95 hover:bg-primary">
          <CreditCard className="h-4 w-4" />
          Pay Now
        </Button>
      );
    },
  },
];
