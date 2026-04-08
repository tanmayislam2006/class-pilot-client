"use client";

import { useQuery } from "@tanstack/react-query";
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Clock, 
  Trophy, 
  Target, 
  Loader2,
  ChevronLeft,
  Calendar,
  Layers,
  Info
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { studentQueryKeys, fetchSubmissionDetailsQuery } from "@/queries/student";
import DashboardFeaturePage from "@/components/modules/dashboard/DashboardFeaturePage";
import { studentRoutes } from "@/routes";
import { cn } from "@/lib/utils";
import { MathText } from "@/components/shared/MathText";

interface SubmissionDetailsClientProps {
  submissionId: string;
}

export default function SubmissionDetailsClient({ submissionId }: SubmissionDetailsClientProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: studentQueryKeys.submissionDetails(submissionId),
    queryFn: () => fetchSubmissionDetailsQuery(submissionId),
  });

  if (isLoading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Loading your results...</p>
      </div>
    );
  }

  if (error || !data?.success || !data?.data) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-6 text-center">
        <div className="rounded-full bg-destructive/10 p-6">
          <XCircle className="h-12 w-12 text-destructive" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Failed to load submission</h2>
          <p className="text-muted-foreground max-w-md">
            We couldn&apos;t retrieve your quiz details. This might be due to a network error or an invalid submission ID.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/dashboard/submission-history">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to History
          </Link>
        </Button>
      </div>
    );
  }

  const { submission, quiz, answers, summary } = data.data;

  const stats = [
    {
      label: "Final Score",
      value: `${submission.score}/${submission.totalPoints}`,
      note: `You earned ${submission.percentage}% of total points.`,
      icon: <Trophy className="h-5 w-5 text-amber-500" />
    },
    {
      label: "Quiz Result",
      value: submission.result,
      note: submission.result === "PASS" ? "Congratulations on passing!" : "You didn't meet the passing criteria.",
      icon: submission.result === "PASS" 
        ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> 
        : <XCircle className="h-5 w-5 text-destructive" />
    },
    {
      label: "Duration",
      value: `${quiz.duration}m`,
      note: `Total time allotted for this quiz.`,
      icon: <Clock className="h-5 w-5 text-blue-500" />
    },
    {
      label: "Questions",
      value: answers.length.toString(),
      note: `Total questions attempted: ${summary.correctCount + summary.wrongCount}`,
      icon: <Layers className="h-5 w-5 text-indigo-500" />
    }
  ];

  return (
    <div className="space-y-10 pb-20">
      <div className="flex items-center gap-2 -mb-8">
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
          <Link href="/dashboard/submission-history">
            <ChevronLeft className="mr-1 h-3.5 w-3.5" />
            Back to History
          </Link>
        </Button>
      </div>

      <DashboardFeaturePage
        currentHref="/dashboard/submission-history"
        title={quiz.title}
        eyebrow="Submission Review"
        description={quiz.description || "Review your performance and learn from your mistakes."}
        routes={studentRoutes}
        stats={stats.map(({ label, value, note }) => ({ label, value: value.toString(), note }))}
      />

      <div className="grid gap-6 md:grid-cols-3">
        {/* Performance Summary Card */}
        <Card className="md:col-span-1 overflow-hidden border-border/40 bg-card/40 backdrop-blur-sm">
          <div className="h-2 bg-linear-to-r from-primary/80 to-primary" />
          <CardContent className="p-6 space-y-6">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Performance Breakdown
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Correct Answers
                  </span>
                  <span className="font-medium">{summary.correctCount}</span>
                </div>
                <Progress value={(summary.correctCount / answers.length) * 100} className="h-1.5 bg-emerald-500/10 [&>div]:bg-emerald-500" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <XCircle className="h-3.5 w-3.5 text-destructive" /> Wrong Answers
                  </span>
                  <span className="font-medium">{summary.wrongCount}</span>
                </div>
                <Progress value={(summary.wrongCount / answers.length) * 100} className="h-1.5 bg-destructive/10 [&>div]:bg-destructive" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <HelpCircle className="h-3.5 w-3.5 text-amber-500" /> Skipped
                  </span>
                  <span className="font-medium">{summary.skippedCount}</span>
                </div>
                <Progress value={(summary.skippedCount / answers.length) * 100} className="h-1.5 bg-amber-500/10 [&>div]:bg-amber-500" />
              </div>
            </div>

            <div className="pt-4 border-t border-border/40 space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Submitted On</span>
                <span>{format(new Date(submission.submittedAt), "PPP")}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Submitted At</span>
                <span>{format(new Date(submission.submittedAt), "hh:mm a")}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Question Review */}
        <div className="md:col-span-2 space-y-6">
          <h3 className="font-bold text-xl px-2 flex items-center gap-2">
             Question by Question Review
             <Badge variant="outline" className="ml-2 font-normal text-muted-foreground">
               {answers.length} Questions
             </Badge>
          </h3>

          <div className="space-y-4">
            {answers.map((answer, index) => {
              const isSkipped = !answer.selectedAnswer;
              const isWrong = !isSkipped && !answer.isCorrect;
              const isCorrect = answer.isCorrect;

              return (
                <Card 
                  key={answer.questionId} 
                  className={cn(
                    "overflow-hidden border-border/40 bg-card/60 transition-all hover:bg-card/80",
                    isCorrect && "border-emerald-500/20",
                    isWrong && "border-destructive/20",
                    isSkipped && "border-amber-500/20"
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4 items-start">
                      <div className={cn(
                        "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                        isCorrect && "bg-emerald-500 text-white",
                        isWrong && "bg-destructive text-white",
                        isSkipped && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      )}>
                        {index + 1}
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div className="flex justify-between items-start gap-4">
                          <MathText className="font-medium text-[15px] leading-relaxed" text={answer.questionText} />
                          <Badge 
                            variant="secondary" 
                            className={cn(
                              "shrink-0",
                              isCorrect && "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10",
                              isWrong && "bg-destructive/10 text-destructive hover:bg-destructive/10",
                              isSkipped && "bg-amber-500/10 text-amber-600 hover:bg-amber-500/10"
                            )}
                          >
                            {isCorrect ? "Correct" : isWrong ? "Incorrect" : "Skipped"}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {answer.options.map((option) => {
                            const isSelected = answer.selectedAnswer === option.key;
                            const isCorrectOption = answer.correctAnswer === option.key;
                            
                            let variantStyles = "bg-secondary/40 border-border/40";
                            
                            if (isCorrectOption) {
                              variantStyles = "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-medium scale-[1.02] shadow-sm";
                            } else if (isSelected && !isCorrectOption) {
                              variantStyles = "bg-destructive/10 border-destructive/30 text-destructive font-medium";
                            }

                            return (
                              <div 
                                key={option.key}
                                className={cn(
                                  "flex gap-3 items-center p-3 rounded-xl border text-sm transition-all",
                                  variantStyles
                                )}
                              >
                                <span className={cn(
                                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-[11px] font-mono",
                                  isCorrectOption && "bg-emerald-500 border-emerald-500 text-white",
                                  isSelected && !isCorrectOption && "bg-destructive border-destructive text-white",
                                  !isSelected && !isCorrectOption && "bg-background border-border"
                                )}>
                                  {option.key}
                                </span>
                                <MathText text={option.value} />
                                {isCorrectOption && (
                                  <CheckCircle2 className="h-3.5 w-3.5 ml-auto text-emerald-500" />
                                )}
                                {isSelected && !isCorrectOption && (
                                  <XCircle className="h-3.5 w-3.5 ml-auto text-destructive" />
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {answer.explanation && (
                          <div className="mt-4 flex gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10 text-sm">
                            <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <div className="space-y-1">
                              <p className="font-semibold text-primary/80 text-xs uppercase tracking-wider">Explanation</p>
                              <MathText className="text-muted-foreground leading-relaxed italic" text={answer.explanation} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
