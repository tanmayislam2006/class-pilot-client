import { BookCheck, CalendarDays, ClipboardList, Users } from "lucide-react";

import RoleDashboardHome from "@/components/modules/dashboard/RoleDashboardHome";
import { teacherRoutes } from "@/routes";

export default function TeacherDashboardPage() {
  return (
    <RoleDashboardHome
      eyebrow="Teacher workspace"
      title="Manage classroom momentum with faster quiz, batch, and submission workflows."
      description="Use the dashboard to stay on top of quiz creation, monitor student activity, and move through teaching operations without jumping between scattered pages."
      metrics={[
        {
          label: "Active Quizzes",
          value: "18",
          note: "New attempts came in today",
          icon: ClipboardList,
        },
        {
          label: "Batch Size",
          value: "64",
          note: "Students currently assigned",
          icon: Users,
        },
        {
          label: "Attendance Review",
          value: "07",
          note: "Sessions need quick review",
          icon: CalendarDays,
        },
        {
          label: "Submission Rate",
          value: "93%",
          note: "Strong completion across classes",
          icon: BookCheck,
        },
      ]}
      routes={teacherRoutes}
    />
  );
}
