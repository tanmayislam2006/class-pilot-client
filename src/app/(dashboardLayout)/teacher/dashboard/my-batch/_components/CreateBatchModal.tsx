"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  BookOpen,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Plus,
} from "lucide-react";

import AppDialog from "@/components/shared/AppDialog";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import { teacherQueryKeys } from "@/queries/teacher";
import { createBatchSchema, type CreateBatchPayload } from "@/zod/teacher.validation";

interface CreateBatchModalProps {
  teacherId: string;
}

async function postCreateBatch(body: { batch: CreateBatchPayload & { teacherId: string } }) {
  const res = await fetch("/api/teacher/create-batch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to create batch");
  return data;
}

export default function CreateBatchModal({ teacherId }: CreateBatchModalProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: postCreateBatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teacherQueryKeys.myBatches });
      toast.success("Batch created successfully!");
      setOpen(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create batch");
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      monthlyFee: "" as unknown as number,
      schedule: "",
      startDate: "",
      endDate: "",
    },
    onSubmit: async ({ value }) => {
      // Validate with Zod before submitting
      const parsed = createBatchSchema.safeParse({
        ...value,
        monthlyFee: Number(value.monthlyFee),
      });
      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message ?? "Validation failed");
        return;
      }
      await mutateAsync({
        batch: {
          ...parsed.data,
          teacherId,
          startDate: new Date(parsed.data.startDate).toISOString(),
          endDate: new Date(parsed.data.endDate).toISOString(),
        },
      });
    },
  });

  const handleClose = (o: boolean) => {
    if (!o) form.reset();
    setOpen(o);
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={handleClose}
      title="Create New Batch"
      description="Set up a new class batch with schedule and fee information."
      trigger={
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Batch
        </Button>
      }
    >
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* Batch Name */}
        <form.Field
          name="name"
          validators={{ onChange: createBatchSchema.shape.name }}
        >
          {(field) => (
            <AppField
              field={field}
              label="Batch Name"
              placeholder="e.g. Batch A - Class 10"
              prepend={<BookOpen className="size-4 text-muted-foreground" />}
            />
          )}
        </form.Field>

        {/* Description */}
        <form.Field
          name="description"
          validators={{ onChange: createBatchSchema.shape.description }}
        >
          {(field) => (
            <AppField
              field={field}
              label="Description"
              placeholder="e.g. Morning batch for Class 10 students"
              prepend={<FileText className="size-4 text-muted-foreground" />}
            />
          )}
        </form.Field>

        {/* Monthly Fee */}
        <form.Field
          name="monthlyFee"
          validators={{ onChange: createBatchSchema.shape.monthlyFee }}
        >
          {(field) => (
            <AppField
              field={field}
              label="Monthly Fee (৳)"
              type="number"
              placeholder="e.g. 500"
              prepend={<DollarSign className="size-4 text-muted-foreground" />}
            />
          )}
        </form.Field>

        {/* Schedule */}
        <form.Field
          name="schedule"
          validators={{ onChange: createBatchSchema.shape.schedule }}
        >
          {(field) => (
            <AppField
              field={field}
              label="Schedule"
              placeholder="e.g. Sun-Tue-Thu 10:00 AM - 11:30 AM"
              prepend={<Clock className="size-4 text-muted-foreground" />}
            />
          )}
        </form.Field>

        {/* Date Row */}
        <div className="grid grid-cols-2 gap-3">
          <form.Field
            name="startDate"
            validators={{ onChange: createBatchSchema.shape.startDate }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Start Date"
                type="text"
                placeholder="YYYY-MM-DD"
                prepend={<Calendar className="size-4 text-muted-foreground" />}
              />
            )}
          </form.Field>
          <form.Field
            name="endDate"
            validators={{ onChange: createBatchSchema.shape.endDate }}
          >
            {(field) => (
              <AppField
                field={field}
                label="End Date"
                type="text"
                placeholder="YYYY-MM-DD"
                prepend={<Calendar className="size-4 text-muted-foreground" />}
              />
            )}
          </form.Field>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => handleClose(false)}
          >
            Cancel
          </Button>
          <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
            {([canSubmit, isSubmitting]) => (
              <AppSubmitButton
                isPending={isSubmitting || isPending}
                pendingLabel="Creating..."
                disabled={!canSubmit}
                className="flex-1"
              >
                Create Batch
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </div>
      </form>
    </AppDialog>
  );
}
