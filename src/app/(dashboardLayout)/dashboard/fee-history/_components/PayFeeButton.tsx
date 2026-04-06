"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PaymentSessionResponse } from "@/types/student.types";

interface PayFeeButtonProps {
  feeId: string;
}

export default function PayFeeButton({ feeId }: PayFeeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePay = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Preparing secure checkout...");

    try {
      const response = await fetch(`/api/student/fees/${feeId}/pay`, {
        method: "POST",
      });

      const data = (await response.json()) as PaymentSessionResponse;

      if (!response.ok || !data.success || !data.data?.paymentUrl) {
        throw new Error(data.message || "Failed to initiate payment");
      }

      toast.success("Redirecting to Stripe...", { id: toastId });
      
      // Delay slightly to let the toast be seen before redirection
      setTimeout(() => {
        window.location.href = data.data!.paymentUrl;
      }, 800);

    } catch (error: unknown) {
      setIsLoading(false);
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast.error(message, { id: toastId });
    }
  };

  return (
    <Button
      size="sm"
      className="gap-2 bg-primary hover:bg-primary/90 shadow-sm transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 cursor-pointer"
      onClick={handlePay}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <CreditCard className="h-4 w-4" />
      )}
      Pay Now
    </Button>
  );
}
