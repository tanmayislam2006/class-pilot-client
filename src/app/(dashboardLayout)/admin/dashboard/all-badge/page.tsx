import DashboardResourcePage from "@/components/modules/dashboard/DashboardResourcePage";

import AdminBadgesTable from "./_components/AdminBadgesTable";

export default function AdminAllBadgePage() {
  return (
    <DashboardResourcePage
      title="Manage badge programs and recognition flows with clarity."
      eyebrow="Admin workspace"
      description="Your badge route now looks like a real product surface, ready for reward catalogs, status tracking, and edit actions."
      metrics={[
        {
          label: "Active Badges",
          value: "11",
          note: "Recognition campaigns can now be shown in a stronger catalog layout.",
        },
        {
          label: "Awarded",
          value: "128",
          note: "Distributed badges can later become a table or timeline here.",
        },
        {
          label: "Draft Programs",
          value: "03",
          note: "Upcoming recognition initiatives stay organized before launch.",
        },
        {
          label: "Engagement Lift",
          value: "+16%",
          note: "Recognition is helping overall platform activity.",
        },
      ]}
    >
      <AdminBadgesTable />
    </DashboardResourcePage>
  );
}
