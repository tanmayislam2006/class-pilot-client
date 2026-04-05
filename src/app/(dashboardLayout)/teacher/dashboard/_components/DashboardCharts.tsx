"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Charts as ChartsType } from "@/types/teacher.types";

const COLORS = ["#6339a6", "#ee9e21", "#ef4444", "#10b981", "#3b82f6"];
const PIE_COLORS = {
  present: "#10b981",
  absent: "#ef4444",
  late: "#f59e0b",
  default: "#6339a6",
};

interface DashboardChartsProps {
  chartsData: ChartsType;
}

export default function DashboardCharts({ chartsData }: DashboardChartsProps) {
  const { barChart, pieChart } = chartsData;

  // Transform BarChart data for Recharts
  const barData = useMemo(() => {
    if (!barChart || !barChart.categories) return [];
    return barChart.categories.map((category, index) => {
      const dataObj: Record<string, string | number> = { name: category };
      barChart.series.forEach((s) => {
        dataObj[s.key] = s.data[index] || 0;
      });
      return dataObj;
    });
  }, [barChart]);

  // Transform PieChart data for Recharts
  const pieData = useMemo(() => {
    if (!pieChart || !pieChart.series) return [];
    return pieChart.series.map((s) => ({
      name: s.label,
      value: s.value,
      key: s.key,
    }));
  }, [pieChart]);

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      {/* Bar Chart Card */}
      <Card className="border-border/70 bg-card/95 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">{barChart?.title || "Overview"}</CardTitle>
          <CardDescription>{barChart?.description || "Activity across months"}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-muted/50" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  className="fill-muted-foreground text-xs"
                  dy={10}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  className="fill-muted-foreground text-xs"
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px" }} />
                {barChart?.series?.map((s, index) => (
                  <Bar
                    key={s.key}
                    dataKey={s.key}
                    name={s.label}
                    fill={COLORS[index % COLORS.length]}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={50}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Pie Chart Card */}
      <Card className="border-border/70 bg-card/95 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">{pieChart?.title || "Attendance"}</CardTitle>
          <CardDescription>
            {pieChart?.description || `Total records: ${pieChart?.total || 0}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        PIE_COLORS[entry.key?.toLowerCase() as keyof typeof PIE_COLORS] ||
                        COLORS[index % COLORS.length]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
