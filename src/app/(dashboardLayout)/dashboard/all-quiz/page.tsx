import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { studentQueryKeys, fetchAssignedQuizzesQuery, fetchStudentDashboardQuery } from "@/queries/student";
import AssignedQuizzesClient from "./_components/AssignedQuizzesClient";

export default async function AllQuizPage() {
  const queryClient = new QueryClient();

  try {
    // Prefetch assigned quizzes and dashboard stats for instant load
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: studentQueryKeys.assignedQuizzes,
        queryFn: fetchAssignedQuizzesQuery,
      }),
      queryClient.prefetchQuery({
        queryKey: studentQueryKeys.dashboard,
        queryFn: fetchStudentDashboardQuery,
      }),
    ]);
  } catch (error) {
    console.error("Quizzes prefetch failed:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AssignedQuizzesClient />
    </HydrationBoundary>
  );
}
