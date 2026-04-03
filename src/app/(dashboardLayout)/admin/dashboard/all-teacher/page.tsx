import DashboardFeaturePage from "@/components/modules/dashboard/DashboardFeaturePage";
import { adminRoutes } from "@/routes";

export default function AdminAllTeacher() {
  return (
    <DashboardFeaturePage
      currentHref="/admin/dashboard/all-teacher"
      title="Manage teacher records from a polished admin workspace."
      eyebrow="Admin workspace"
      description="This route is prepared for staff tables, onboarding actions, and status management with a cleaner operational interface."
      routes={adminRoutes}
      stats={[
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
      steps={[
        {
          title: "Review teacher list and status",
          description:
            "Use this page for searchable records, filters, and account-level quick actions.",
        },
        {
          title: "Support onboarding and updates",
          description:
            "The structure is ready for add, edit, and detail view flows.",
        },
        {
          title: "Track operational coverage",
          description:
            "Teacher assignments and platform activity can surface here without redesigning the route.",
        },
      ]}
    />
  );
}
