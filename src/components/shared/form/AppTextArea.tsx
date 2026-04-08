import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { AnyFieldApi } from "@tanstack/react-form";
import React from "react";

const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error;

  if (error && typeof error === "object") {
    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }
  }

  return String(error);
};

type AppTextAreaProps = {
  field: AnyFieldApi;
  label: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  rows?: number;
};

const AppTextArea = ({
  field,
  label,
  placeholder,
  className,
  disabled = false,
  rows = 4,
}: AppTextAreaProps) => {
  const firstError =
    field.state.meta.isTouched && field.state.meta.errors.length > 0
      ? getErrorMessage(field.state.meta.errors[0])
      : null;

  const hasError = firstError !== null;

  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={field.name} className={cn(hasError && "text-destructive")}>
        {label}
      </Label>

      <div className="relative">
        <Textarea
          id={field.name}
          name={field.name}
          value={field.state.value}
          placeholder={placeholder}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${field.name}-error` : undefined}
          rows={rows}
          className={cn(
            hasError && "border-destructive focus-visible:ring-destructive/20"
          )}
        />

        {hasError && (
          <p
            id={`${field.name}-error`}
            role="alert"
            className="mt-1 text-sm text-destructive font-medium"
          >
            {firstError}
          </p>
        )}
      </div>
    </div>
  );
};

export default AppTextArea;
