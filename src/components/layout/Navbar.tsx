"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Rocket, GraduationCap, LayoutGrid, Phone, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { UserNav } from "./UserNav";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Rocket },
  { href: "/about", label: "About", icon: LayoutGrid },
  { href: "/all-teacher", label: "Teachers", icon: GraduationCap },
  { href: "/contact-us", label: "Contact Us", icon: Phone },
];

export default function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-border/40 bg-background/70 shadow-sm backdrop-blur-xl"
          : "bg-transparent/5 backdrop-blur-md"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Branding (Left) */}
        <div className="flex items-center gap-2">
          <Link href="/" className="group flex items-center gap-3 transition-opacity active:opacity-80">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-transform group-hover:scale-110">
              < GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-foreground">
                Class <span className="text-primary">Pilot</span>
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60 leading-none">
                Academic Hub
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links (Middle - Desktop) */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-medium transition-all duration-300 hover:text-primary",
                  isActive
                    ? "text-primary bg-primary/5 shadow-[0_8px_20px_-10px_rgba(99,57,166,0.3)] border"
                    : "text-muted-foreground hover:bg-primary/5 "
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0 transition-transform group-hover:scale-110", isActive && "text-primary animate-pulse")} />
                {link.label}
                {isActive && (
                  <span className="absolute inset-x-4 -bottom-px h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Side (Auth state dependent) */}
        <div className="flex items-center gap-3">
          {user ? (
            <UserNav />
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button asChild variant="ghost" className="h-10 rounded-full px-6 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="h-10 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-105 active:scale-95">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-background/50 text-foreground transition-all hover:bg-primary/10 lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 animate-in spin-in-90" />
            ) : (
              <Menu className="h-5 w-5 animate-in fade-in" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu (Responsive) */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 z-40 h-[calc(100vh-4rem)] border-t border-border/40 bg-background/95 backdrop-blur-2xl transition-all duration-300 ease-in-out lg:hidden",
          mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        )}
      >
        <div className="flex flex-col gap-2 p-6">
          {NAV_LINKS.map((link, idx) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-2xl p-4 transition-all duration-200 active:scale-95",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20"
                    : "bg-muted/50 text-foreground hover:bg-primary/5 hover:text-primary"
                )}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <Icon className="h-5 w-5" />
                  <span className="text-base font-semibold">{link.label}</span>
                </div>
                <ChevronRight className={cn("h-4 w-4 opacity-50", isActive && "opacity-100")} />
              </Link>
            );
          })}

          {!user && (
            <div className="mt-8 flex flex-col gap-4">
              <Button asChild variant="outline" className="h-12 w-full rounded-2xl text-base font-semibold border-border/40 bg-background/50">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
              </Button>
              <Button asChild className="h-12 w-full rounded-2xl bg-primary text-base font-semibold shadow-xl shadow-primary/20">
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>Register Now</Link>
              </Button>
            </div>
          )}
        </div>

        <div className="mt-auto border-t border-border/40 p-10 text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 Class Pilot. Making education smarter.
          </p>
        </div>
      </div>
    </header>
  );
}
