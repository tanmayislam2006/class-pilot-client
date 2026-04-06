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
    submitted: "#6366f1", // Indigo
    pending: "#94a3b8",   // Slate
    overdue: "#f43f5e",   // Rose
    assignedQuizzes: "#8b5cf6", // Violet
    submittedQuizzes: "#6366f1", // Indigo
    presentClasses: "#10b981",   // Emerald
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      {/* Learning Activity Bar Chart */}
      <Card className="overflow-hidden border-border/70 bg-card/60 shadow-xl transition-all hover:border-primary/30">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-black italic tracking-tight uppercase text-primary/90">{barChart.title}</CardTitle>
              <CardDescription className="text-xs font-medium text-muted-foreground">{barChart.description}</CardDescription>
            </div>
            <div className="hidden rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary sm:block">
              Live Data
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[320px] p-0 pr-4 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAssigned" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.assignedQuizzes} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={COLORS.assignedQuizzes} stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorSubmitted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.submittedQuizzes} stopOpacity={0.9}/>
                  <stop offset="95%" stopColor={COLORS.submittedQuizzes} stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.presentClasses} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={COLORS.presentClasses} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.3)" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fontWeight: 600, fill: "hsl(var(--muted-foreground))" }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fontWeight: 500, fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip 
                cursor={{ fill: "hsl(var(--primary) / 0.03)" }} 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-2xl border border-border/50 bg-background/90 p-3 shadow-2xl backdrop-blur-xl ring-1 ring-border/50">
                        <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</p>
                        <div className="space-y-1.5">
                          {payload.map((p) => (
                            <div key={p.name} className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: p.fill === "url(#colorAssigned)" ? COLORS.assignedQuizzes : p.fill === "url(#colorSubmitted)" ? COLORS.submittedQuizzes : COLORS.presentClasses }} />
                                <span className="text-[11px] font-semibold text-muted-foreground">{p.name}</span>
                              </div>
                              <span className="text-xs font-black">{p.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", paddingBottom: "20px" }} />
              <Bar dataKey="assignedQuizzes" name="Assigned" fill="url(#colorAssigned)" radius={[6, 6, 0, 0]} barSize={24} />
              <Bar dataKey="submittedQuizzes" name="Submitted" fill="url(#colorSubmitted)" radius={[6, 6, 0, 0]} barSize={24} />
              <Bar dataKey="presentClasses" name="Attendance" fill="url(#colorAttendance)" radius={[6, 6, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quiz Progress Pie Chart */}
      <Card className="relative overflow-hidden border-border/70 bg-card/60 shadow-xl transition-all hover:border-primary/30">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-xl font-black italic tracking-tight uppercase text-primary/90">{pieChart.title}</CardTitle>
          <CardDescription className="text-xs font-medium text-muted-foreground">{pieChart.description}</CardDescription>
        </CardHeader>
        <CardContent className="relative h-[320px] p-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={75}
                outerRadius={100}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={(COLORS as Record<string, string>)[entry.key] || "var(--primary)"} 
                    className="transition-opacity hover:opacity-80 outline-none"
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: "16px", border: "1px solid hsl(var(--border) / 0.5)", backgroundColor: "hsl(var(--background) / 0.95)", backdropFilter: "blur(8px)", boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.5)" }}
                itemStyle={{ fontSize: "12px", fontWeight: 600 }}
              />
              <Legend verticalAlign="bottom" height={40} iconType="circle" wrapperStyle={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-5xl font-black tracking-tighter text-primary drop-shadow-sm">{pieChart.total}</span>
            <div className="flex flex-col items-center leading-none">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Total</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Tasks</span>
            </div>
          </div>
          
          {/* Decorative Background Element */}
          <div className="absolute -bottom-10 -right-10 size-32 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="absolute -top-10 -left-10 size-32 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        </CardContent>
      </Card>
    </div>
  );
}
