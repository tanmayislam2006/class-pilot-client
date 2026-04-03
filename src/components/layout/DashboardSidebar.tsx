"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

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
          "fixed inset-y-0 left-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar/95 backdrop-blur transition-all duration-200 lg:sticky lg:translate-x-0",
          collapsed ? "w-20" : "w-72",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-3 px-4 py-5">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Sparkles className="size-5" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-muted-foreground">
                Class Pilot
              </p>
              <h1 className="truncate text-lg font-semibold tracking-tight">
                Dashboard
              </h1>
            </div>
          )}
        </div>

        <div className="px-4 pb-4">
          <Button
            type="button"
            variant="ghost"
            className={cn(
              "w-full justify-start rounded-xl border border-dashed border-border/70 bg-card/50 text-muted-foreground hover:bg-muted/70 hover:text-foreground",
              collapsed && "justify-center px-0",
            )}
            title={collapsed ? "Current route" : undefined}
          >
            <span className="truncate text-sm">
              {collapsed ? currentPathname.split("/").filter(Boolean).slice(-1)[0] ?? "Home" : currentPathname}
            </span>
          </Button>
        </div>

        <Separator />

        <nav className="flex-1 overflow-y-auto px-3 py-4">
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
                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    collapsed && "justify-center px-0",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {!collapsed && <span className="truncate">{route.title}</span>}
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}
