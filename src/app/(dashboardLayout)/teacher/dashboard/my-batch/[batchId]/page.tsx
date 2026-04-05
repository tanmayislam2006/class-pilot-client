import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import DashboardResourcePage from "@/components/modules/dashboard/DashboardResourcePage";
import { teacherQueryKeys, fetchBatchStudentsQuery, fetchBatchQuizzesQuery } from "@/queries/teacher";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import BatchStudentsTable from "./_components/BatchStudentsTable";
import BatchQuizzesTable from "./_components/BatchQuizzesTable";

type PageProps = {
  params: Promise<{ batchId: string }> | { batchId: string };
};

export default async function BatchDetailsPage(props: PageProps) {
  // Await the params to support Next.js 15+ dynamic params requirements
  const params = await props.params;
  const { batchId } = params;

  const queryClient = new QueryClient();

  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: teacherQueryKeys.batchStudents(batchId),
        queryFn: () => fetchBatchStudentsQuery(batchId),
      }),
      queryClient.prefetchQuery({
        queryKey: teacherQueryKeys.batchQuizzes(batchId),
        queryFn: () => fetchBatchQuizzesQuery(batchId),
      }),
    ]);
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
        <Tabs defaultValue="students" className="mt-6 space-y-6">
          <TabsList>
            <TabsTrigger value="students">Enrolled Students</TabsTrigger>
            <TabsTrigger value="quizzes">Batch Quizzes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="students">
            <BatchStudentsTable batchId={batchId} />
          </TabsContent>
          
          <TabsContent value="quizzes">
            <BatchQuizzesTable batchId={batchId} />
          </TabsContent>
        </Tabs>
      </HydrationBoundary>
    </DashboardResourcePage>
  );
}
