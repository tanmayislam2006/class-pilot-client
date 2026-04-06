import Link from "next/link";
import { BookOpen } from "lucide-react";

import { quizService } from "@/service/quiz.service";
import AllQuizzesTableClient from "./_components/AllQuizzesTableClient";

import { Button } from "@/components/ui/button";

export const metadata = {
  title: "All Quizzes | Class Pilot",
  description: "View all your created quizzes across all batches",
};

export default async function AllQuizzesPage() {
  const { data: quizzes } = await quizService.getMyAllQuizzes();

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">All Quizzes</h2>
          <p className="text-muted-foreground">
            Monitor and access every quiz you have created across all your batches.
          </p>
        </div>
        <Link href="/teacher/dashboard/create-quiz">
          <Button>Create New Quiz</Button>
        </Link>
      </div>

      {!quizzes || quizzes.length === 0 ? (
        <div className="text-center p-12 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/20">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
          <p className="text-lg font-medium">No quizzes found.</p>
          <p>You haven&apos;t created any quizzes yet.</p>
        </div>
      ) : (
        <AllQuizzesTableClient initialData={quizzes} />
      )}
    </div>
  );
}
