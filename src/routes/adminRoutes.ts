import { GraduationCap, Layers3, LayoutDashboard, UserPlus, Users, UserRoundPlus } from "lucide-react";

import type { AppRoute } from "./types";

export const adminRoutes: AppRoute[] = [
  {
    title: "Overview",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Create Teacher",
    href: "/admin/create-teacher",
    icon: UserRoundPlus,
  },
  {
    title: "Create Student",
    href: "/admin/create-student",
    icon: UserPlus,
  },
  {
    title: "All Teachers",
    href: "/admin/dashboard/all-teacher",
    icon: GraduationCap,
  },
  {
    title: "All Students",
    href: "/admin/dashboard/all-student",
    icon: Users,
  },
  {
    title: "All Batches",
    href: "/admin/dashboard/all-batch",
    icon: Layers3,
  },
];
