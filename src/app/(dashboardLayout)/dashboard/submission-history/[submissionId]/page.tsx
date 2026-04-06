import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { studentQueryKeys, fetchSubmissionDetailsQuery } from "@/queries/student";
import SubmissionDetailsClient from "./_components/SubmissionDetailsClient";

export default async function SubmissionDetailsPage({
  params,
}: {
  params: Promise<{ submissionId: string }>;
}) {
  const { submissionId } = await params;
  const queryClient = new QueryClient();

  try {
    // Prefetch submission details
    await queryClient.prefetchQuery({
      queryKey: studentQueryKeys.submissionDetails(submissionId),
      queryFn: () => fetchSubmissionDetailsQuery(submissionId),
    });
  } catch (error) {
    console.error("Submission details prefetch failed:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SubmissionDetailsClient submissionId={submissionId} />
    </HydrationBoundary>
  );
}
