import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import DashboardResourcePage from "@/components/modules/dashboard/DashboardResourcePage";
import { teacherQueryKeys, fetchTeacherBatchesQuery } from "@/queries/teacher";
import { getCurrentUser } from "@/lib/currentUser";

import MyBatchesTable from "./_components/MyBatchesTable";
import CreateBatchModal from "./_components/CreateBatchModal";

export default async function MyBatchPage() {
  const queryClient = new QueryClient();
  const currentUser = await getCurrentUser();
  // The teacher's profile ID needs to come from the user — for now we fetch the user
  // and expect the auth backend to provide a teacherId field, or fall back to user.id
  const teacherId = (currentUser as (typeof currentUser & { teacherId?: string }) | null)?.teacherId ?? currentUser?.id ?? "";

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
        <MyBatchesTable toolbarExtra={<CreateBatchModal teacherId={teacherId} />} />
      </HydrationBoundary>
    </DashboardResourcePage>
  );
}
