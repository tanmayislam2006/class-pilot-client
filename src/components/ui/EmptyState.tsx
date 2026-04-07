import React from "react";
import { LucideIcon, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export default function EmptyState({
  icon: Icon = Rocket,
  title,
  description,
  actionLabel,
  actionHref,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[400px] flex-col items-center justify-center rounded-[32px] border border-dashed border-border/60 bg-muted/5 p-8 text-center animate-in fade-in zoom-in duration-500",
        className
      )}
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 -z-10 bg-primary/10 blur-2xl rounded-full" />
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/5 text-primary transition-transform hover:scale-110">
          <Icon className="h-10 w-10" />
        </div>
      </div>
      
      <h3 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mb-8 max-w-[320px] text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
      
      {actionLabel && actionHref && (
        <Button
          asChild
          className="h-12 rounded-2xl bg-primary px-8 font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all"
        >
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
}
