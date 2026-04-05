"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Banknote, CalendarCheck } from "lucide-react";

import AppDialog from "@/components/shared/AppDialog";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MONTHS, generateFeeSchema } from "@/zod/teacher.validation";

interface GenerateFeesModalProps {
  batchId: string;
  batchName: string;
}

async function postGenerateFees(batchId: string, body: { month: string; year: number }) {
  const res = await fetch(`/api/teacher/batches/${batchId}/generate-fees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to generate fees");
  return data;
}

export default function GenerateFeesModal({ batchId, batchName }: GenerateFeesModalProps) {
  const [open, setOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (body: { month: string; year: number }) =>
      postGenerateFees(batchId, body),
    onSuccess: () => {
      toast.success("Fees generated successfully for all enrolled students!");
      setOpen(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to generate fees");
    },
  });

  const form = useForm({
    defaultValues: {
      month: MONTHS[new Date().getMonth()] as string,
      year: currentYear,
    },
    onSubmit: async ({ value }) => {
      const parsed = generateFeeSchema.safeParse({
        ...value,
        year: Number(value.year),
      });
      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message ?? "Validation failed");
        return;
      }
      await mutateAsync(parsed.data);
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
      title="Generate Monthly Fees"
      description={`Create fee records for all students in "${batchName}". This will generate individual fee entries per student for the selected month.`}
      trigger={
        <Button variant="outline" className="gap-2">
          <Banknote className="h-4 w-4" />
          Generate Fees
        </Button>
      }
    >
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        {/* Info Banner */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800/40 dark:bg-amber-900/20">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            <CalendarCheck className="mr-2 inline h-4 w-4" />
            Fees will be generated for <strong>all enrolled students</strong> in this batch. This action can also be automated via a scheduled cron job.
          </p>
        </div>

        {/* Month Select */}
        <form.Field name="month" validators={{ onChange: generateFeeSchema.shape.month }}>
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor="month-select">Month</Label>
              <select
                id="month-select"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {MONTHS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              {field.state.meta.isTouched && field.state.meta.errors?.[0] && (
                <p className="text-sm text-destructive">
                  {String(field.state.meta.errors[0])}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Year */}
        <form.Field name="year" validators={{ onChange: generateFeeSchema.shape.year }}>
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor="year-input">Year</Label>
              <input
                id="year-input"
                type="number"
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                onBlur={field.handleBlur}
                min={2020}
                max={2100}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
              {field.state.meta.isTouched && field.state.meta.errors?.[0] && (
                <p className="text-sm text-destructive">
                  {String(field.state.meta.errors[0])}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <div className="flex gap-3 pt-1">
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
                pendingLabel="Generating..."
                disabled={!canSubmit}
                className="flex-1"
              >
                Generate Fees
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </div>
      </form>
    </AppDialog>
  );
}
