"use client";

import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { 
  UserPlus, 
  Mail, 
  Phone, 
  Calendar, 
  Image as ImageIcon, 
  LockKeyhole, 
  Eye, 
  EyeOff, 
  ChevronRight,
  GraduationCap
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { createStudentAction } from "@/service/user.service";
import { createStudentSchema, CreateStudentFormData } from "@/zod/admin.validation";

export default function CreateStudentForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreateStudentFormData) => createStudentAction(data),
  });

  const form = useForm({
    defaultValues: {
      password: "",
      name: "",
      email: "",
      phone: "",
      enrollmentDate: new Date() as Date,
      image: "",
    } as CreateStudentFormData,
    validators: {
      onChange: createStudentSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        // Ensure enrollmentDate is a proper Date if it came as a string
        const payload = {
            ...value,
            enrollmentDate: new Date(value.enrollmentDate)
        };
        
        const result = await mutateAsync(payload as CreateStudentFormData);

        if (result.success) {
          toast.success("Student Enrolled!", {
            description: `Account for ${value.name} created successfully.`,
          });
          form.reset();
        } else {
          toast.error("Registration failed", {
            description: result.message || "Failed to create student account.",
          });
        }
      } catch {
        toast.error("Error", {
          description: "An unexpected error occurred during enrollment.",
        });
      }
    },
  });

  return (
    <Card className="overflow-hidden border border-border/40 bg-card/95 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] backdrop-blur-xl rounded-[32px]">
      <CardHeader className="border-b border-border/40 bg-muted/5 p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
            <GraduationCap className="size-7" />
          </div>
          <div>
            <CardTitle className="text-3xl font-black tracking-tight text-foreground">Enroll New Student</CardTitle>
            <CardDescription className="text-base font-medium text-muted-foreground">
              Register a new student into the learning platform.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-8"
        >
          <div className="grid gap-8 md:grid-cols-2">
            {/* Name */}
            <form.Field name="name">
              {(field) => (
                <AppField
                  field={field}
                  label="Full Name"
                  placeholder="e.g. Alice Johnson"
                  prepend={<UserPlus className="size-4 text-muted-foreground" />}
                />
              )}
            </form.Field>

            {/* Email */}
            <form.Field name="email">
              {(field) => (
                <AppField
                  field={field}
                  type="email"
                  label="Email Address"
                  placeholder="alice@example.com"
                  prepend={<Mail className="size-4 text-muted-foreground" />}
                />
              )}
            </form.Field>

            {/* Phone */}
            <form.Field name="phone">
              {(field) => (
                <AppField
                  field={field}
                  label="Phone Number"
                  placeholder="017XXXXXXXX"
                  prepend={<Phone className="size-4 text-muted-foreground" />}
                />
              )}
            </form.Field>

            {/* Enrollment Date */}
            <form.Field name="enrollmentDate">
              {(field) => (
                <div className="space-y-1.5">
                    <label className="text-sm font-medium">Enrollment Date</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3 pointer-events-none">
                            <Calendar className="size-4 text-muted-foreground" />
                        </div>
                        <input
                            type="date"
                            className="flex h-10 w-full rounded-md border border-input bg-background pl-10 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={field.state.value instanceof Date ? field.state.value.toISOString().split('T')[0] : field.state.value}
                            onChange={(e) => field.handleChange(new Date(e.target.value))}
                        />
                    </div>
                    {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                        <p className="text-sm text-destructive">{String(field.state.meta.errors[0])}</p>
                    )}
                </div>
              )}
            </form.Field>

            {/* Image URL */}
            <form.Field name="image">
              {(field) => (
                <AppField
                  field={field}
                  label="Profile Image URL"
                  placeholder="https://example.com/photo.jpg"
                  prepend={<ImageIcon className="size-4 text-muted-foreground" />}
                />
              )}
            </form.Field>

            {/* Password */}
            <form.Field name="password">
              {(field) => (
                <AppField
                  field={field}
                  type={showPassword ? "text" : "password"}
                  label="Access Password"
                  placeholder="Set a secure password"
                  prepend={<LockKeyhole className="size-4 text-muted-foreground" />}
                  append={
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-xl hover:bg-primary/10 transition-all"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </Button>
                  }
                />
              )}
            </form.Field>
          </div>

          <div className="flex items-center justify-end pt-6 border-t border-border/40">
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                   isPending={isSubmitting || isPending}
                   disabled={!canSubmit}
                   pendingLabel="Enrolling..."
                   className="h-14 px-12 rounded-2xl bg-primary font-bold text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Enroll Student Account <ChevronRight className="ml-2 size-5" />
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
