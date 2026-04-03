import DashboardFeaturePage from "@/components/modules/dashboard/DashboardFeaturePage";
import { teacherRoutes } from "@/routes";

export default function CreteAttendancePage() {
  return (
    <DashboardFeaturePage
      currentHref="/teacher/dashboard/attendecne"
      title="Track attendance with space for real session controls."
      eyebrow="Teacher workspace"
      description="This page is now ready for attendance sheets, date filters, and quick mark actions across your batches."
      routes={teacherRoutes}
      stats={[
        {
          label: "Sessions This Week",
          value: "09",
          note: "Recent class sessions can be organized by batch and date.",
        },
        {
          label: "Marked Today",
          value: "02",
          note: "The most recent attendance updates can appear instantly here.",
        },
        {
          label: "Needs Review",
          value: "01",
          note: "Missing or inconsistent records can be flagged clearly.",
        },
        {
          label: "Attendance Rate",
          value: "92%",
          note: "Overall class participation remains healthy.",
        },
      ]}
      steps={[
        {
          title: "Open the target class session",
          description:
            "Use this surface for date pickers, batch selection, and present-absent toggles.",
        },
        {
          title: "Mark and verify attendance",
          description:
            "The layout is ready for fast, repeatable attendance entry with minimal friction.",
        },
        {
          title: "Spot trends over time",
          description:
            "You can later add summaries and charts without rebuilding the whole route.",
        },
      ]}
    />
  );
}
