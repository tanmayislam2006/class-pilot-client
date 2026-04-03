import DashboardFeaturePage from "@/components/modules/dashboard/DashboardFeaturePage";
import { teacherRoutes } from "@/routes";

export default function CheckAllSubmissionPage() {
  return (
    <DashboardFeaturePage
      currentHref="/teacher/dashboard/all-submission"
      title="Review submissions and grading progress without clutter."
      eyebrow="Teacher workspace"
      description="Use this page for result tables, submission filters, and manual review workflows with a proper admin-grade layout."
      routes={teacherRoutes}
      stats={[
        {
          label: "Pending Review",
          value: "21",
          note: "Ungraded submissions can be surfaced with urgency and filtering.",
        },
        {
          label: "Reviewed Today",
          value: "14",
          note: "Daily grading throughput remains visible to help planning.",
        },
        {
          label: "Flagged Items",
          value: "03",
          note: "Edge cases and incomplete answers can stand out quickly.",
        },
        {
          label: "Turnaround",
          value: "1.8d",
          note: "Average review time is strong and can be improved further.",
        },
      ]}
      steps={[
        {
          title: "Prioritize pending submissions",
          description:
            "A real table or grading queue can drop into this page with almost no layout churn.",
        },
        {
          title: "Open and assess answers",
          description:
            "This route is shaped for score forms, feedback panels, and moderation actions.",
        },
        {
          title: "Track completion pace",
          description:
            "Use visible metrics to keep grading balanced across your classes.",
        },
      ]}
    />
  );
}
