import DashboardFeaturePage from "@/components/modules/dashboard/DashboardFeaturePage";
import { teacherRoutes } from "@/routes";

export default function MyBadgePage() {
  return (
    <DashboardFeaturePage
      currentHref="/teacher/dashboard/my-batch"
      title="Manage your assigned batches with a stronger operational view."
      eyebrow="Teacher workspace"
      description="This workspace is ready for batch lists, student rosters, and quick actions across your active groups."
      routes={teacherRoutes}
      stats={[
        {
          label: "Active Batches",
          value: "06",
          note: "Your currently assigned groups can be displayed as interactive cards or tables.",
        },
        {
          label: "Students",
          value: "64",
          note: "Roster summaries can live here with filters and attendance shortcuts.",
        },
        {
          label: "New Joiners",
          value: "05",
          note: "Recent student additions are easy to surface in this layout.",
        },
        {
          label: "Engagement",
          value: "87%",
          note: "A healthy participation rate keeps the cohort on track.",
        },
      ]}
      steps={[
        {
          title: "Review each batch quickly",
          description:
            "The structure supports cards, rosters, and summary widgets for every assigned class group.",
        },
        {
          title: "Move into attendance or quizzes",
          description:
            "Use connected routes to work across teaching tasks without losing dashboard context.",
        },
        {
          title: "Track cohort health",
          description:
            "This page can easily host performance, attendance, and participation signals later.",
        },
      ]}
    />
  );
}
