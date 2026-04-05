"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchBatchQuizzesQuery, teacherQueryKeys } from "@/queries/teacher";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BatchQuizzesTable({ batchId }: { batchId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: teacherQueryKeys.batchQuizzes(batchId),
    queryFn: () => fetchBatchQuizzesQuery(batchId),
  });
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[200px] w-full rounded-xl" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-red-500">
          Failed to load quizzes. Please try again later.
        </CardContent>
      </Card>
    );
  }
  console.log(data?.data);
  // Expecting data.data to be an array of Quiz
  const quizzes = data?.data?.quizzes || [];
  console.log(quizzes);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Batch Quizzes</CardTitle>
        <CardDescription>
          View quizzes assigned to this specific batch and check student submissions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {quizzes.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground border border-dashed rounded-lg">
            No quizzes assigned to this batch yet.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quizzes.map((quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell className="font-medium">{quiz.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {quiz._count.questions} Questions
                    </Badge>
                  </TableCell>
                  <TableCell suppressHydrationWarning>
                     <Badge variant="secondary">
                       {quiz._count.submissions} Submissions
                     </Badge>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/teacher/dashboard/my-batch/${batchId}/quiz/${quiz.id}/submissions`}
                    >
                      <Button variant="outline" size="sm">
                        View Submissions
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
