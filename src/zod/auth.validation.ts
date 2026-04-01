import z from "zod";

export const loginZodSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string("Password is required"),
});


//  using the zod schema make the login type
export type ILoginPayload = z.infer<typeof loginZodSchema>;