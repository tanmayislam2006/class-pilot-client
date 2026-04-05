import CreateQuizForm from "./_components/CreateQuizForm";

export const metadata = {
  title: "Create Quiz | Class Pilot",
  description: "Create a new quiz for your batches",
};

export default function CreateQuizPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Create Quiz</h2>
          <p className="text-muted-foreground">
            Author a new quiz, add questions, and assign it to an active batch.
          </p>
        </div>
      </div>
      
      <CreateQuizForm />
    </div>
  );
}

