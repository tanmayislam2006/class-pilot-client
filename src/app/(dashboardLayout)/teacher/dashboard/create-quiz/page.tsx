import DashboardFeaturePage from "@/components/modules/dashboard/DashboardFeaturePage";
import { teacherRoutes } from "@/routes";

export default function CreateQuizPage() {
  return (
    <DashboardFeaturePage
      currentHref="/teacher/dashboard/create-quiz"
      title="Create new quizzes inside a cleaner authoring workspace."
      eyebrow="Teacher workspace"
      description="This route is now ready for a real quiz builder with sections, question forms, and publishing controls."
      routes={teacherRoutes}
      stats={[
        {
          label: "Draft Builders",
          value: "04",
          note: "Your in-progress quiz structures can be managed from this surface.",
        },
        {
          label: "Question Bank",
          value: "126",
          note: "Reusable questions can later feed directly into this authoring flow.",
        },
        {
          label: "Published This Week",
          value: "03",
          note: "Recent releases help keep teaching momentum high.",
        },
        {
          label: "Ready Batches",
          value: "06",
          note: "Assigned groups are available for new quiz launches.",
        },
      ]}
      steps={[
        {
          title: "Draft the quiz structure",
          description:
            "Add title, instructions, timing, and grading setup in a form-first workflow.",
        },
        {
          title: "Attach questions and assign batches",
          description:
            "This page is shaped to handle question editors, batch selectors, and publish toggles.",
        },
        {
          title: "Publish with confidence",
          description:
            "The layout leaves room for validation, preview, and confirmation states.",
        },
      ]}
    />
  );
}
