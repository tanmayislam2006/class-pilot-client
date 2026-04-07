"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoveLeft, Home, Search, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[radial-gradient(circle_at_top,rgba(99,57,166,0.12),transparent_35%),linear-gradient(180deg,rgba(255,255,255,1),rgba(248,247,252,1))] px-6 py-24 text-center sm:py-32 lg:px-8">
      <div className="relative">
        {/* Branding Logo */}
        <div className="mb-12 flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-transform hover:scale-110">
            <GraduationCap className="h-7 w-7 text-primary" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xl font-bold tracking-tight text-foreground">
              Class <span className="text-primary">Pilot</span>
            </span>
          </div>
        </div>

        {/* Decorative background blurs */}
        <div className="absolute -top-32 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -bottom-24 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-secondary/10 blur-[80px]" />

        <div className="relative">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary/60">Error 404</span>
            <h1 className="mt-4 text-6xl font-black tracking-tighter text-foreground sm:text-8xl lg:text-9xl">
                Lost in <span className="text-primary relative inline-block"> Space<span className="absolute -bottom-2 left-0 h-2 w-full bg-primary/10 rounded-full" /></span>
            </h1>
        </div>
        
        <p className="mt-8 text-lg leading-relaxed text-muted-foreground max-w-xl mx-auto font-medium">
          It looks like you&apos;ve navigated outside the monitored airspace. The destination you&apos;re seeking is currently unreachable or has been decommissioned.
        </p>
        
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="group h-14 w-full rounded-2xl border-border/40 bg-white/50 px-10 text-base font-semibold shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all hover:bg-primary/5 hover:text-primary active:scale-95 sm:w-auto"
          >
            <MoveLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Previous Session
          </Button>
          
          <Button
            asChild
            className="h-14 w-full rounded-2xl bg-primary px-10 text-base font-bold text-primary-foreground shadow-[0_15px_35px_-12px_rgba(99,57,166,0.35)] transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 sm:w-auto"
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Return Base
            </Link>
          </Button>
        </div>

        <div className="mt-20 flex flex-col items-center gap-4">
            <div className="group relative flex h-16 w-16 items-center justify-center rounded-[24px] bg-primary/5 transition-all hover:bg-primary/10">
                <Search className="h-7 w-7 text-primary/60 transition-colors group-hover:text-primary animate-pulse" />
                <div className="absolute inset-0 rounded-[24px] border border-primary/20 motion-safe:animate-ping opacity-20" />
            </div>
            <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">
                    Looking for something specific?
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                    <Link href="/all-teacher" className="text-primary font-bold hover:underline underline-offset-4 decoration-2">Teacher Directory</Link>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <Link href="/about" className="text-primary font-bold hover:underline underline-offset-4 decoration-2">About Us</Link>
                    <span className="h-1 w-1 rounded-full bg-border" />
                    <Link href="/contact-us" className="text-primary font-bold hover:underline underline-offset-4 decoration-2">Contact Support</Link>
                </div>
            </div>
        </div>
      </div>

      {/* Fixed bottom info */}
      <div className="absolute bottom-8 left-0 right-0 px-6 text-center">
        <p className="text-xs font-medium tracking-widest text-muted-foreground/50 uppercase">
          Class Pilot Terminal © 2024
        </p>
      </div>
    </div>
  );
}
