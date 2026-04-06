"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, BookOpen, Clock, FileCheck, Timer, Trophy } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import type { StudentQuiz, StudentSubmission } from "@/types/student.types";

interface RecentActivityListsProps {
  quizzes: StudentQuiz[];
  submissions: (StudentSubmission & { quiz: Partial<StudentQuiz> & { batch: { name: string } } })[];
}

export default function RecentActivityLists({ quizzes, submissions }: RecentActivityListsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Recent Assigned Quizzes */}
      <Card className="border-border/70 bg-card/60 shadow-sm transition-all hover:border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Recent Quizzes
            </CardTitle>
            <CardDescription className="text-xs">Newly assigned assessments for your batch.</CardDescription>
          </div>
          <Link href="/dashboard/all-quiz" className="text-xs font-bold text-primary flex items-center hover:underline">
            View All
            <ArrowUpRight className="h-3 w-3 inline-block ml-0.5" />
          </Link>
        </CardHeader>
        <CardContent className="space-y-3">
          {quizzes.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground italic">No new quizzes assigned yet.</p>
          ) : (
            quizzes.slice(0, 3).map((quiz) => (
              <div key={quiz.id} className="group relative flex items-center gap-3 rounded-2xl border border-border/40 bg-background/40 p-3 transition-colors hover:border-primary/20 hover:bg-primary/5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Timer className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="truncate text-sm font-semibold">{quiz.title}</p>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{quiz.duration}m</span>
                    <span className="truncate">Due: {format(new Date(quiz.dueDate), "MMM dd")}</span>
                  </div>
                </div>
                <Badge variant={quiz.status === "submitted" ? "default" : "secondary"} className="h-fit rounded-full text-[10px] px-2 py-0">
                  {quiz.status}
                </Badge>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Recent Submissions */}
      <Card className="border-border/70 bg-card/60 shadow-sm transition-all hover:border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-primary" />
              Latest Submissions
            </CardTitle>
            <CardDescription className="text-xs">Your last performed quiz attempts and results.</CardDescription>
          </div>
          <Link href="/dashboard/submission-history" className="text-xs font-bold text-primary flex items-center hover:underline">
            History
            <ArrowUpRight className="h-3 w-3 inline-block ml-0.5" />
          </Link>
        </CardHeader>
        <CardContent className="space-y-3">
          {submissions.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground italic">No submissions recorded.</p>
          ) : (
            submissions.slice(0, 3).map((sub) => (
              <div key={sub.id} className="flex items-center gap-3 rounded-2xl border border-border/40 bg-background/40 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="truncate text-sm font-semibold">{sub.quiz.title}</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-2">
                    Submitted: {format(new Date(sub.submittedAt), "MMM dd, hh:mm a")}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-primary">{sub.score}/{sub.totalPoints}</p>
                  <p className="text-[10px] font-mono text-muted-foreground">{sub.percentage}%</p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
