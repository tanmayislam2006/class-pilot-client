"use client";

import { ChevronLeft, ChevronRight, Menu } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type DashboardNavbarProps = {
  collapsed: boolean;
  onOpenMobile: () => void;
  onToggleCollapsed: () => void;
  roleLabel: string;
  title: string;
  userName: string;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function DashboardNavbar({
  collapsed,
  onOpenMobile,
  onToggleCollapsed,
  roleLabel,
  title,
  userName,
}: DashboardNavbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/70 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onOpenMobile}
            aria-label="Open sidebar"
          >
            <Menu className="size-5" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="hidden lg:inline-flex"
            onClick={onToggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="size-4" />
            ) : (
              <ChevronLeft className="size-4" />
            )}
          </Button>

          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Workspace
            </p>
            <h2 className="truncate text-lg font-semibold tracking-tight">
              {title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge className="hidden rounded-full px-3 py-1 sm:inline-flex">
            {roleLabel}
          </Badge>

          <div className="hidden rounded-full border border-border/70 bg-card/80 px-4 py-2 text-right shadow-sm sm:block">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Signed in
            </p>
          </div>

          <Avatar className="border border-border/70 bg-card shadow-sm">
            <AvatarFallback>{getInitials(userName)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
