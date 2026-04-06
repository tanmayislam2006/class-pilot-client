import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { studentQueryKeys, fetchSubmissionHistoryQuery } from "@/queries/student";
import SubmissionHistoryClient from "./_components/SubmissionHistoryClient";

export default async function SubmissionHistoryPage() {
  const queryClient = new QueryClient();

  try {
    // Prefetch submission history for seamless load
    await queryClient.prefetchQuery({
      queryKey: studentQueryKeys.submissionHistory,
      queryFn: fetchSubmissionHistoryQuery,
    });
  } catch (error) {
    console.error("Submission history prefetch failed:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SubmissionHistoryClient />
    </HydrationBoundary>
  );
}
