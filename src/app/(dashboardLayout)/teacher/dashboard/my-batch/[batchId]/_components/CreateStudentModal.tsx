"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UserPlus, Mail, Phone, Lock, Calendar, Image as ImageIcon, Loader2 } from "lucide-react";

import AppDialog from "@/components/shared/AppDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createStudentSchema, CreateStudentFormData } from "@/zod/teacher.validation";
import { teacherQueryKeys, createStudentMutation } from "@/queries/teacher";
import { cn } from "@/lib/utils";

interface CreateStudentModalProps {
  batchId: string;
  batchName: string;
}

export default function CreateStudentModal({ batchId, batchName }: CreateStudentModalProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateStudentFormData>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      enrollmentDate: new Date(new Date().setHours(0, 0, 0, 0)),
      image: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreateStudentFormData) =>
      createStudentMutation({
        password: data.password,
        student: {
          name: data.name,
          email: data.email,
          batchId: batchId,
          phone: data.phone,
          enrollmentDate: data.enrollmentDate.toISOString(),
          ...(data.image ? { image: data.image } : {}),
        },
      }),
    onSuccess: () => {
      toast.success("Student enrolled successfully!");
      queryClient.invalidateQueries({ queryKey: teacherQueryKeys.batchStudents(batchId) });
      setOpen(false);
      reset();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to enroll student");
    },
  });

  const onSubmit = async (data: CreateStudentFormData) => {
    await mutateAsync(data);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      reset();
    }
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={handleOpenChange}
      title="Enroll New Student"
      description={`Add a new student to "${batchName}". They will be able to log in using their email and the password you provide.`}
      trigger={
        <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all active:scale-95">
          <UserPlus className="h-4 w-4" />
          Add Student
        </Button>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
            <div className="relative">
              <UserPlus className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="John Doe"
                className={cn("pl-10", errors.name && "border-destructive focus-visible:ring-destructive")}
                {...register("name")}
              />
            </div>
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className={cn("pl-10", errors.email && "border-destructive focus-visible:ring-destructive")}
                {...register("email")}
              />
            </div>
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">Login Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className={cn("pl-10", errors.password && "border-destructive focus-visible:ring-destructive")}
                {...register("password")}
              />
            </div>
            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">Phone Number (11 digits)</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                placeholder="01712345678"
                className={cn("pl-10", errors.phone && "border-destructive focus-visible:ring-destructive")}
                {...register("phone")}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  e.target.value = val;
                }}
              />
            </div>
            {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
          </div>

          {/* Enrollment Date */}
          <div className="space-y-2">
            <Label htmlFor="enrollmentDate" className="text-sm font-medium">Enrollment Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="enrollmentDate"
                type="date"
                className={cn("pl-10", errors.enrollmentDate && "border-destructive focus-visible:ring-destructive")}
                {...register("enrollmentDate", { valueAsDate: true })}
              />
            </div>
            {errors.enrollmentDate && <p className="text-xs text-destructive">{errors.enrollmentDate.message}</p>}
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image" className="text-sm font-medium">Profile Image URL (Optional)</Label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="image"
                placeholder="https://example.com/photo.jpg"
                className={cn("pl-10", errors.image && "border-destructive focus-visible:ring-destructive")}
                {...register("image")}
              />
            </div>
            {errors.image && <p className="text-xs text-destructive">{errors.image.message}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => handleOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="min-w-[120px]"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enrolling...
              </>
            ) : (
              "Enroll Student"
            )}
          </Button>
        </div>
      </form>
    </AppDialog>
  );
}
