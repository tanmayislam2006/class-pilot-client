import z from "zod";

// ===== CREATE BATCH =====
export const createBatchSchema = z.object({
  name: z.string().min(2, "Batch name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  monthlyFee: z.number({ error: "Monthly fee is required" }).min(1, "Fee must be at least 1"),
  schedule: z.string().min(3, "Schedule is required (e.g. Sun-Tue-Thu 10:00 AM)"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

export type CreateBatchPayload = z.infer<typeof createBatchSchema>;

// ===== GENERATE FEES =====
export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

export const generateFeeSchema = z.object({
  month: z.enum(MONTHS, { error: "Please select a month" }),
  year: z
    .number({ error: "Year is required" })
    .min(2020, "Year must be 2020 or later")
    .max(2100, "Year is too far in the future"),
});

export type GenerateFeePayload = z.infer<typeof generateFeeSchema>;

// ===== CREATE QUIZ =====
export const createQuizQuestionSchema = z.object({
  questionText: z.string().min(1, "Question text is required"),
  optionA: z.string().min(1, "Option A is required"),
  optionB: z.string().min(1, "Option B is required"),
  optionC: z.string().min(1, "Option C is required"),
  optionD: z.string().min(1, "Option D is required"),
  correctAnswer: z.enum(["A", "B", "C", "D"], { message: "Must be A, B, C, or D" }),
  point: z.number().min(1, "Point must be at least 1"),
});

export const createQuizSchema = z.object({
  batchId: z.string().min(1, "Please select a batch"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  duration: z.number({ 
    message: "Duration is required"
  }).min(1, "Duration (minutes) must be at least 1"),
  dueDate: z.date({ 
    message: "Due date is required"
  }),
  questions: z.array(createQuizQuestionSchema).min(1, "At least one question is required"),
});

export type CreateQuizFormData = z.infer<typeof createQuizSchema>;
