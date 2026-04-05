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
