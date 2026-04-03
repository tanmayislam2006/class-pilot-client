import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  FileText,
  LayoutDashboard,
  PenSquare,
  Users,
} from "lucide-react";

import type { AppRoute } from "./types";

export const teacherRoutes: AppRoute[] = [
  {
    title: "Dashboard",
    href: "/teacher/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "All Quizzes",
    href: "/teacher/dashboard/all-quiz",
    icon: ClipboardList,
  },
  {
    title: "Create Quiz",
    href: "/teacher/dashboard/create-quiz",
    icon: PenSquare,
  },
  {
    title: "Submissions",
    href: "/teacher/dashboard/all-submission",
    icon: FileText,
  },
  {
    title: "My Batch",
    href: "/teacher/dashboard/my-batch",
    icon: Users,
  },
  {
    title: "Attendance",
    href: "/teacher/dashboard/attendecne",
    icon: CalendarDays,
  },
  {
    title: "Update Quiz",
    href: "/teacher/dashboard/update-quiz",
    icon: BookOpen,
  },
];
