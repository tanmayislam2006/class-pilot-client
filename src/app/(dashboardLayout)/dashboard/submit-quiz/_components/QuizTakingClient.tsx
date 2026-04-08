"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  HelpCircle, 
  AlertCircle,
  CheckCircle2,
  Send,
  Loader2,
  Trophy,
  XCircle,
  LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { studentQueryKeys, fetchQuizDetailsQuery, submitQuizMutation } from "@/queries/student";
// import { studentService } from "@/service/student.service";
import { cn } from "@/lib/utils";
import { QuizSubmissionResponseData, QuizDetailsQuestion, QuizSubmissionPayload } from "@/types/student.types";
import { MathText } from "@/components/shared/MathText";

interface QuizTakingClientProps {
  batchId: string;
  quizId: string;
}

export default function QuizTakingClient({ batchId, quizId }: QuizTakingClientProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [result, setResult] = useState<QuizSubmissionResponseData | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: studentQueryKeys.quizDetails(batchId, quizId),
    queryFn: () => fetchQuizDetailsQuery(batchId, quizId),
  });

  const quiz = data?.data;
  const questions = quiz?.questions || [];
  const currentQuestion = questions[currentIdx];

  const { mutate: submitMutation, isPending: isSubmitting } = useMutation({
    mutationFn: (payload: QuizSubmissionPayload) => submitQuizMutation(batchId, quizId, payload),
    onSuccess: (res) => {
      if (res.success && res.data) {
        setResult(res.data);
        toast.success("Quiz submitted successfully!");
        queryClient.invalidateQueries({ queryKey: studentQueryKeys.assignedQuizzes });
        queryClient.invalidateQueries({ queryKey: studentQueryKeys.dashboard });
      }
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to submit quiz");
    },
  });

  const handleSubmit = useCallback(() => {
    const payload: QuizSubmissionPayload = {
      submission: {
        answers: Object.entries(answers).map(([qId, ans]) => ({
          questionId: qId,
          selectedAnswer: ans,
        })),
      },
    };
    submitMutation(payload);
  }, [answers, submitMutation]);

  // Timer logic - only initialize once when quiz data is available
  useEffect(() => {
    if (quiz && timeLeft === null) {
      const initialTime = quiz.duration * 60;
      setTimeLeft(initialTime);
    }
  }, [quiz?.duration, timeLeft]); // Use quiz.duration instead of whole quiz object

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || result) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, result]);

  // Handle auto-submit when timer hits zero
  useEffect(() => {
    if (timeLeft === 0 && !result && quiz) {
      toast.warning("Time's up! Submitting your answers automatically.");
      handleSubmit();
    }
  }, [timeLeft, result, quiz, handleSubmit]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const selectAnswer = (ans: string) => {
    if (result) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: ans }));
  };

  const progress = useMemo(() => {
    if (!questions.length) return 0;
    return (Object.keys(answers).length / questions.length) * 100;
  }, [answers, questions.length]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse font-medium">Preparing your session...</p>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <Card className="border-destructive/20 bg-destructive/5 overflow-hidden">
        <div className="h-1 bg-destructive" />
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <CardTitle>Error Loading Quiz</CardTitle>
          </div>
          <CardDescription>
            {error?.message || "Something went wrong while fetching the quiz details. Please try again later."}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="outline" onClick={() => router.back()}>
            Go Back
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Result View
  if (result) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto py-8">
        <Card className="border-primary/20 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-500">
          <div className="h-2 bg-linear-to-r from-primary to-primary-foreground" />
          <CardHeader className="text-center pb-2">
            <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">Quiz Results</CardTitle>
            <CardDescription className="text-base font-medium">
              {quiz.title}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 pt-6">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card/50 border border-border/50 rounded-2xl p-6 text-center space-y-2">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Your Score</p>
                  <p className="text-4xl font-extrabold text-primary">{result.score} / {result.totalPoints}</p>
                </div>
                <div className="bg-card/50 border border-border/50 rounded-2xl p-6 text-center space-y-2">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Accuracy</p>
                  <p className="text-4xl font-extrabold text-primary">{Math.round((result.score / result.totalPoints) * 100)}%</p>
                </div>
                <div className="bg-card/50 border border-border/50 rounded-2xl p-6 text-center space-y-2">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Questions</p>
                  <p className="text-4xl font-extrabold text-primary">{questions.length}</p>
                </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary/70" />
                  Detailed Review
                </h3>
                <div className="space-y-4">
                  {questions.map((q: QuizDetailsQuestion, idx: number) => {
                    const resultAnswer = result.answers.find(a => a.questionId === q.id);
                    const isCorrect = resultAnswer?.isCorrect;
                    const selected = resultAnswer?.selectedAnswer;
                    
                    return (
                      <div key={q.id} className={cn(
                        "p-5 rounded-2xl border transition-all duration-300",
                        isCorrect 
                          ? "bg-green-500/5 border-green-500/20 hover:border-green-500/40" 
                          : "bg-red-500/5 border-red-500/20 hover:border-red-500/40"
                      )}>
                        <div className="flex justify-between items-start gap-4 mb-4">
                           <div className="space-y-1">
                              <span className="text-xs font-bold text-muted-foreground uppercase">Question {idx + 1}</span>
                              <MathText className="font-semibold text-foreground/90" text={q.questionText} />
                           </div>
                           <Badge variant={isCorrect ? "default" : "destructive"} className="shrink-0">
                              {isCorrect ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                              {isCorrect ? "Correct" : "Incorrect"}
                           </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                           {(['A', 'B', 'C', 'D'] as const).map((opt) => (
                             <div 
                               key={opt}
                               className={cn(
                                 "flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-colors",
                                 selected === opt && (isCorrect ? "bg-green-500/10 border-green-500/30 text-green-700" : "bg-red-500/10 border-red-500/30 text-red-700"),
                                 selected !== opt && "bg-background/50 border-border/50 text-muted-foreground"
                               )}
                             >
                                <span className={cn(
                                  "w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold border",
                                  selected === opt && (isCorrect ? "bg-green-500 text-white border-green-600" : "bg-red-500 text-white border-red-600"),
                                  selected !== opt && "bg-muted text-muted-foreground border-border"
                                )}>
                                  {opt}
                                </span>
                                <MathText text={q[`option${opt}` as keyof QuizDetailsQuestion] as string} />
                             </div>
                           ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
             </div>
          </CardContent>
          <CardFooter className="flex-col sm:flex-row gap-4 pt-4 border-t bg-muted/30">
            <Button className="w-full sm:w-auto gap-2" size="lg" onClick={() => router.push("/dashboard/all-quiz")}>
              <LayoutDashboard className="h-4 w-4" />
              Return to Quizzes
            </Button>
            <Button variant="outline" className="w-full sm:w-auto gap-2" size="lg" onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Quiz Taking View
  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8 min-h-[90vh]">
      {/* Header with Timer and Progress */}
      <div className="sticky top-0 z-50 pt-2 pb-4 bg-background/80 backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between gap-4">
           <div className="flex flex-col">
              <h1 className="text-2xl font-bold tracking-tight">{quiz.title}</h1>
              <p className="text-sm text-muted-foreground line-clamp-1">{quiz.description}</p>
           </div>
           <div className={cn(
             "flex items-center gap-3 px-6 py-3 rounded-2xl border-2 transition-all shadow-lg",
             timeLeft !== null && timeLeft < 60 ? "bg-red-500/10 border-red-500/50 text-red-600 animate-pulse" : "bg-primary/5 border-primary/20 text-primary"
           )}>
              <Clock className={cn("h-5 w-5", timeLeft !== null && timeLeft < 60 ? "animate-spin" : "")} />
              <span className="text-xl font-mono font-bold tracking-wider">
                {timeLeft !== null ? formatTime(timeLeft) : "--:--"}
              </span>
           </div>
        </div>
        
        <div className="space-y-2">
           <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <span>Progress</span>
              <span>{Math.round(progress)}% Complete</span>
           </div>
           <Progress value={progress} className="h-2 bg-muted transition-all duration-1000" />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         {/* Question List Sidebar (Desktop) */}
         <div className="hidden lg:block space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Questions</h3>
            <div className="grid grid-cols-4 gap-2">
               {questions.map((_, idx) => (
                 <button
                   key={idx}
                   onClick={() => setCurrentIdx(idx)}
                   className={cn(
                     "h-10 w-full flex items-center justify-center rounded-xl text-xs font-bold transition-all border",
                     currentIdx === idx ? "bg-primary text-primary-foreground border-primary shadow-md scale-105" : 
                     answers[questions[idx].id] ? "bg-green-500/10 text-green-600 border-green-500/20" : 
                     "bg-muted/50 text-muted-foreground border-transparent hover:border-gray-300"
                   )}
                 >
                   {idx + 1}
                 </button>
               ))}
            </div>
         </div>

         {/* Active Question Area */}
         <div className="lg:col-span-3 space-y-6">
            <Card className="border-none shadow-2xl bg-card/60 backdrop-blur-sm overflow-hidden">
               <div className="h-1.5 bg-linear-to-r from-primary/40 via-primary to-primary/40" />
               <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-primary/5 border-primary/20 text-primary">
                      Question {currentIdx + 1} of {questions.length}
                    </Badge>
                    {currentQuestion?.point && (
                      <Badge variant="secondary" className="px-3 py-1 rounded-full text-xs font-bold uppercase">
                        {currentQuestion.point} Point{currentQuestion.point > 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl leading-relaxed font-semibold transition-all duration-300">
                    <MathText text={currentQuestion?.questionText} />
                  </CardTitle>
               </CardHeader>
               
               <CardContent className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 gap-4">
                    {(['A', 'B', 'C', 'D'] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => selectAnswer(opt)}
                        className={cn(
                          "group relative flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200",
                          answers[currentQuestion?.id] === opt 
                            ? "bg-primary/5 border-primary shadow-inner scale-[0.99] ring-4 ring-primary/5" 
                            : "bg-background border-border/40 hover:border-primary/30 hover:bg-muted/30"
                        )}
                      >
                         <div className={cn(
                           "shrink-0 w-10 h-10 flex items-center justify-center rounded-xl text-lg font-bold border-2 transition-all group-hover:scale-110",
                           answers[currentQuestion?.id] === opt 
                             ? "bg-primary text-primary-foreground border-primary" 
                             : "bg-muted text-muted-foreground border-transparent"
                         )}>
                           {opt}
                         </div>
                         <MathText 
                           className={cn(
                             "text-lg font-medium transition-colors",
                             answers[currentQuestion?.id] === opt ? "text-primary" : "text-foreground/80 group-hover:text-foreground"
                           )}
                           text={currentQuestion[`option${opt}` as keyof QuizDetailsQuestion] as string} 
                          />
                         {answers[currentQuestion?.id] === opt && (
                           <CheckCircle2 className="ml-auto h-6 w-6 text-primary animate-in zoom-in" />
                         )}
                      </button>
                    ))}
                  </div>
               </CardContent>
               
               <CardFooter className="flex justify-between p-6 border-t bg-muted/20">
                  <Button 
                    variant="outline" 
                    size="lg"
                    disabled={currentIdx === 0}
                    onClick={() => setCurrentIdx(prev => prev - 1)}
                    className="gap-2 rounded-xl"
                  >
                    <ChevronLeft className="h-5 w-5" />
                    Previous
                  </Button>
                  
                  {currentIdx === questions.length - 1 ? (
                    <Button 
                      size="lg"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="gap-2 bg-primary hover:bg-primary/90 rounded-xl px-8 shadow-lg shadow-primary/20"
                    >
                      {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                      Finish Quiz
                    </Button>
                  ) : (
                    <Button 
                      size="lg"
                      onClick={() => setCurrentIdx(prev => prev + 1)}
                      className="gap-2 rounded-xl"
                    >
                      Next
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  )}
               </CardFooter>
            </Card>

            <div className="flex items-center gap-2 p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl text-blue-600 text-sm font-medium">
               <HelpCircle className="h-5 w-5 shrink-0" />
               <p>Your answers are being tracked locally. You can go back and forth between questions before final submission.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
