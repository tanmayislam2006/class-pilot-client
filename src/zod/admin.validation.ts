import z from "zod";

export const createTeacherSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(11, "Phone number must be at least 11 characters"),
  subject: z.string().min(2, "Subject is required"),
  bio: z.string().min(5, "Bio must be at least 5 characters"),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
});

export type CreateTeacherFormData = z.infer<typeof createTeacherSchema>;

export const createStudentSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  enrollmentDate: z.date({ 
    message: "Enrollment date is required",
  }),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
});

export type CreateStudentFormData = z.infer<typeof createStudentSchema>;
