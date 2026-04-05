import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import DashboardResourcePage from "@/components/modules/dashboard/DashboardResourcePage";
import { teacherQueryKeys, fetchBatchStudentsQuery } from "@/queries/teacher";

import BatchStudentsTable from "./_components/BatchStudentsTable";

type PageProps = {
  params: Promise<{ batchId: string }> | { batchId: string };
};

export default async function BatchDetailsPage(props: PageProps) {
  // Await the params to support Next.js 15+ dynamic params requirements
  const params = await props.params;
  const { batchId } = params;

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: teacherQueryKeys.batchStudents(batchId),
      queryFn: () => fetchBatchStudentsQuery(batchId),
    });
  } catch {
    // Let the client component safely handle the runtime error state.
  }

  return (
    <DashboardResourcePage
      title="Batch Details"
      eyebrow="Teacher workspace"
      description="View specific batch schedules and manage student enrollments."
      metrics={[]}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BatchStudentsTable batchId={batchId} />
      </HydrationBoundary>
    </DashboardResourcePage>
  );
}
