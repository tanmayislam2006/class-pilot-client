import { BookOpen, CreditCard, SendHorizontal, Trophy } from "lucide-react";

import RoleDashboardHome from "@/components/modules/dashboard/RoleDashboardHome";
import { studentRoutes } from "@/routes";

export default function StudentDashboardPage() {
  return (
    <RoleDashboardHome
      eyebrow="Student workspace"
      title="Keep up with quizzes, submissions, and your academic progress."
      description="Track upcoming work, monitor your recent activity, and move through your quiz workflow from one clean dashboard."
      metrics={[
        {
          label: "Quizzes Available",
          value: "12",
          note: "3 new quizzes waiting this week",
          icon: BookOpen,
        },
        {
          label: "Pending Submissions",
          value: "04",
          note: "Stay ahead of your deadlines",
          icon: SendHorizontal,
        },
        {
          label: "Fee Updates",
          value: "02",
          note: "Recent payment and dues tracked",
          icon: CreditCard,
        },
        {
          label: "Performance",
          value: "89%",
          note: "Your average score is improving",
          icon: Trophy,
        },
      ]}
      routes={studentRoutes}
    />
  );
}
