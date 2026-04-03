import { Award, GraduationCap, LayoutDashboard, Users } from "lucide-react";

import type { AppRoute } from "./types";

export const adminRoutes: AppRoute[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Teachers",
    href: "/admin/dashboard/all-teacher",
    icon: GraduationCap,
  },
  {
    title: "Students",
    href: "/admin/dashboard/all-student",
    icon: Users,
  },
  {
    title: "Badges",
    href: "/admin/dashboard/all-badge",
    icon: Award,
  },
];
