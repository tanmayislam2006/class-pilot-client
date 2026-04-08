"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, Clock, HelpCircle, FileText, BarChart2, Edit2, Trash2, X, Save, Plus } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TeacherQuizDetailsData, TeacherQuizQuestionItem, UpdateQuizPayload, UpdateQuizQuestionPayload, AddQuizQuestionPayload } from "@/types/teacher.types";
import { MathText } from "@/components/shared/MathText";

export default function QuizDetailsClient({ quiz, batchId, quizId }: { quiz: TeacherQuizDetailsData; batchId: string; quizId: string }) {
  const router = useRouter();

  // Form State: Quiz Info
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [formData, setFormData] = useState({
    title: quiz.title || "",
    duration: quiz.duration || "",
    dueDate: quiz.dueDate ? new Date(quiz.dueDate).toISOString().slice(0, 16) : "",
    description: quiz.description || ""
  });

  // Form State: Question
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [questionFormData, setQuestionFormData] = useState({
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "A",
    point: 1,
  });

  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [newQuestionFormData, setNewQuestionFormData] = useState({
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "A",
    point: 1,
  });

  // ========== MUTATIONS ==========
  const updateQuizMutation = useMutation({
    mutationFn: async (data: UpdateQuizPayload["quiz"]) => {
      const res = await fetch(`/api/teacher/batches/${batchId}/quizzes/${quizId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        // Adjust based on if backend requires title/duration/dueDate in data
        body: JSON.stringify({ quiz: data })
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update quiz info");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Quiz info updated successfully");
      setIsEditingInfo(false);
      router.refresh();
    },
    onError: (e: Error) => toast.error(e.message)
  });

  const updateQuestionMutation = useMutation({
    mutationFn: async ({ qId, data }: { qId: string, data: UpdateQuizQuestionPayload["question"] }) => {
      const res = await fetch(`/api/teacher/batches/${batchId}/quizzes/${quizId}/questions/${qId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: data })
      });
      if (!res.ok) {
         const errorData = await res.json().catch(() => ({}));
         throw new Error(errorData.message || "Failed to update question");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Question updated successfully");
      setEditingQuestionId(null);
      router.refresh();
    },
    onError: (e: Error) => toast.error(e.message)
  });

  const addQuestionMutation = useMutation({
    mutationFn: async (data: AddQuizQuestionPayload["question"]) => {
      const res = await fetch(`/api/teacher/batches/${batchId}/quizzes/${quizId}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: data })
      });
      if (!res.ok) {
         const errorData = await res.json().catch(() => ({}));
         throw new Error(errorData.message || "Failed to add question");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Question added successfully");
      setIsAddingQuestion(false);
      setNewQuestionFormData({
        questionText: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "A",
        point: 1,
      });
      router.refresh();
    },
    onError: (e: Error) => toast.error(e.message)
  });

  const deleteQuestionMutation = useMutation({
    mutationFn: async (qId: string) => {
      const res = await fetch(`/api/teacher/batches/${batchId}/quizzes/${quizId}/questions/${qId}`, {
        method: "DELETE"
      });
      if (!res.ok) {
         const errorData = await res.json().catch(() => ({}));
         throw new Error(errorData.message || "Failed to delete question");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Question deleted successfully");
      router.refresh();
    },
    onError: (e: Error) => toast.error(e.message)
  });

  // ========== HANDLERS ==========
  const handleSaveQuizInfo = () => {
    updateQuizMutation.mutate({
      title: formData.title,
      duration: Number(formData.duration),
      dueDate: new Date(formData.dueDate).toISOString(),
      description: formData.description
    });
  };

  const handleAddQuestion = () => {
    addQuestionMutation.mutate({
      ...newQuestionFormData,
      point: Number(newQuestionFormData.point)
    });
  };

  const handleStartEditQuestion = (question: TeacherQuizQuestionItem) => {
    setEditingQuestionId(question.id);
    setQuestionFormData({
      questionText: question.questionText || "",
      optionA: question.optionA || "",
      optionB: question.optionB || "",
      optionC: question.optionC || "",
      optionD: question.optionD || "",
      correctAnswer: question.correctAnswer || "A",
      point: question.point || 1,
    });
  };

  const handleSaveQuestion = (qId: string) => {
    updateQuestionMutation.mutate({
      qId,
      data: {
        ...questionFormData,
        point: Number(questionFormData.point)
      }
    });
  };

  const handleDeleteQuestion = (qId: string) => {
    toast("Delete Question", {
      description: "Are you sure you want to permanently delete this question? This action cannot be undone.",
      icon: <Trash2 className="w-4 h-4 text-destructive" />,
      action: {
        label: "Delete",
        onClick: () => deleteQuestionMutation.mutate(qId)
      },
      cancel: {
        label: "Cancel",
        onClick: () => {}
      },
      duration: 5000,
      className: "border-destructive/20"
    });
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-5xl mx-auto">
      <Link href="/teacher/dashboard/all-quiz" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Quiz Bank
      </Link>

      {/* QUIZ INFO SECTION */}
      {isEditingInfo ? (
        <Card className="border-primary/20 shadow-sm mb-6">
          <CardHeader>
            <CardTitle>Edit Quiz Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Title</label>
              <Input 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Duration (minutes)</label>
                <Input 
                  type="number"
                  value={formData.duration} 
                  onChange={e => setFormData({...formData, duration: e.target.value})} 
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Due Date</label>
                <Input 
                  type="datetime-local" 
                  value={formData.dueDate} 
                  onChange={e => setFormData({...formData, dueDate: e.target.value})} 
                />
              </div>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setIsEditingInfo(false)} disabled={updateQuizMutation.isPending}>
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
              <Button onClick={handleSaveQuizInfo} disabled={updateQuizMutation.isPending}>
                <Save className="w-4 h-4 mr-2" /> {updateQuizMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 relative group">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2 pr-12">{quiz.title}</h2>
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
            <div className="flex flex-col items-end gap-2">
              {quiz.isPublished ? (
                <Badge variant="default" className="bg-green-600/10 text-green-700 hover:bg-green-600/20 border-green-600/20 px-3 py-1 text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" /> Published
                </Badge>
              ) : (
                <Badge variant="secondary" className="px-3 py-1 text-sm">Draft</Badge>
              )}
            </div>

            <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-0 right-0 md:right-[unset] md:left-full md:ml-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                onClick={() => setIsEditingInfo(true)}
              >
                <Edit2 className="w-4 h-4 text-muted-foreground hover:text-primary" />
            </Button>
          </div>
           <MathText 
             className="text-muted-foreground bg-muted/30 p-4 rounded-lg border leading-relaxed block"
             text={quiz.description || "No description provided."}
           />
        </>
      )}

      {/* STATS SECTION */}
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

      {/* QUESTIONS SECTION */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold tracking-tight flex items-center">
            <HelpCircle className="w-5 h-5 mr-2 text-primary" /> Questions Blueprint
          </h3>
          <Button onClick={() => setIsAddingQuestion(true)} disabled={isAddingQuestion}>
            <Plus className="w-4 h-4 mr-2" /> Add Question
          </Button>
        </div>

        <div className="space-y-6">
          {isAddingQuestion && (
             <Card className="overflow-hidden shadow-md border-primary/40 ring-1 ring-primary/20">
                 <div className="bg-primary/5 px-5 py-3 border-b flex items-center justify-between">
                   <span className="font-semibold text-sm text-primary">Adding New Question</span>
                 </div>
                 <CardContent className="p-5 space-y-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Question Text</label>
                      <Textarea 
                        value={newQuestionFormData.questionText} 
                        onChange={e => setNewQuestionFormData({...newQuestionFormData, questionText: e.target.value})} 
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {["A", "B", "C", "D"].map((opt) => (
                         <div className="grid gap-2" key={opt}>
                           <label className="text-sm font-medium">Option {opt}</label>
                           <Input 
                             value={newQuestionFormData[`option${opt}` as keyof typeof newQuestionFormData]} 
                             onChange={e => setNewQuestionFormData({...newQuestionFormData, [`option${opt}`]: e.target.value})} 
                           />
                         </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                       <div className="grid gap-2">
                         <label className="text-sm font-medium">Correct Answer</label>
                         <select 
                           className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                           value={newQuestionFormData.correctAnswer}
                           onChange={(e) => setNewQuestionFormData({...newQuestionFormData, correctAnswer: e.target.value})}
                         >
                            <option value="A">Option A</option>
                            <option value="B">Option B</option>
                            <option value="C">Option C</option>
                            <option value="D">Option D</option>
                         </select>
                       </div>
                       <div className="grid gap-2">
                         <label className="text-sm font-medium">Points</label>
                         <Input 
                           type="number"
                           value={newQuestionFormData.point} 
                           onChange={e => setNewQuestionFormData({...newQuestionFormData, point: Number(e.target.value)})} 
                         />
                       </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                      <Button variant="outline" onClick={() => setIsAddingQuestion(false)} disabled={addQuestionMutation.isPending}>
                        <X className="w-4 h-4 mr-2" /> Cancel
                      </Button>
                      <Button onClick={handleAddQuestion} disabled={addQuestionMutation.isPending}>
                        <Save className="w-4 h-4 mr-2" /> {addQuestionMutation.isPending ? "Adding..." : "Add Question"}
                      </Button>
                    </div>
                 </CardContent>
              </Card>
          )}

          {(!quiz.questions || quiz.questions.length === 0) ? (
            !isAddingQuestion && (
              <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground">
                No questions found for this quiz.
              </div>
            )
          ) : (
            quiz.questions.map((question: TeacherQuizQuestionItem, index: number) => {
              const isEditing = editingQuestionId === question.id;

              if (isEditing) {
                 return (
                  <Card key={`edit-${question.id}`} className="overflow-hidden shadow-md border-primary/40 ring-1 ring-primary/20">
                     <div className="bg-primary/5 px-5 py-3 border-b flex items-center justify-between">
                       <span className="font-semibold text-sm text-primary">Editing Question {index + 1}</span>
                     </div>
                     <CardContent className="p-5 space-y-4">
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Question Text</label>
                          <Textarea 
                            value={questionFormData.questionText} 
                            onChange={e => setQuestionFormData({...questionFormData, questionText: e.target.value})} 
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {["A", "B", "C", "D"].map((opt) => (
                             <div className="grid gap-2" key={opt}>
                               <label className="text-sm font-medium">Option {opt}</label>
                               <Input 
                                 value={questionFormData[`option${opt}` as keyof typeof questionFormData]} 
                                 onChange={e => setQuestionFormData({...questionFormData, [`option${opt}`]: e.target.value})} 
                               />
                             </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                           <div className="grid gap-2">
                             <label className="text-sm font-medium">Correct Answer</label>
                             <select 
                               className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                               value={questionFormData.correctAnswer}
                               onChange={(e) => setQuestionFormData({...questionFormData, correctAnswer: e.target.value})}
                             >
                                <option value="A">Option A</option>
                                <option value="B">Option B</option>
                                <option value="C">Option C</option>
                                <option value="D">Option D</option>
                             </select>
                           </div>
                           <div className="grid gap-2">
                             <label className="text-sm font-medium">Points</label>
                             <Input 
                               type="number"
                               value={questionFormData.point} 
                               onChange={e => setQuestionFormData({...questionFormData, point: Number(e.target.value)})} 
                             />
                           </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                          <Button variant="outline" onClick={() => setEditingQuestionId(null)} disabled={updateQuestionMutation.isPending}>
                            <X className="w-4 h-4 mr-2" /> Cancel
                          </Button>
                          <Button onClick={() => handleSaveQuestion(question.id)} disabled={updateQuestionMutation.isPending}>
                            <Save className="w-4 h-4 mr-2" /> {updateQuestionMutation.isPending ? "Saving..." : "Save Question"}
                          </Button>
                        </div>
                     </CardContent>
                  </Card>
                 )
              }

              return (
                <Card key={question.id} className="overflow-hidden shadow-sm relative group transition-all hover:shadow-md">
                  <div className="bg-muted/30 px-5 py-3 border-b flex items-center justify-between">
                    <span className="font-semibold text-sm text-muted-foreground">Question {index + 1}</span>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-medium bg-background">
                        {question.point} {question.point === 1 ? 'Point' : 'Points'}
                      </Badge>
                      
                      <div className="hidden group-hover:flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary" onClick={() => handleStartEditQuestion(question)}>
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-red-500" onClick={() => handleDeleteQuestion(question.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <MathText className="font-medium text-lg leading-snug mb-6 block" text={question.questionText} />
                    
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
                            <MathText className={`${isCorrect ? "text-green-800 dark:text-green-400 font-medium" : "text-foreground"}`} text={String(optionText || "")} />
                            
                            {isCorrect && (
                              <CheckCircle2 className="w-4 h-4 ml-auto text-green-600" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
