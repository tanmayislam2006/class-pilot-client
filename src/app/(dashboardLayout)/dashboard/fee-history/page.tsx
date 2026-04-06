import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { studentQueryKeys, fetchFeeHistoryQuery, fetchFeeSummaryQuery } from "@/queries/student";
import FeeHistoryClient from "./_components/FeeHistoryClient";

export default async function FeeHistoryPage() {
  const queryClient = new QueryClient();

  try {
    // Prefetch fee history and summary for immediate view
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: studentQueryKeys.feeHistory,
        queryFn: fetchFeeHistoryQuery,
      }),
      queryClient.prefetchQuery({
        queryKey: studentQueryKeys.feeSummary,
        queryFn: fetchFeeSummaryQuery,
      }),
    ]);
  } catch (error) {
    console.error("Fee history prefetch failed:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FeeHistoryClient />
    </HydrationBoundary>
  );
}
