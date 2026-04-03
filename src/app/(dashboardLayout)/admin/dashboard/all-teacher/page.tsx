import DashboardResourcePage from "@/components/modules/dashboard/DashboardResourcePage";

import AdminTeachersTable from "./_components/AdminTeachersTable";

export default function AdminAllTeacher() {
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
      <AdminTeachersTable />
    </DashboardResourcePage>
  );
}
