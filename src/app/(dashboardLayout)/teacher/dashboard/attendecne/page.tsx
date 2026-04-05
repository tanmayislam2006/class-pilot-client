import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import DashboardResourcePage from "@/components/modules/dashboard/DashboardResourcePage";
import { teacherQueryKeys, fetchTeacherBatchesQuery } from "@/queries/teacher";

import AttendanceSheet from "./_components/AttendanceSheet";

export default async function AttendancePage() {
  const queryClient = new QueryClient();

  try {
    // Prefetch batch list so the selector renders instantly on client
    await queryClient.prefetchQuery({
      queryKey: teacherQueryKeys.myBatches,
      queryFn: fetchTeacherBatchesQuery,
    });
  } catch {
    // Client will handle error state
  }

  return (
    <DashboardResourcePage
      title="Take attendance for your batch"
      eyebrow="Teacher workspace"
      description="Mark all students as present, then tap any absent or late students to change their status. Submit when done."
      metrics={[]}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AttendanceSheet />
      </HydrationBoundary>
    </DashboardResourcePage>
  );
}

