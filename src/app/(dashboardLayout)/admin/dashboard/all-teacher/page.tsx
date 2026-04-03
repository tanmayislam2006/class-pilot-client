import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import DashboardResourcePage from "@/components/modules/dashboard/DashboardResourcePage";
import { adminQueryKeys } from "@/queries/admin";
import { adminService } from "@/service/admin.service";

import AdminTeachersTable from "./_components/AdminTeachersTable";

export default async function AdminAllTeacher() {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: adminQueryKeys.teachers,
      queryFn: async () => {
        const response = await adminService.getAllTeachers();

        if (!response.success) {
          throw new Error(response.message || "Failed to load teachers");
        }

        return response;
      },
    });
  } catch {
    // Let the client query render the error state.
  }

  return (
    <DashboardResourcePage
      title="Manage teacher records from a polished admin workspace."
      eyebrow="Admin workspace"
      description="This route is prepared for staff tables, onboarding actions, and status management with a cleaner operational interface."
      metrics={[
        {
          label: "Total Teachers",
          value: "24",
          note: "Faculty records can now be displayed in a proper management layout.",
        },
        {
          label: "Active",
          value: "22",
          note: "Most teaching staff are currently active across batches.",
        },
        {
          label: "New This Month",
          value: "02",
          note: "New joins can be highlighted for onboarding follow-up.",
        },
        {
          label: "Coverage",
          value: "96%",
          note: "Staff allocation remains strong across departments.",
        },
      ]}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AdminTeachersTable />
      </HydrationBoundary>
    </DashboardResourcePage>
  );
}
