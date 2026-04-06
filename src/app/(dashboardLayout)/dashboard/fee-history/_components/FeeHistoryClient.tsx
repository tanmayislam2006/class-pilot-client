"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import DataTable, { DataTableColumn } from "@/components/modules/data-table/DataTable";
import DashboardFeaturePage from "@/components/modules/dashboard/DashboardFeaturePage";
import { studentRoutes } from "@/routes";
import { studentQueryKeys, fetchFeeHistoryQuery, fetchFeeSummaryQuery } from "@/queries/student";
import { feeColumns } from "./fee-columns";

export default function FeeHistoryClient() {
  const { data, isLoading } = useQuery({
    queryKey: studentQueryKeys.feeHistory,
    queryFn: fetchFeeHistoryQuery,
  });

  const { data: summaryData } = useQuery({
    queryKey: studentQueryKeys.feeSummary,
    queryFn: fetchFeeSummaryQuery,
  });

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const { summary, history } = data?.data || { summary: { totalRecords: 0, totalAmount: 0, paidCount: 0, unpaidCount: 0, overdueCount: 0 }, history: [] };
  
  // Use either history summary or summary route data
  const totalDues = summaryData?.data?.summary?.totalUnpaidAmount ?? (summary.totalAmount - (summary.paidCount * 1000)); // rough estimate if summary missing

  const stats = [
    {
      label: "Total Records",
      value: summary.totalRecords.toString().padStart(2, "0"),
      note: "Total billing entries in your profile history.",
    },
    {
      label: "Outstanding Tk",
      value: totalDues.toLocaleString(),
      note: summary.overdueCount > 0 ? `${summary.overdueCount} payments are currently overdue.` : "Your billing state is up to date.",
    },
    {
      label: "Settled Count",
      value: summary.paidCount.toString().padStart(2, "0"),
      note: "Number of monthly fees already paid by you.",
    },
    {
      label: "Status",
      value: summary.overdueCount > 0 ? "Careful" : "Healthy",
      note: "Calculated based on your recent payment consistency.",
    },
  ];

  const steps = [
    {
      title: "Review payment history",
      description: "Scan your chronological list of invoices and settled monthly dues.",
    },
    {
      title: "Spot pending fees",
      description: "Use the 'Unpaid' or 'Overdue' filters to find items needing attention.",
    },
    {
      title: "Keep proving marks",
      description: "Download receipts for your records whenever a payment is confirmed.",
    },
  ];

  return (
    <div className="space-y-10">
      <DashboardFeaturePage
        currentHref="/dashboard/fee-history"
        title="Track payments, dues, and billing updates in one place."
        eyebrow="Student workspace"
        description="Your finance area provides a clear view of your billing state, reminders, and transaction receipts."
        routes={studentRoutes}
        stats={stats}
        steps={steps}
      />

      <section className="px-1 pb-10">
        <div className="rounded-[24px] border border-border/60 bg-card/40 p-1 shadow-sm transition-all hover:border-border/80 hover:bg-card/60">
          <DataTable<{ id: string; month: string }>
            data={history}
            columns={feeColumns as unknown as DataTableColumn<{ id: string; month: string }>[]}
            getRowId={(row) => row.id}
            search={{
              getText: (row) => row.month,
              placeholder: "Search by month (e.g. April)...",
            }}
          />
        </div>
      </section>
    </div>
  );
}
