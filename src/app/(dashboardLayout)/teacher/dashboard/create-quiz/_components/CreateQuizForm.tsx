"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, ChevronRight } from "lucide-react";

import { CreateQuizFormData, createQuizSchema } from "@/zod/teacher.validation";
import { TeacherAssignedBatch } from "@/types/teacher.types";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError, FieldDescription } from "@/components/ui/field";

export default function CreateQuizForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch batches for the dropdown
  const { data: batchesData } = useQuery({
    queryKey: ["teacher", "my-batches"],
    queryFn: async () => {
      const res = await fetch("/api/teacher/my-batches");
      if (!res.ok) throw new Error("Failed to load batches");
      return res.json();
    },
  });
  const batches = (batchesData?.data as TeacherAssignedBatch[]) || [];

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateQuizFormData>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: 30,
      dueDate: undefined,
      batchId: "",
      questions: [
        {
          questionText: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctAnswer: "A",
          point: 1,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const mutation = useMutation({
    mutationFn: async (variables: { batchId: string; payload: CreateQuizFormData }) => {
      const reqPayload = {
        quiz: {
          title: variables.payload.title,
          description: variables.payload.description,
          duration: variables.payload.duration,
          dueDate: new Date(variables.payload.dueDate).toISOString(), 
          questions: variables.payload.questions,
        },
      };

      const res = await fetch(`/api/teacher/batches/${variables.batchId}/quizzes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqPayload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to create quiz");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("Quiz created successfully!");
      reset();
      setIsSubmitting(false);
    },
    onError: (error: Error) => {
      toast.error(error?.message || "Failed to create quiz.");
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: CreateQuizFormData) => {
    setIsSubmitting(true);
    mutation.mutate({ batchId: data.batchId, payload: data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-5xl mx-auto pb-24">
      {/* Configuration Card */}
      <Card className="border shadow-sm">
        <CardHeader className="bg-muted/30 border-b">
          <CardTitle className="text-xl">Quiz Configuration</CardTitle>
          <CardDescription>
            Set up the core details, dates, and assign this quiz to a batch.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field className="md:col-span-2">
              <FieldLabel>Batch Assignment</FieldLabel>
              <select
                {...register("batchId")}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              >
                <option value="">Select a batch...</option>
                {batches.map((batch) => (
                  <option key={batch.id} value={batch.id}>
                    {batch.name} - {batch.schedule}
                  </option>
                ))}
              </select>
              {errors.batchId && <FieldError>{errors.batchId.message}</FieldError>}
            </Field>

            <Field className="md:col-span-2">
              <FieldLabel>Quiz Title</FieldLabel>
              <Input placeholder="e.g. Midterm Evaluation: React Patterns" {...register("title")} />
              {errors.title && <FieldError>{errors.title.message}</FieldError>}
            </Field>

            <Field className="md:col-span-2">
              <FieldLabel>Description</FieldLabel>
              <Textarea 
                placeholder="Briefly describe what this quiz entails..." 
                className="min-h-[100px]" 
                {...register("description")} 
              />
              {errors.description && <FieldError>{errors.description.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel>Duration (Minutes)</FieldLabel>
              <Input type="number" {...register("duration", { valueAsNumber: true })} />
              {errors.duration && <FieldError>{errors.duration.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel>Due Date</FieldLabel>
              {/* Native datetime-local input integrates easily with hook-form processing, 
                  but we registered it as z.date(). We will cast valueAsDate through register. */}
              <Input type="datetime-local" {...register("dueDate", { valueAsDate: true })} />
              {errors.dueDate && <FieldError>{errors.dueDate.message}</FieldError>}
            </Field>
          </div>
        </CardContent>
      </Card>

      {/* Questions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Questions List</h2>
            <p className="text-sm text-muted-foreground">Add and organize questions for your quiz.</p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2"
            onClick={() =>
              append({
                questionText: "",
                optionA: "",
                optionB: "",
                optionC: "",
                optionD: "",
                correctAnswer: "A",
                point: 1,
              })
            }
          >
            <Plus className="h-4 w-4" /> Add Question
          </Button>
        </div>

        {fields.length === 0 && (
          <div className="py-12 border-2 border-dashed rounded-lg text-center bg-muted/10">
            <p className="text-muted-foreground font-medium mb-3">No questions added yet.</p>
            <Button
              type="button"
              onClick={() => append({ questionText: "", optionA: "", optionB: "", optionC: "", optionD: "", correctAnswer: "A", point: 1 })}
            >
              Add First Question
            </Button>
          </div>
        )}

        {fields.map((item, index) => (
          <Card key={item.id} className="border shadow-sm overflow-hidden group">
            <div className="bg-primary/5 px-4 py-2 border-b flex items-center justify-between">
              <span className="font-semibold text-sm text-primary">Question {index + 1}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <CardContent className="pt-6 space-y-6">
              <Field>
                <FieldLabel>Question Text</FieldLabel>
                 <Textarea
                  {...register(`questions.${index}.questionText` as const)}
                  placeholder="Enter the question here..."
                  className="resize-none"
                />
                {errors.questions?.[index]?.questionText && (
                  <FieldError>{errors.questions[index]?.questionText?.message}</FieldError>
                )}
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Field>
                    <FieldLabel className="flex items-center gap-2">
                      <span className="bg-muted px-2 rounded-md font-mono text-xs">A</span> Option A
                    </FieldLabel>
                    <Input {...register(`questions.${index}.optionA` as const)} placeholder="First option" />
                    {errors.questions?.[index]?.optionA && (
                      <FieldError>{errors.questions[index]?.optionA?.message}</FieldError>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel className="flex items-center gap-2">
                       <span className="bg-muted px-2 rounded-md font-mono text-xs">B</span> Option B
                    </FieldLabel>
                    <Input {...register(`questions.${index}.optionB` as const)} placeholder="Second option" />
                    {errors.questions?.[index]?.optionB && (
                      <FieldError>{errors.questions[index]?.optionB?.message}</FieldError>
                    )}
                  </Field>
                </div>

                <div className="space-y-4">
                  <Field>
                    <FieldLabel className="flex items-center gap-2">
                      <span className="bg-muted px-2 rounded-md font-mono text-xs">C</span> Option C
                    </FieldLabel>
                    <Input {...register(`questions.${index}.optionC` as const)} placeholder="Third option" />
                    {errors.questions?.[index]?.optionC && (
                      <FieldError>{errors.questions[index]?.optionC?.message}</FieldError>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel className="flex items-center gap-2">
                       <span className="bg-muted px-2 rounded-md font-mono text-xs">D</span> Option D
                    </FieldLabel>
                    <Input {...register(`questions.${index}.optionD` as const)} placeholder="Fourth option" />
                    {errors.questions?.[index]?.optionD && (
                      <FieldError>{errors.questions[index]?.optionD?.message}</FieldError>
                    )}
                  </Field>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-dashed">
                <Field className="max-w-[200px]">
                  <FieldLabel>Correct Answer</FieldLabel>
                  <select
                    {...register(`questions.${index}.correctAnswer` as const)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                  </select>
                </Field>

                {/* Point Field - Readonly/Hidden by default but accessible to register in the payload */}
                {/* Even though it's hidden, we show it neatly if the user wants to adjust it, or just leave it */}
                <Field className="max-w-[150px]">
                  <FieldLabel>Points</FieldLabel>
                  <Input 
                    type="number" 
                    {...register(`questions.${index}.point` as const, { valueAsNumber: true })} 
                  />
                  <FieldDescription>Defaults to 1.</FieldDescription>
                </Field>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t p-4 flex justify-between items-center sm:pl-72 z-50">
        <div className="text-sm font-medium text-muted-foreground hidden sm:block">
          Total Questions: {fields.length}
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={() => reset()} 
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            Reset Form
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting || fields.length === 0}
            className="w-full sm:w-auto px-8"
          >
            {isSubmitting ? "Publishing..." : "Publish Quiz"}
            {!isSubmitting && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
      {typeof errors.questions?.root?.message === "string" && (
          <p className="text-destructive font-medium">{errors.questions.root.message}</p>
      )}
    </form>
  );
}
