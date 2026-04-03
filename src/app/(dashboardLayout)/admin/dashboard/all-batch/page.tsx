import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import DashboardResourcePage from "@/components/modules/dashboard/DashboardResourcePage";
import { adminQueryKeys } from "@/queries/admin";
import { adminService } from "@/service/admin.service";

import AdminBatchesTable from "./_components/AdminBatchesTable";

export default async function AdminAllBatchPage() {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: adminQueryKeys.batches,
      queryFn: async () => {
        const response = await adminService.getAllBatches();

        if (!response.success) {
          throw new Error(response.message || "Failed to load batches");
        }

        return response;
      },
    });
  } catch {
    // Let the client query render the error state.
  }

  return (
    <DashboardResourcePage
      title="Manage teaching batches from a clean admin workspace."
      eyebrow="Admin workspace"
      description="This route uses the real batch API, server prefetch, and hydrated client queries so the list can scale without rewriting the page."
      metrics={[
        {
          label: "Active Batches",
          value: "11",
          note: "Operational groups can be reviewed and searched from one place.",
        },
        {
          label: "Assigned Teachers",
          value: "08",
          note: "Teacher ownership remains visible per batch.",
        },
        {
          label: "Student Capacity",
          value: "480",
          note: "Batch demand can be reviewed against current enrollment.",
        },
        {
          label: "Live Quizzes",
          value: "19",
          note: "Quiz activity is tied back to each batch structure.",
        },
      ]}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AdminBatchesTable />
      </HydrationBoundary>
    </DashboardResourcePage>
  );
}
