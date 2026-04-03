export type UserRole = "ADMIN" | "TEACHER" | "STUDENT";
export type AppRole = "admin" | "teacher" | "student";
export type RouteOwner = UserRole | "COMMON";

const roleToDashboardRoute: Record<UserRole, string> = {
  ADMIN: "/admin/dashboard",
  TEACHER: "/teacher/dashboard",
  STUDENT: "/dashboard",
};

const normalizedRoleMap: Record<AppRole, UserRole> = {
  admin: "ADMIN",
  teacher: "TEACHER",
  student: "STUDENT",
};

export type RouteConfig = {
  exact: string[];
  pattern: RegExp[];
};

export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];
export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((router: string) => router === pathname);
};

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/change-password"],
  pattern: [],
};

export const teacherProtectedRoutes: RouteConfig = {
  pattern: [/^\/teacher\/dashboard/], // Matches any path that starts with /teacher/dashboard
  exact: [],
};

export const adminProtectedRoutes: RouteConfig = {
  pattern: [/^\/admin\/dashboard/], // Matches any path that starts with /admin/dashboard
  exact: [],
};
export const studentProtectedRoutes: RouteConfig = {
  pattern: [/^\/dashboard/], // Matches any path that starts with /dashboard
  exact: ["/payment/success"],
};

export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.pattern.some((pattern: RegExp) => pattern.test(pathname));
};

export const getRouteOwner = (
  pathname: string,
): RouteOwner | null => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) return "ADMIN";
  else if (isRouteMatches(pathname, teacherProtectedRoutes)) return "TEACHER";
  else if (isRouteMatches(pathname, studentProtectedRoutes)) return "STUDENT";
  else if (isRouteMatches(pathname, commonProtectedRoutes)) return "COMMON";
  return null;
};

export const normalizeRole = (role?: string | null): AppRole | null => {
  switch (role?.toUpperCase()) {
    case "ADMIN":
      return "admin";
    case "TEACHER":
      return "teacher";
    case "STUDENT":
      return "student";
    default:
      return null;
  }
};

export const formatRoleLabel = (role?: UserRole | AppRole | null) => {
  const normalizedRole =
    typeof role === "string" && role === role.toUpperCase()
      ? normalizeRole(role)
      : role;

  if (!normalizedRole) {
    return "Unknown role";
  }

  return normalizedRole.charAt(0).toUpperCase() + normalizedRole.slice(1);
};

export const getDefaultDashboardRoute = (role: UserRole | AppRole) => {
  const normalizedRole =
    role === role.toLowerCase()
      ? normalizedRoleMap[role as AppRole]
      : (role as UserRole);

  return roleToDashboardRoute[normalizedRole] ?? "/";
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole,
) => {
  const routeOwner = getRouteOwner(redirectPath);

  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }

  if (routeOwner === role) {
    return true;
  }

  return false;
};
