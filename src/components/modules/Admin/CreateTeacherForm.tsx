"use client";

import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { 
  UserPlus, 
  Mail, 
  Phone, 
  BookOpen, 
  ImageIcon, 
  LockKeyhole, 
  Eye, 
  EyeOff, 
  ChevronRight,
  ShieldCheck
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
import AppTextArea from "@/components/shared/form/AppTextArea";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { createTeacherAction } from "@/service/user.service";
import { createTeacherSchema, CreateTeacherFormData } from "@/zod/admin.validation";

export default function CreateTeacherForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreateTeacherFormData) => createTeacherAction(data),
  });

  const form = useForm({
    defaultValues: {
      password: "",
      name: "",
      email: "",
      phone: "",
      subject: "",
      bio: "",
      image: "",
    } as CreateTeacherFormData,
    validators: {
      onChange: createTeacherSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const result = await mutateAsync(value);

        if (result.success) {
          toast.success("Pilot registered!", {
            description: `Teacher account for ${value.name} created successfully.`,
          });
          form.reset();
        } else {
          toast.error("Registration failed", {
            description: result.message || "Failed to create teacher account.",
          });
        }
      } catch {
        toast.error("Error", {
          description: "An unexpected flight error occurred.",
        });
      }
    },
  });

  return (
    <Card className="overflow-hidden border border-border/40 bg-card/95 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] backdrop-blur-xl rounded-[32px]">
      <CardHeader className="border-b border-border/40 bg-muted/5 p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
            <UserPlus className="size-7" />
          </div>
          <div>
            <CardTitle className="text-3xl font-black tracking-tight text-foreground">Register New Teacher</CardTitle>
            <CardDescription className="text-base font-medium text-muted-foreground">
              Add a new instructor to the Class Pilot fleet.
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
                  placeholder="e.g. John Smith"
                  prepend={<ShieldCheck className="size-4 text-muted-foreground" />}
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
                  placeholder="john@example.com"
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

            {/* Subject */}
            <form.Field name="subject">
              {(field) => (
                <AppField
                  field={field}
                  label="Specialized Subject"
                  placeholder="e.g. Mathematics"
                  prepend={<BookOpen className="size-4 text-muted-foreground" />}
                />
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

            {/* Bio */}
            <div className="md:col-span-2">
              <form.Field name="bio">
                {(field) => (
                  <AppTextArea
                    field={field}
                    label="Instructor Biography"
                    placeholder="Tell us about the teacher's experience..."
                    rows={4}
                  />
                )}
              </form.Field>
            </div>
          </div>

          <div className="flex items-center justify-end pt-6 border-t border-border/40">
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                   isPending={isSubmitting || isPending}
                   disabled={!canSubmit}
                   pendingLabel="Registering..."
                   className="h-14 px-12 rounded-2xl bg-primary font-bold text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Create Teacher Account <ChevronRight className="ml-2 size-5" />
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
