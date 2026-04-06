"use client";

import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardCharts } from "@/types/student.types";

interface ActivityChartsProps {
  charts: DashboardCharts;
}

export default function ActivityCharts({ charts }: ActivityChartsProps) {
  const { barChart, pieChart } = charts;

  // Format bar chart data
  const barData = barChart.categories.map((category, index) => {
    const entry: Record<string, string | number> = { month: category };
    barChart.series.forEach((s) => {
      entry[s.key] = s.data?.[index] || 0;
    });
    return entry;
  });

  // Format pie chart data
  const pieData = pieChart.series.map((s) => ({
    name: s.label,
    value: s.value || 0,
    key: s.key,
  }));

  const COLORS = {
    submitted: "hsl(var(--primary))",
    pending: "hsl(var(--primary) / 0.4)",
    overdue: "hsl(var(--destructive))",
    assignedQuizzes: "hsl(var(--primary) / 0.7)",
    submittedQuizzes: "hsl(var(--primary))",
    presentClasses: "hsl(var(--accent-foreground) / 0.6)",
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
      {/* Learning Activity Bar Chart */}
      <Card className="border-border/70 bg-card/60 shadow-sm transition-all hover:border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold">{barChart.title}</CardTitle>
          <CardDescription className="text-xs">{barChart.description}</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] p-0 pr-4 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.4)" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip 
                cursor={{ fill: "hsl(var(--primary) / 0.05)" }} 
                contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: "11px", fontWeight: 500 }} />
              <Bar dataKey="assignedQuizzes" name="Assigned" fill={COLORS.assignedQuizzes} radius={[4, 4, 0, 0]} />
              <Bar dataKey="submittedQuizzes" name="Submitted" fill={COLORS.submittedQuizzes} radius={[4, 4, 0, 0]} />
              <Bar dataKey="presentClasses" name="Attendance" fill={COLORS.presentClasses} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quiz Progress Pie Chart */}
      <Card className="border-border/70 bg-card/60 shadow-sm transition-all hover:border-border">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-lg font-bold">{pieChart.title}</CardTitle>
          <CardDescription className="text-xs">{pieChart.description}</CardDescription>
        </CardHeader>
        <CardContent className="relative h-[300px] p-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={6}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={(COLORS as Record<string, string>)[entry.key] || "var(--primary)"} stroke="none" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))" }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: "11px", fontWeight: 500 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold tracking-tighter">{pieChart.total}</span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Total Quizzes</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
