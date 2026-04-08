"use client";

import React from "react";
import { 
  MailWarning, 
  ArrowLeft, 
  RefreshCw, 
  CheckCircle2, 
  MailOpen,
  Mail
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";
import { toast } from "sonner";

interface VerifyEmailUIProps {
    email: string | null;
    isJustRegistered: boolean;
}

export default function VerifyEmailUI({ email, isJustRegistered }: VerifyEmailUIProps) {
  const handleResend = () => {
    toast.success("Signal Retransmitted", {
      description: "A new verification link has been sent to your inbox.",
    });
  };

  return (
    <Card className="mx-auto w-full max-w-md border border-border/40 bg-background/80 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.15)] backdrop-blur-2xl ring-1 ring-white/10 rounded-[32px]">
      <div className="bg-primary/5 p-4 text-center border-b border-border/40">
        <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-primary/60">
            <MailWarning className="h-3 w-3 fill-primary text-primary" />
            Identity Verification Mission
        </div>
      </div>
      
      <CardHeader className="p-8 text-center pt-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-primary/10 text-primary shadow-inner mb-6 animate-pulse">
            <MailOpen className="size-10" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-foreground mb-3">Verify Your Signal</h1>
        <p className="text-muted-foreground font-medium text-sm leading-relaxed px-4">
          We&apos;ve sent a verification link to your cockpit. Please check your inbox to complete activation.
        </p>
      </CardHeader>
      
      <CardContent className="px-8 pb-8 space-y-6">
        {isJustRegistered && (
           <div className="rounded-2xl bg-green-500/5 border border-green-500/20 p-4 flex gap-3 animate-in fade-in zoom-in-95 duration-500">
              <CheckCircle2 className="size-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-green-600">Onboarding Phase 1 Complete</p>
                <p className="text-xs text-green-600/70 font-medium">Your profile was created. Final step: Email sync.</p>
              </div>
           </div>
        )}

        <div className="rounded-2xl border border-border/60 bg-muted/20 p-5 space-y-2">
            <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="size-4" />
                <span className="text-sm font-bold tracking-tight truncate">{email || "your-pilot-email@sync.com"}</span>
            </div>
            <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/50 text-center pt-2 border-t border-border/40">
                Awaiting Authorization
            </p>
        </div>

        <div className="space-y-3">
            <Button 
                onClick={handleResend}
                className="h-14 w-full rounded-[20px] bg-primary text-sm font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-white"
            >
                Resend Verification Link <RefreshCw className="ml-2 size-4" />
            </Button>
            
            <p className="text-center text-xs text-muted-foreground font-medium">
                Didn&apos;t receive it? Check your folders or retry.
            </p>
        </div>
      </CardContent>

      <CardFooter className="justify-center border-t border-border/40 bg-muted/20 py-8 rounded-b-[32px]">
        <Button variant="link" className="text-primary font-bold hover:no-underline flex items-center gap-2" asChild>
          <Link href="/login">
            <ArrowLeft className="size-4" />
            Return to Login Cockpit
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
