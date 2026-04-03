import { GraduationCap, Layers3, LayoutDashboard, Users } from "lucide-react";

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
    title: "Batches",
    href: "/admin/dashboard/all-batch",
    icon: Layers3,
  },
];
