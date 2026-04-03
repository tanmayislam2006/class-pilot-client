import DashboardFeaturePage from "@/components/modules/dashboard/DashboardFeaturePage";
import { teacherRoutes } from "@/routes";

export default function UpdateQuizPage() {
  return (
    <DashboardFeaturePage
      currentHref="/teacher/dashboard/update-quiz"
      title="Update existing quizzes from a structured editing space."
      eyebrow="Teacher workspace"
      description="This route is ready for question edits, timing adjustments, versioning, and publishing revisions."
      routes={teacherRoutes}
      stats={[
        {
          label: "Editable Quizzes",
          value: "11",
          note: "Published and draft assessments can be revised from one surface.",
        },
        {
          label: "Recent Changes",
          value: "08",
          note: "Editing activity can be summarized for clarity and auditability.",
        },
        {
          label: "Synced Batches",
          value: "06",
          note: "Assigned student groups stay connected to quiz updates.",
        },
        {
          label: "Version Health",
          value: "Stable",
          note: "The route structure supports future version history panels.",
        },
      ]}
      steps={[
        {
          title: "Select the quiz to revise",
          description:
            "This page can host a selector or searchable list of quizzes that need updates.",
        },
        {
          title: "Adjust questions and settings",
          description:
            "Editing forms, question reorder flows, and publish controls fit naturally here.",
        },
        {
          title: "Republish safely",
          description:
            "Use confirmation and preview states to avoid accidental changes for students.",
        },
      ]}
    />
  );
}
