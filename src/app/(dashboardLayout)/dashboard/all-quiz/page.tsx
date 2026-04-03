import DashboardFeaturePage from "@/components/modules/dashboard/DashboardFeaturePage";
import { studentRoutes } from "@/routes";

export default function AllQuizPage() {
  return (
    <DashboardFeaturePage
      currentHref="/dashboard/all-quiz"
      title="Browse every quiz assigned to your class."
      eyebrow="Student workspace"
      description="Review available quizzes, see what is pending, and jump into submissions from one organized page."
      routes={studentRoutes}
      stats={[
        {
          label: "Available Now",
          value: "12",
          note: "Quizzes currently visible for your enrolled courses.",
        },
        {
          label: "Ending Soon",
          value: "03",
          note: "These should be completed before the next deadline window.",
        },
        {
          label: "Completed",
          value: "27",
          note: "Finished quizzes stay easy to revisit for quick review.",
        },
        {
          label: "Average Score",
          value: "88%",
          note: "Your recent performance trend remains strong.",
        },
      ]}
      steps={[
        {
          title: "Review the latest quiz list",
          description:
            "Use this section to scan newly assigned assessments and prioritize the ones closing first.",
        },
        {
          title: "Open a quiz and prepare your answers",
          description:
            "Move directly into the submission flow without losing context from your dashboard.",
        },
        {
          title: "Track outcomes after completion",
          description:
            "Use your history page to compare completed attempts and improve future scores.",
        },
      ]}
    />
  );
}
