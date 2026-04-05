import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { AppRoute } from "@/routes";

type Metric = {
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
};

type RoleDashboardHomeProps = {
  eyebrow: string;
  title: string;
  description: string;
  metrics: Metric[];
  routes: AppRoute[];
};

export default function RoleDashboardHome({
  eyebrow,
  title,
  description,
  metrics,
  routes,
}: RoleDashboardHomeProps) {
  const featuredRoutes = routes.slice(0, 4);

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[28px] border border-border/70 bg-[linear-gradient(135deg,rgba(99,57,166,0.12),rgba(238,158,33,0.08),rgba(255,255,255,0.92))] p-6 shadow-[0_24px_60px_-40px_rgba(99,57,166,0.45)] md:p-8">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,rgba(99,57,166,0.14),transparent_65%)] lg:block" />
        <div className="relative max-w-3xl space-y-4">
          <Badge className="rounded-full px-3 py-1">{eyebrow}</Badge>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {title}
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
              {description}
            </p>
          </div>
          {featuredRoutes[1] && (
            <Button asChild className="rounded-full px-5">
              <Link href={featuredRoutes[1].href}>
                Open {featuredRoutes[1].title}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          )}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <Card key={metric.label} className="border-border/70 bg-card/95 shadow-sm">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="space-y-1">
                  <CardDescription>{metric.label}</CardDescription>
                  <CardTitle className="text-3xl font-semibold tracking-tight">
                    {metric.value}
                  </CardTitle>
                </div>
                <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                  <Icon className="size-5" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="size-4 text-primary" />
                  {metric.note}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-border/70 bg-card/95 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Quick Access</CardTitle>
            <CardDescription>
              Jump straight into the workflows you use most.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {featuredRoutes.map((route) => {
              const Icon = route.icon;

              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className="group rounded-2xl border border-border/70 bg-background/80 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                  <div className="mt-4">
                    <h3 className="font-medium">{route.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Open {route.title.toLowerCase()} and continue your workflow.
                    </p>
                  </div>
                </Link>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/95 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">This Workspace</CardTitle>
            <CardDescription>
              Navigation is role-aware and updates automatically from your route config.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {routes.map((route, index) => {
              const Icon = route.icon;

              return (
                <div
                  key={route.href}
                  className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/80 px-3 py-3"
                >
                  <div className="flex size-10 items-center justify-center rounded-xl bg-muted text-foreground">
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{route.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{route.href}</p>
                  </div>
                  <Badge variant={index === 0 ? "default" : "outline"}>
                    {index === 0 ? "Home" : "Page"}
                  </Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section> */}
     
    </div>
  );
}
