import {
  BookOpen,
  CreditCard,
  History,
  LayoutDashboard,
  SendHorizontal,
} from "lucide-react";

import type { AppRoute } from "./types";

export const studentRoutes: AppRoute[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "All Quizzes",
    href: "/dashboard/all-quiz",
    icon: BookOpen,
  },
  {
    title: "Submit Quiz",
    href: "/dashboard/submit-quiz",
    icon: SendHorizontal,
  },
  {
    title: "Submissions",
    href: "/dashboard/submission-history",
    icon: History,
  },
  {
    title: "Fee History",
    href: "/dashboard/fee-history",
    icon: CreditCard,
  },
];
