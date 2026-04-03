import DashboardFeaturePage from "@/components/modules/dashboard/DashboardFeaturePage";
import { studentRoutes } from "@/routes";

export default function QuizSubmitPage() {
  return (
    <DashboardFeaturePage
      currentHref="/dashboard/submit-quiz"
      title="Submit quiz attempts with a calmer, clearer flow."
      eyebrow="Student workspace"
      description="This module is shaped for focused submission work, with room for timers, question groups, and answer review states."
      routes={studentRoutes}
      stats={[
        {
          label: "Attempts Today",
          value: "02",
          note: "Recent work remains visible so you can resume your rhythm.",
        },
        {
          label: "Due This Week",
          value: "05",
          note: "A few open quizzes still need attention before the weekend.",
        },
        {
          label: "Saved Progress",
          value: "01",
          note: "A partial attempt can return here without redesigning the page.",
        },
        {
          label: "Completion Rate",
          value: "91%",
          note: "You have been finishing most assigned quizzes on time.",
        },
      ]}
      steps={[
        {
          title: "Start the active quiz session",
          description:
            "Open the selected quiz and move into the answer canvas with room for real question UI.",
        },
        {
          title: "Save or submit confidently",
          description:
            "This layout supports future draft save, timer, and final submission actions cleanly.",
        },
        {
          title: "Check your history after submission",
          description:
            "Use the submissions area to confirm status and follow your improvement over time.",
        },
      ]}
    />
  );
}
