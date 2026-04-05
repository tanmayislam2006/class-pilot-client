"use client";

import { useQuery } from "@tanstack/react-query";
import { CheckCircle, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { fetchQuizSubmissionsQuery, teacherQueryKeys } from "@/queries/teacher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function QuizSubmissionsTable({
  batchId,
  quizId,
}: {
  batchId: string;
  quizId: string;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: teacherQueryKeys.quizSubmissions(batchId, quizId),
    queryFn: () => fetchQuizSubmissionsQuery(batchId, quizId),
  });
console.log(data)
  if (isLoading) {
    return (
      <div className="space-y-4 py-4">
        <Skeleton className="h-[125px] w-full rounded-xl" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4">
        <Alert variant="destructive">
          <AlertTitle>Error loading submissions</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : "Failed to load data."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const responseData = data?.data;
  if (!responseData) return null;

  const { quiz, batch, submissions } = responseData;

  const averageScore =
    submissions.length > 0
      ? (
          submissions.reduce((acc, sub) => acc + sub.score, 0) /
          submissions.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="space-y-6">
      {/* Back Button Area */}
      <div className="flex items-center justify-between mb-2">
        <Link href={`/teacher/dashboard/my-batch/${batchId}`}>
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Batch Quizzes
          </Button>
        </Link>
      </div>

      {/* Quiz Details Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quiz Title</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quiz.title}</div>
            <p className="text-xs text-muted-foreground mt-1 truncate">
              {batch.name}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submissions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Completed attempts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Over {submissions.length} total students
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="default" className="mt-1">
              Active Quiz
            </Badge>
            <p className="text-xs text-muted-foreground mt-2 truncate" suppressHydrationWarning>
              Due: {new Date(quiz.dueDate).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Students Submissions</CardTitle>
          <CardDescription>
            Detailed list of all student submissions and results for this quiz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submissions.length === 0 ? (
            <div className="flex h-32 items-center justify-center text-sm text-muted-foreground border border-dashed rounded-lg">
              No submissions found for this quiz yet.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Answers</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Submitted On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={submission.student.user.image}
                            alt={submission.student.user.name}
                          />
                          <AvatarFallback>
                            {submission.student.user.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">
                            {submission.student.user.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {submission.student.user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {submission._count.answers} answered
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-primary">
                        {submission.score}
                      </span>{" "}
                      <span className="text-muted-foreground text-sm">
                        / {submission.totalPoints}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground" suppressHydrationWarning>
                      {new Date(submission.submittedAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
