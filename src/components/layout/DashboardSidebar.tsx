"use client";

import Link from "next/link";


import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { AppRoute } from "@/routes";

type DashboardSidebarProps = {
  activeHref: string | null;
  collapsed: boolean;
  currentPathname: string;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  routes: AppRoute[];
};

export default function DashboardSidebar({
  activeHref,
  collapsed,
  currentPathname,
  mobileOpen,
  onCloseMobile,
  routes,
}: DashboardSidebarProps) {
  const currentLabel =
    currentPathname
      .split("/")
      .filter(Boolean)
      .slice(-1)[0]
      ?.replace(/-/g, " ") ?? "dashboard";

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm transition-opacity duration-200 lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onCloseMobile}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(246,243,252,0.94))] backdrop-blur-xl transition-all duration-200 lg:sticky lg:translate-x-0",
          collapsed ? "w-20" : "w-72",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="px-4 py-5">
          <div
            className={cn(
              "rounded-[24px] border border-border/70 bg-background/80 p-4 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.35)]",
              collapsed && "px-2",
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                {/* <Image src="/class-pilot-logo.png" alt="Logo" width={50} height={50} className="object-cover" /> */}
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Class Pilot
                  </p>
                  <h1 className="truncate text-lg font-semibold tracking-tight">
                    Dashboard
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-4 pb-4">
          <Button
            type="button"
            variant="ghost"
            className={cn(
              "h-12 w-full justify-start rounded-2xl border border-dashed border-border/70 bg-card/60 text-muted-foreground hover:bg-muted/70 hover:text-foreground",
              collapsed && "justify-center px-0",
            )}
            title={collapsed ? "Current route" : undefined}
          >
            <span className="truncate text-sm capitalize">
              {collapsed ? currentLabel : currentPathname}
            </span>
          </Button>
        </div>

        <Separator />

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {!collapsed && (
            <p className="px-2 pb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Navigation
            </p>
          )}
          <div className="space-y-1">
            {routes.map((route) => {
              const Icon = route.icon;
              const isActive = route.href === activeHref;

              return (
                <Link
                  key={route.href}
                  href={route.href}
                  title={collapsed ? route.title : undefined}
                  onClick={onCloseMobile}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-200",
                    collapsed && "justify-center px-0",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-[0_18px_40px_-22px_rgba(99,57,166,0.8)]"
                      : "text-muted-foreground hover:bg-background/90 hover:text-foreground",
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {!collapsed && <span className="truncate">{route.title}</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        {!collapsed && (
          <div className="p-4 pt-0">
            <div className="rounded-[24px] border border-primary/15 bg-primary/5 p-4">
              <p className="text-sm font-semibold">Productive workspace</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Role-aware navigation is active, so each dashboard only shows the tools
                that belong to that user.
              </p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
