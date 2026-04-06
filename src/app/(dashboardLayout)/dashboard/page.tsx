import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { studentQueryKeys, fetchStudentDashboardQuery } from "@/queries/student";
import StudentDashboardHome from "./_components/StudentDashboardHome";

export default async function StudentDashboardPage() {
  const queryClient = new QueryClient();

  try {
    // Prefetch student dashboard data for instant hydration
    await queryClient.prefetchQuery({
      queryKey: studentQueryKeys.dashboard,
      queryFn: fetchStudentDashboardQuery,
    });
  } catch (error) {
    console.error("Dashboard prefetch failed:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StudentDashboardHome />
    </HydrationBoundary>
  );
}
