"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  message?: string;
  className?: string;
  fullPage?: boolean;
}

export default function Loading({
  message = "Loading...",
  className,
  fullPage = false,
}: LoadingProps) {
  const content = (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className="relative flex items-center justify-center">
        {/* Outer Halo */}
        <div className="absolute h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        {/* Inner Loader */}
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
      {message && (
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(99,57,166,0.18),transparent_45%),linear-gradient(180deg,white,rgba(248,247,252,1))] backdrop-blur-sm">
        <div className="relative overflow-hidden rounded-[32px] border border-border/60 bg-white/70 p-10 shadow-[0_32px_100px_-24px_rgba(15,23,42,0.12)] backdrop-blur-xl md:p-14">
            {/* Background Glow */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-primary/5 blur-3xl" />
            
            <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="relative flex h-20 w-20 items-center justify-center">
                    <div className="absolute inset-0 animate-[spin_3s_linear_infinite] rounded-full border-2 border-dashed border-primary/30" />
                    <div className="absolute inset-2 animate-[spin_2s_linear_infinite_reverse] rounded-full border-2 border-primary/10 border-t-primary/60" />
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
                
                <div className="text-center">
                    <h3 className="text-lg font-semibold text-foreground tracking-tight">Class Pilot</h3>
                    <p className="mt-1 text-sm font-medium text-muted-foreground/80">{message}</p>
                </div>

                <div className="mt-2 flex gap-1.5">
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40 [animation-delay:-0.3s]" />
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60 [animation-delay:-0.15s]" />
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40" />
                </div>
            </div>
        </div>
      </div>
    );
  }

  return content;
}
