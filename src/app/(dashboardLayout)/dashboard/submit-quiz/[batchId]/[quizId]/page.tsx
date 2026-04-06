import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { studentQueryKeys, fetchQuizDetailsQuery } from "@/queries/student";
import QuizTakingClient from "../../_components/QuizTakingClient";

export default async function QuizTakePage({
  params,
}: {
  params: Promise<{ batchId: string; quizId: string }>;
}) {
  const { batchId, quizId } = await params;
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: studentQueryKeys.quizDetails(batchId, quizId),
      queryFn: () => fetchQuizDetailsQuery(batchId, quizId),
    });
  } catch (error) {
    console.error("Quiz details prefetch failed:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QuizTakingClient batchId={batchId} quizId={quizId} />
    </HydrationBoundary>
  );
}
