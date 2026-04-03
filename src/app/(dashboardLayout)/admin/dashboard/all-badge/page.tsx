import DashboardFeaturePage from "@/components/modules/dashboard/DashboardFeaturePage";
import { adminRoutes } from "@/routes";

export default function AdminAllBadgePage() {
  return (
    <DashboardFeaturePage
      currentHref="/admin/dashboard/all-badge"
      title="Manage badge programs and recognition flows with clarity."
      eyebrow="Admin workspace"
      description="Your badge route now looks like a real product surface, ready for reward catalogs, status tracking, and edit actions."
      routes={adminRoutes}
      stats={[
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
      steps={[
        {
          title: "Review badge inventory",
          description:
            "Catalogs, categories, and status labels can all drop into this layout smoothly.",
        },
        {
          title: "Update rules and availability",
          description:
            "This route is ready for badge edit forms and award condition management.",
        },
        {
          title: "Track recognition impact",
          description:
            "Performance and adoption analytics can be layered in without structural changes.",
        },
      ]}
    />
  );
}
