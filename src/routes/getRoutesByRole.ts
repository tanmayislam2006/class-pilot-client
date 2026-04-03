import { type UserRole } from "@/lib/authUtils";

import { adminRoutes } from "./adminRoutes";
import { studentRoutes } from "./studentRoutes";
import { teacherRoutes } from "./teacherRoutes";
import type { AppRoute } from "./types";

export function getRoutesByRole(role: UserRole): AppRoute[] {
  switch (role) {
    case "ADMIN":
      return adminRoutes;
    case "TEACHER":
      return teacherRoutes;
    case "STUDENT":
      return studentRoutes;
    default:
      return [];
  }
}
