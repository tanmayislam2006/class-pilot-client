"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type DataTableColumn<TData> = {
  id: string;
  header: React.ReactNode;
  cell: (row: TData) => React.ReactNode;
  className?: string;
  headerClassName?: string;
};

type DataTableProps<TData> = {
  columns: DataTableColumn<TData>[];
  data: TData[];
  emptyMessage?: string;
  getRowId: (row: TData) => string;
  search?: {
    getText: (row: TData) => string;
    placeholder?: string;
  };
  subtitle?: string;
  title?: string;
  toolbarAction?: React.ReactNode;
};

export default function DataTable<TData>({
  columns,
  data,
  emptyMessage = "No data available.",
  getRowId,
  search,
  subtitle,
  title,
  toolbarAction,
}: DataTableProps<TData>) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filteredRows = useMemo(() => {
    if (!search || !deferredQuery) {
      return data;
    }

    return data.filter((row) =>
      search.getText(row).toLowerCase().includes(deferredQuery),
    );
  }, [data, deferredQuery, search]);

  return (
    <div className="rounded-[28px] border border-border/70 bg-card/95 shadow-[0_24px_80px_-44px_rgba(15,23,42,0.3)]">
      {(title || subtitle || search || toolbarAction) && (
        <div className="flex flex-col gap-4 border-b border-border/70 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            {title ? (
              <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            ) : null}
            {subtitle ? (
              <p className="text-sm leading-6 text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {search ? (
              <div className="relative min-w-[240px]">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={search.placeholder ?? "Search"}
                  className="pl-9"
                />
              </div>
            ) : null}

            <Badge variant="outline" className="rounded-full px-3 py-1">
              {filteredRows.length} row{filteredRows.length === 1 ? "" : "s"}
            </Badge>

            {toolbarAction ? <div>{toolbarAction}</div> : null}
          </div>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {columns.map((column) => (
              <TableHead
                key={column.id}
                className={cn(column.headerClassName)}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredRows.length ? (
            filteredRows.map((row) => (
              <TableRow key={getRowId(row)}>
                {columns.map((column) => (
                  <TableCell key={column.id} className={cn(column.className)}>
                    {column.cell(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-28 text-center text-sm text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
