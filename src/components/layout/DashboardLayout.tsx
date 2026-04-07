"use client";

import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { usePathname } from "next/navigation";

import DashboardNavbar from "@/components/layout/DashboardNavbar";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import Loading from "@/components/ui/Loading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatRoleLabel } from "@/lib/authUtils";
import { useAuth } from "@/providers/AuthProvider";
import { getRoutesByRole } from "@/routes";
import type { AppRoute } from "@/routes";

function getActiveRoute(pathname: string, routes: AppRoute[]) {
  return [...routes]
    .sort((left, right) => right.href.length - left.href.length)
    .find(
      (route) =>
        pathname === route.href || pathname.startsWith(`${route.href}/`),
    ) ?? null;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { loading, role, user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading && !role) {
    return <Loading fullPage message="Initializing dashboard..." />;
  }

  if (!role) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <Alert className="max-w-md">
          <ShieldAlert className="size-4" />
          <AlertTitle>Role not available</AlertTitle>
          <AlertDescription>
            We could not determine the dashboard role for this session.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const routes = getRoutesByRole(role);
  const activeRoute = getActiveRoute(pathname, routes);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(99,57,166,0.12),transparent_35%),linear-gradient(180deg,rgba(255,255,255,1),rgba(248,247,252,1))]">
      <div className="flex min-h-screen">
        <DashboardSidebar
          activeHref={activeRoute?.href ?? null}
          collapsed={collapsed}
          currentPathname={pathname}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
          routes={routes}
        />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <DashboardNavbar
            collapsed={collapsed}
            onOpenMobile={() => setMobileOpen(true)}
            onToggleCollapsed={() => setCollapsed((value) => !value)}
            roleLabel={formatRoleLabel(role)}
            title={activeRoute?.title ?? "Dashboard"}
            userName={user?.name ?? "Dashboard User"}
          />

          <main className="flex-1 px-4 py-5 md:px-6 md:py-6">
            <div className="mx-auto flex h-full min-h-[calc(100vh-7rem)] w-full max-w-7xl flex-col rounded-[32px] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(252,251,255,0.90))] p-4 shadow-[0_28px_90px_-42px_rgba(15,23,42,0.35)] backdrop-blur md:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
