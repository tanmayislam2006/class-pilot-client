import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import DashboardResourcePage from "@/components/modules/dashboard/DashboardResourcePage";
import { fetchQuizSubmissionsQuery, teacherQueryKeys } from "@/queries/teacher";

import QuizSubmissionsTable from "./_components/QuizSubmissionsTable";

type PageProps = {
  params: Promise<{ batchId: string; quizId: string }> | { batchId: string; quizId: string };
};

export default async function QuizSubmissionsPage(props: PageProps) {
  const params = await props.params;
  const { batchId, quizId } = params;

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: teacherQueryKeys.quizSubmissions(batchId, quizId),
      queryFn: () => fetchQuizSubmissionsQuery(batchId, quizId),
    });
  } catch {
    // Client handles errors automatically.
  }

  return (
    <DashboardResourcePage
      title="Quiz Submissions"
      eyebrow="Teacher workspace"
      description="Review student score points, dates of completion, and answer counts."
      metrics={[]}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <QuizSubmissionsTable batchId={batchId} quizId={quizId} />
      </HydrationBoundary>
    </DashboardResourcePage>
  );
}
