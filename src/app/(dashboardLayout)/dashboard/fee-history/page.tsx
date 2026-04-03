import DashboardFeaturePage from "@/components/modules/dashboard/DashboardFeaturePage";
import { studentRoutes } from "@/routes";

export default function FeeHistoryPage() {
  return (
    <DashboardFeaturePage
      currentHref="/dashboard/fee-history"
      title="Track payments, dues, and billing updates in one place."
      eyebrow="Student workspace"
      description="Your finance area now has a proper dashboard surface for payment cards, due reminders, and receipt history."
      routes={studentRoutes}
      stats={[
        {
          label: "Paid This Term",
          value: "Tk 18,500",
          note: "Recent payments can be replaced with real transaction records here.",
        },
        {
          label: "Outstanding",
          value: "Tk 3,200",
          note: "Pending dues should stay visible and easy to act on.",
        },
        {
          label: "Receipts",
          value: "14",
          note: "Payment proof and billing details can slot into this page cleanly.",
        },
        {
          label: "Status",
          value: "Current",
          note: "Your profile is in a healthy billing state at the moment.",
        },
      ]}
      steps={[
        {
          title: "Review payment history",
          description:
            "This page is ready for a chronological list of invoices, receipts, and settled dues.",
        },
        {
          title: "Spot pending fees fast",
          description:
            "Important financial notices can surface here with stronger alerts and payment actions.",
        },
        {
          title: "Keep records organized",
          description:
            "The structure supports downloadable statements and richer transaction details later.",
        },
      ]}
    />
  );
}
