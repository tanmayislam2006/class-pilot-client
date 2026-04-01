export type UserRole =  "ADMIN" | "TEACHER" | "STUDENT";

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
):  "ADMIN" | "TEACHER" | "STUDENT"| "COMMON" | null => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) return "ADMIN";
  else if (isRouteMatches(pathname, teacherProtectedRoutes)) return "TEACHER";
  else if (isRouteMatches(pathname, studentProtectedRoutes)) return "STUDENT";
  else if (isRouteMatches(pathname, commonProtectedRoutes)) return "COMMON";
  return null;
};

export const getDefaultDashboardRoute = (role : UserRole) => {
    if(role === "ADMIN") {
        return "/admin/dashboard";
    }
    if(role === "TEACHER") {
        return "/teacher/dashboard";
    }
    if(role === "STUDENT") {
        return "/dashboard";
    }

    return "/";
}

export const isValidRedirectForRole = (redirectPath : string, role : UserRole) => {
  
    const routeOwner = getRouteOwner(redirectPath);

    if(routeOwner === null || routeOwner === "COMMON"){
        return true;
    }

    if(routeOwner === role){
        return true;
    }

    return false;
}