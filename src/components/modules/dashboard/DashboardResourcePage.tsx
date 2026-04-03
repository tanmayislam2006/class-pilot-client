import { Badge } from "@/components/ui/badge";

type Metric = {
  label: string;
  value: string;
  note: string;
};

type DashboardResourcePageProps = {
  children?: React.ReactNode;
  description: string;
  eyebrow: string;
  metrics: Metric[];
  title: string;
};

export default function DashboardResourcePage({
  children,
  description,
  eyebrow,
  title,
}: DashboardResourcePageProps) {
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[30px] border border-border/70 bg-[linear-gradient(135deg,rgba(99,57,166,0.14),rgba(238,158,33,0.10),rgba(255,255,255,0.98))] p-6 shadow-[0_28px_80px_-42px_rgba(99,57,166,0.42)] md:p-8">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,rgba(99,57,166,0.16),transparent_65%)] lg:block" />
        <div className="relative max-w-3xl space-y-4">
          <Badge className="rounded-full px-3 py-1">{eyebrow}</Badge>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {title}
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
              {description}
            </p>
          </div>
        </div>
      </section>

      {children}
    </div>
  );
}
