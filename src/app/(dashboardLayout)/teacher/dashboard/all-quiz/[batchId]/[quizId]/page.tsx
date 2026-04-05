import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";

import { quizService } from "@/service/quiz.service";
import { Button } from "@/components/ui/button";
import QuizDetailsClient from "./_components/QuizDetailsClient";

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

  return <QuizDetailsClient quiz={quiz} batchId={batchId} quizId={quizId} />;
}
