import DashboardResourcePage from "@/components/modules/dashboard/DashboardResourcePage";

import AdminStudentsTable from "./_components/AdminStudentsTable";

export default function AdminAllStudent() {
  return (
    <DashboardResourcePage
      title="Oversee student records and enrollment activity clearly."
      eyebrow="Admin workspace"
      description="The students area now has a proper structure for enrollment tables, cohort filters, and profile operations."
      metrics={[
        {
          label: "Total Students",
          value: "480",
          note: "Enrollment records can expand here into tables, filters, and detail drawers.",
        },
        {
          label: "New Enrollments",
          value: "31",
          note: "Recent growth remains visible for planning and reporting.",
        },
        {
          label: "Active Cohorts",
          value: "14",
          note: "Program grouping can surface here with quick navigation.",
        },
        {
          label: "Retention",
          value: "94%",
          note: "Student continuity remains strong this term.",
        },
      ]}
    >
      <AdminStudentsTable />
    </DashboardResourcePage>
  );
}
