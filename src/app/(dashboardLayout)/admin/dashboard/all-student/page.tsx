import DashboardFeaturePage from "@/components/modules/dashboard/DashboardFeaturePage";
import { adminRoutes } from "@/routes";

export default function AdminAllStudent() {
  return (
    <DashboardFeaturePage
      currentHref="/admin/dashboard/all-student"
      title="Oversee student records and enrollment activity clearly."
      eyebrow="Admin workspace"
      description="The students area now has a proper structure for enrollment tables, cohort filters, and profile operations."
      routes={adminRoutes}
      stats={[
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
      steps={[
        {
          title: "Review enrollment at scale",
          description:
            "Use this route for searchable student lists, filtering, and profile-level actions.",
        },
        {
          title: "Monitor cohort health",
          description:
            "Enrollment, billing, and engagement summaries can sit together in this same layout.",
        },
        {
          title: "Act on exceptions fast",
          description:
            "The workspace leaves room for suspension, update, or support workflows later.",
        },
      ]}
    />
  );
}
