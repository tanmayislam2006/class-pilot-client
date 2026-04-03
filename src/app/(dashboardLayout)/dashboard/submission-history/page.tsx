import DashboardFeaturePage from "@/components/modules/dashboard/DashboardFeaturePage";
import { studentRoutes } from "@/routes";

export default function SubmissionHistoryPage() {
  return (
    <DashboardFeaturePage
      currentHref="/dashboard/submission-history"
      title="Review your submission timeline and recent results."
      eyebrow="Student workspace"
      description="Use this page to inspect previous attempts, monitor marks, and see where your quiz activity is improving."
      routes={studentRoutes}
      stats={[
        {
          label: "Recent Attempts",
          value: "09",
          note: "Your last submissions are ready to be turned into real result cards or tables.",
        },
        {
          label: "Evaluated",
          value: "07",
          note: "Most recent submissions already have teacher feedback.",
        },
        {
          label: "Awaiting Review",
          value: "02",
          note: "Pending checks can surface here with status badges later.",
        },
        {
          label: "Improvement",
          value: "+11%",
          note: "Performance has trended upward across the latest attempts.",
        },
      ]}
      steps={[
        {
          title: "Scan completed work",
          description:
            "Keep your full submission history visible so you do not lose track of evaluated and pending attempts.",
        },
        {
          title: "Compare outcomes",
          description:
            "This space is ready for tables, score chips, and submission status components.",
        },
        {
          title: "Use the insight for your next quiz",
          description:
            "Move back into upcoming quizzes with better visibility into previous mistakes and wins.",
        },
      ]}
    />
  );
}
