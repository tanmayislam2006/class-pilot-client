import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AppRoute } from "@/routes";

type FeatureStat = {
  label: string;
  value: string;
  note: string;
};



type DashboardFeaturePageProps = {
  currentHref: string;
  description: string;
  eyebrow: string;
  routes: AppRoute[];
  stats: FeatureStat[];
  title: string;
  steps?: FeatureStep[];
};

type FeatureStep = {
  title: string;
  description: string;
};

export default function DashboardFeaturePage({
  currentHref,
  description,
  eyebrow,
  routes,
  stats,
  title,
  steps = [],
}: DashboardFeaturePageProps) {
  const currentRoute = routes.find((route) => route.href === currentHref);
  const CurrentIcon: LucideIcon = currentRoute?.icon ?? Sparkles;
  const relatedRoutes = routes.filter((route) => route.href !== currentHref).slice(0, 4);
  const primaryRoute = relatedRoutes[0];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[30px] border border-border/70 bg-[linear-gradient(135deg,rgba(99,57,166,0.14),rgba(238,158,33,0.10),rgba(255,255,255,0.98))] p-6 shadow-[0_28px_80px_-42px_rgba(99,57,166,0.42)] md:p-8">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,rgba(99,57,166,0.16),transparent_65%)] lg:block" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <Badge className="rounded-full px-3 py-1">{eyebrow}</Badge>
            <div className="flex items-start gap-4">
              <div className="mt-1 flex size-14 shrink-0 items-center justify-center rounded-2xl bg-background/80 text-primary shadow-sm ring-1 ring-primary/10">
                <CurrentIcon className="size-6" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  {title}
                </h1>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                  {description}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {primaryRoute ? (
              <Button asChild className="rounded-full px-5">
                <Link href={primaryRoute.href}>
                  Open {primaryRoute.title}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : null}
            <Button variant="outline" className="rounded-full px-5">
              Workspace ready
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="border border-border/70 bg-card/95 shadow-[0_18px_48px_-34px_rgba(15,23,42,0.32)]"
          >
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-3xl font-semibold tracking-tight">
                {stat.value}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">{stat.note}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {steps.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Feature Workflow
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <Card key={step.title} className="relative border-border/60 bg-background/50 shadow-none hover:bg-background/80 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary ring-1 ring-primary/20">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <CardTitle className="text-base font-medium">
                      {step.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
