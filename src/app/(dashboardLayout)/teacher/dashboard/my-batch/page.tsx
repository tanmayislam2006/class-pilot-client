import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import DashboardResourcePage from "@/components/modules/dashboard/DashboardResourcePage";
import { teacherQueryKeys, fetchTeacherBatchesQuery } from "@/queries/teacher";

import MyBatchesTable from "./_components/MyBatchesTable";

export default async function MyBatchPage() {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: teacherQueryKeys.myBatches,
      queryFn: fetchTeacherBatchesQuery,
    });
  } catch {
    // Let the client query render the error state.
  }

  return (
    <DashboardResourcePage
      title="Manage your assigned batches"
      eyebrow="Teacher workspace"
      description="View your active batches, upcoming schedules, and dive into specific classes to evaluate students."
      metrics={[]}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyBatchesTable />
      </HydrationBoundary>
    </DashboardResourcePage>
  );
}
