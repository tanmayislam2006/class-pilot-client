import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
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

type FeatureStep = {
  title: string;
  description: string;
};

type DashboardFeaturePageProps = {
  currentHref: string;
  description: string;
  eyebrow: string;
  routes: AppRoute[];
  stats: FeatureStat[];
  steps: FeatureStep[];
  title: string;
};

export default function DashboardFeaturePage({
  currentHref,
  description,
  eyebrow,
  routes,
  stats,
  steps,
  title,
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

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="border border-border/70 bg-card/95 shadow-[0_18px_48px_-34px_rgba(15,23,42,0.28)]">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Workflow Focus</CardTitle>
            <CardDescription>
              Use this page as the working surface for your next actions in this module.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="flex gap-3 rounded-2xl border border-border/70 bg-background/80 p-4"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {index + 1}
                </div>
                <div className="space-y-1">
                  <p className="font-medium">{step.title}</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-border/70 bg-card/95 shadow-[0_18px_48px_-34px_rgba(15,23,42,0.28)]">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Related Pages</CardTitle>
            <CardDescription>
              Navigate to connected tools without going back to the main dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {relatedRoutes.map((route) => {
              const Icon = route.icon;

              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-background/80 px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5"
                >
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{route.title}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {route.href}
                    </p>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              );
            })}

            <div className="rounded-2xl border border-dashed border-primary/25 bg-primary/5 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-primary">
                  <CheckCircle2 className="size-5" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">Ready for real data</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    This layout is now production-shaped, so you can wire actual API data
                    into cards, tables, and forms without redesigning the page again.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
