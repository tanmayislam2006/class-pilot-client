"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, LayoutDashboard, LogOut, User } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/providers/AuthProvider";
import { logoutAction } from "@/service/auth.service";
import { getDefaultDashboardRoute } from "@/lib/authUtils";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function UserNav() {
  const { user, setUser, role } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const handleLogout = async () => {
    await logoutAction();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  const dashboardHref = role ? getDefaultDashboardRoute(role) : "/dashboard";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative h-10 w-10 rounded-full outline-none ring-primary/20 ring-offset-2 transition-all hover:ring-2 focus-visible:ring-2">
          <Avatar className="h-10 w-10 border border-border/50 shadow-sm transition-transform hover:scale-105 active:scale-95">
            <AvatarImage src={user.image || ""} alt={user.name} />
            <AvatarFallback className="bg-primary/5 text-primary text-sm font-semibold">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer gap-2 focus:bg-primary/5 focus:text-primary">
            <Link href="/">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer gap-2 focus:bg-primary/5 focus:text-primary">
            <Link href={dashboardHref}>
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer gap-2 focus:bg-primary/5 focus:text-primary">
            <Link href="/my-profile">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="cursor-pointer gap-2 text-destructive focus:bg-destructive/5 focus:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
