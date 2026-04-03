import DashboardFeaturePage from "@/components/modules/dashboard/DashboardFeaturePage";
import { teacherRoutes } from "@/routes";

export default function AllQuizPage() {
  return (
    <DashboardFeaturePage
      currentHref="/teacher/dashboard/all-quiz"
      title="Monitor every quiz you have published and scheduled."
      eyebrow="Teacher workspace"
      description="This page now has a production-ready structure for quiz tables, status filters, and batch-level performance snapshots."
      routes={teacherRoutes}
      stats={[
        {
          label: "Published",
          value: "18",
          note: "All active quizzes can live here with search and filter controls.",
        },
        {
          label: "Drafts",
          value: "04",
          note: "Incomplete quiz builds can be surfaced before release.",
        },
        {
          label: "Attempts Today",
          value: "67",
          note: "Recent student activity can be summarized in this workspace.",
        },
        {
          label: "Avg. Score",
          value: "74%",
          note: "Use score trends to adjust future quiz difficulty.",
        },
      ]}
      steps={[
        {
          title: "Review quiz status at a glance",
          description:
            "Published, draft, and archived quiz states can all fit into this layout without another redesign.",
        },
        {
          title: "Drill into attempt performance",
          description:
            "Add performance charts or tables here to understand which assessments need attention.",
        },
        {
          title: "Jump into creation or updates",
          description:
            "Move quickly between quiz management actions using the related route links on the right.",
        },
      ]}
    />
  );
}
