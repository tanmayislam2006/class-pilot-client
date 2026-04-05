import { BookCheck, CalendarDays, ClipboardList, Users } from "lucide-react";
import Link from "next/link";

import RoleDashboardHome from "@/components/modules/dashboard/RoleDashboardHome";
import { teacherRoutes } from "@/routes";
import { teacherService } from "@/service/teacher.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import DashboardCharts from "./_components/DashboardCharts";

export default async function TeacherDashboardPage() {
  const response = await teacherService.getDashboardData();
  const dashboardData = response.data;
  
  if (!dashboardData) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground/60 h-[50vh]">
        <p>No dashboard data found.</p>
      </div>
    );
  }

  const { summary, recentQuizzes, recentSubmissions, charts } = dashboardData;

  return (
    <div className="space-y-8">
      <RoleDashboardHome
        eyebrow="Teacher workspace"
        title="Manage classroom momentum with faster quiz, batch, and submission workflows."
        description="Use the dashboard to stay on top of quiz creation, monitor student activity, and move through teaching operations without jumping between scattered pages."
        metrics={[
          {
            label: "Active Quizzes",
            value: String(summary?.totalPublishedQuizzes || 0),
            note: `${summary?.totalQuizzes || 0} total quizzes created`,
            icon: ClipboardList,
          },
          {
            label: "Total Students",
            value: String(summary?.totalStudents || 0),
            note: `Across ${summary?.totalBatches || 0} active batches`,
            icon: Users,
          },
          {
            label: "Attendance Rate",
            value: `${summary?.attendanceRate || 0}%`,
            note: "Average class attendance",
            icon: CalendarDays,
          },
          {
            label: "Avg. Score",
            value: `${Math.round(summary?.averageScorePercentage || 0)}%`,
            note: "Strong performance across classes",
            icon: BookCheck,
          },
        ]}
        routes={teacherRoutes}
      />

      {/* Render Charts if data exists */}
      {charts && <DashboardCharts chartsData={charts} />}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Quizzes Card */}
        <Card className="border-border/70 bg-card/95 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-xl">Recent Quizzes</CardTitle>
              <CardDescription>Latest assessments across your batches</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/teacher/dashboard/all-quiz">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="rounded-xl border bg-background/50">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[40%]">Quiz Name</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Submits</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentQuizzes?.length > 0 ? (
                    recentQuizzes.map((quiz) => (
                      <TableRow key={quiz.id}>
                        <TableCell className="font-medium">{quiz.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-normal">
                            {quiz.batch?.name || "N/A"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {quiz.isPublished ? (
                            <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400">
                              Published
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Draft</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground font-medium">
                          {quiz._count?.submissions || 0}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                        No recent quizzes found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Submissions Card */}
        <Card className="border-border/70 bg-card/95 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-xl">Recent Submissions</CardTitle>
              <CardDescription>Latest answers needing review</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/teacher/dashboard/all-submission">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="rounded-xl border bg-background/50">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead>Student</TableHead>
                    <TableHead>Quiz</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentSubmissions?.length > 0 ? (
                    recentSubmissions.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell className="font-medium">{sub.student?.user?.name || "Unknown"}</TableCell>
                        <TableCell className="text-muted-foreground">{sub.quiz?.title || "N/A"}</TableCell>
                        <TableCell className="text-right">
                          <span className="font-semibold">{sub.score}</span>
                          <span className="text-muted-foreground text-xs">/{sub.totalPoints}</span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                        No recent submissions found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
