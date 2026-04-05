import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, HelpCircle, FileText, BarChart2 } from "lucide-react";

import { quizService } from "@/service/quiz.service";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Quiz Details | Class Pilot",
  description: "View specific quiz details and questions.",
};

export default async function QuizDetailsPage({
  params,
}: {
  params: Promise<{ batchId: string; quizId: string }>;
}) {
  const { batchId, quizId } = await params;
  const { data: quiz } = await quizService.getQuizDetails(batchId, quizId);

  if (!quiz) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
        <HelpCircle className="w-16 h-16 mb-4 opacity-50" />
        <h2 className="text-2xl font-semibold mb-2">Quiz not found</h2>
        <p>The quiz you are looking for does not exist or has been removed.</p>
        <Link href="/teacher/dashboard/all-quiz" className="mt-6">
          <Button variant="outline"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Quizzes</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-5xl mx-auto">
      <Link href="/teacher/dashboard/all-quiz" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Quiz Bank
      </Link>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">{quiz.title}</h2>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Badge variant="outline" className="bg-primary/5 text-primary">
              {quiz.batch.name}
            </Badge>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1.5" />
              {quiz.duration} Minutes
            </span>
            <span className="flex items-center">
              Due: {new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", year: "numeric", hour: "numeric", minute: "numeric" }).format(new Date(quiz.dueDate))}
            </span>
          </div>
        </div>
        <div>
          {quiz.isPublished ? (
            <Badge variant="default" className="bg-green-600/10 text-green-700 hover:bg-green-600/20 border-green-600/20 px-3 py-1 text-sm">
              <CheckCircle2 className="w-4 h-4 mr-1.5" /> Published
            </Badge>
          ) : (
            <Badge variant="secondary" className="px-3 py-1 text-sm">Draft</Badge>
          )}
        </div>
      </div>

      <p className="text-muted-foreground bg-muted/30 p-4 rounded-lg border leading-relaxed">
        {quiz.description || "No description provided."}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="bg-primary/5 border-primary/10 shadow-none">
          <CardHeader className="py-4">
            <CardTitle className="text-lg flex items-center text-primary">
              <FileText className="w-5 h-5 mr-2" /> Total Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{quiz._count?.questions || 0}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-500/5 border-amber-500/10 shadow-none">
          <CardHeader className="py-4">
            <CardTitle className="text-lg flex items-center text-amber-700 dark:text-amber-500">
              <BarChart2 className="w-5 h-5 mr-2" /> Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{quiz._count?.submissions || 0}</p>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      <div>
        <h3 className="text-xl font-bold tracking-tight mb-6 flex items-center">
          <HelpCircle className="w-5 h-5 mr-2 text-primary" /> Questions Blueprint
        </h3>

        <div className="space-y-6">
          {(!quiz.questions || quiz.questions.length === 0) ? (
            <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground">
              No questions found for this quiz.
            </div>
          ) : (
            quiz.questions.map((question, index) => (
              <Card key={question.id} className="overflow-hidden shadow-sm">
                <div className="bg-muted/30 px-5 py-3 border-b flex items-center justify-between">
                  <span className="font-semibold text-sm text-muted-foreground">Question {index + 1}</span>
                  <Badge variant="outline" className="font-medium bg-background">
                    {question.point} {question.point === 1 ? 'Point' : 'Points'}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <p className="font-medium text-lg leading-snug mb-6">
                    {question.questionText}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['A', 'B', 'C', 'D'].map((letter) => {
                      const isCorrect = question.correctAnswer === letter;
                      const optionText = question[`option${letter}` as keyof typeof question];
                      
                      return (
                        <div 
                          key={letter}
                          className={`
                            flex items-center p-3 rounded-md border 
                            ${isCorrect 
                              ? "bg-green-600/10 border-green-600/30 ring-1 ring-green-600/20" 
                              : "bg-background border-input"
                            }
                          `}
                        >
                          <span className={`
                            flex items-center justify-center w-6 h-6 rounded mr-3 text-xs font-bold
                            ${isCorrect ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}
                          `}>
                            {letter}
                          </span>
                          <span className={`${isCorrect ? "text-green-800 dark:text-green-400 font-medium" : "text-foreground"}`}>
                            {String(optionText || "")}
                          </span>
                          
                          {isCorrect && (
                            <CheckCircle2 className="w-4 h-4 ml-auto text-green-600" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
