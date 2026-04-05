import { Award, GraduationCap, ShieldCheck, Users, Calendar, Clock, BookOpen } from "lucide-react";

import RoleDashboardHome from "@/components/modules/dashboard/RoleDashboardHome";
import { adminRoutes } from "@/routes";
import { adminService } from "@/service/admin.service";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminDashboardPage() {
  const result = await adminService.getDashboardData();

  if (!result.success || !result.data) {
    return <div>Failed to load dashboard data.</div>;
  }

  const { counts, recentBatches, recentQuizzes } = result.data;

  return (
    <div className="space-y-6">
      <RoleDashboardHome
        eyebrow="Admin workspace"
        title="Oversee teachers, students, and platform operations from one control center."
        description="Review your core organization metrics, move into management pages quickly, and keep the academic platform aligned without digging through raw tables first."
        metrics={[
          {
            label: "Total Teachers",
            value: String(counts.totalTeachers),
            note: "Faculty managing your classes",
            icon: GraduationCap,
          },
          {
            label: "Total Students",
            value: String(counts.totalStudents),
            note: "Current student body count",
            icon: Users,
          },
          {
            label: "Active Batches",
            value: String(counts.totalBatches),
            note: "Classes currently running",
            icon: Award,
          },
          {
            label: "System Health",
            value: `${counts.activeUsers} Active`,
            note: `${counts.blockedUsers} Blocked Users`,
            icon: ShieldCheck,
          },
        ]}
        routes={adminRoutes}
      />

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/70 bg-card/95 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="size-5 text-primary" />
              Recent Batches
            </CardTitle>
            <CardDescription>
              The most recently created classes across the academy.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBatches.map((batch) => (
                <div
                  key={batch.id}
                  className="flex items-start justify-between rounded-2xl border border-border/60 bg-background/80 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{batch.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <GraduationCap className="size-3.5" />
                      {batch.teacher?.user?.name || "Unassigned"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {new Date(batch.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {recentBatches.length === 0 && (
                <p className="text-sm text-muted-foreground pt-2">No recent batches found.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/95 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="size-5 text-primary" />
              Recent Quizzes
            </CardTitle>
            <CardDescription>
              The latest quizzes created and their current publishing status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/80 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30"
                >
                  <div className="min-w-0 pr-4 space-y-1">
                    <p className="font-medium truncate text-foreground">{quiz.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Clock className="size-3.5" /> Due: {new Date(quiz.dueDate).toLocaleDateString()} 
                      <span className="opacity-50">|</span> 
                      {quiz.batch?.name}
                    </p>
                  </div>
                  <Badge variant={quiz.isPublished ? "default" : "secondary"} className="shrink-0 rounded-full px-3 py-0.5">
                    {quiz.isPublished ? "Published" : "Draft"}
                  </Badge>
                </div>
              ))}
              {recentQuizzes.length === 0 && (
                <p className="text-sm text-muted-foreground pt-2">No recent quizzes found.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
