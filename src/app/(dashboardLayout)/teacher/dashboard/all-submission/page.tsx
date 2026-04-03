import DashboardResourcePage from "@/components/modules/dashboard/DashboardResourcePage";

export default function CheckAllSubmissionPage() {
  return (
    <DashboardResourcePage
      title="Review submissions and grading progress without clutter."
      eyebrow="Teacher workspace"
      description="Use this page for result tables, submission filters, and manual review workflows with a proper admin-grade layout."
      metrics={[
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
    >
    </DashboardResourcePage>
  );
}
