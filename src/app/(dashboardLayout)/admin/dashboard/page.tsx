import { Award, GraduationCap, ShieldCheck, Users } from "lucide-react";

import RoleDashboardHome from "@/components/modules/dashboard/RoleDashboardHome";
import { adminRoutes } from "@/routes";

export default function AdminDashboardPage() {
  return (
    <RoleDashboardHome
      eyebrow="Admin workspace"
      title="Oversee teachers, students, and platform operations from one control center."
      description="Review your core organization metrics, move into management pages quickly, and keep the academic platform aligned without digging through raw tables first."
      metrics={[
        {
          label: "Total Teachers",
          value: "24",
          note: "2 new faculty onboarded this month",
          icon: GraduationCap,
        },
        {
          label: "Total Students",
          value: "480",
          note: "Enrollment trend remains healthy",
          icon: Users,
        },
        {
          label: "Active Batches",
          value: "11",
          note: "Teaching operations are spread across active batches",
          icon: Award,
        },
        {
          label: "System Health",
          value: "98%",
          note: "Operational status remains stable",
          icon: ShieldCheck,
        },
      ]}
      routes={adminRoutes}
    />
  );
}
