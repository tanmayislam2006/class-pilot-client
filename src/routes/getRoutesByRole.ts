import { type AppRole } from "@/lib/authUtils";

import { adminRoutes } from "./adminRoutes";
import { studentRoutes } from "./studentRoutes";
import { teacherRoutes } from "./teacherRoutes";
import type { AppRoute } from "./types";

export function getRoutesByRole(role: AppRole): AppRoute[] {
  switch (role) {
    case "admin":
      return adminRoutes;
    case "teacher":
      return teacherRoutes;
    case "student":
      return studentRoutes;
    default:
      return [];
  }
}
