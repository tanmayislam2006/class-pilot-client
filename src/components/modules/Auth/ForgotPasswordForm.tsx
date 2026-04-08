"use client";

import React, { useState } from "react";
import { Mail, ArrowLeft, Send, KeyRound, Info } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";
import { toast } from "sonner";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    
    // Fake success for UI demonstration
    setTimeout(() => {
        toast.success("Flight Path Reset!", {
            description: `Recovery instructions sent to ${email}`,
        });
        setIsPending(false);
    }, 1500);
  };

  return (
    <Card className="mx-auto w-full max-w-md border border-border/40 bg-background/80 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.15)] backdrop-blur-2xl ring-1 ring-white/10 rounded-[32px]">
      <div className="bg-primary/5 p-4 text-center border-b border-border/40">
        <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-primary/60">
            <KeyRound className="h-3 w-3 fill-primary text-primary" />
            Security Recovery Sequence
        </div>
      </div>
      
      <CardHeader className="p-8 text-center">
        <h1 className="text-3xl font-black tracking-tight text-foreground mb-2">Lost Your Key?</h1>
        <p className="text-muted-foreground font-medium text-sm">
          Enter your pilot email and we&apos;ll send you a recovery link to reset your cockpit access.
        </p>
      </CardHeader>
      
      <CardContent className="px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
              Pilot Email
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                <Mail className="size-4" />
              </div>
              <Input 
                type="email" 
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 rounded-2xl bg-muted/30 border-border/40 pl-11 focus:bg-background transition-all"
              />
            </div>
          </div>

          <div className="rounded-2xl bg-primary/5 border border-primary/10 p-4 flex gap-3">
             <Info className="size-5 text-primary shrink-0 mt-0.5" />
             <p className="text-xs text-primary/80 font-medium leading-relaxed">
                If your account is managed by an institution, you may need to contact your Chief Admin for a manual reset.
             </p>
          </div>

          <Button 
            type="submit" 
            disabled={isPending}
            className="h-16 w-full rounded-[20px] bg-primary text-base font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-white"
          >
            {isPending ? "Transmitting..." : (
               <>Send Recovery Link <Send className="ml-2 size-4" /></>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t border-border/40 bg-muted/20 py-8 rounded-b-[32px]">
        <Button variant="link" className="text-primary font-bold hover:no-underline flex items-center gap-2" asChild>
          <Link href="/login">
            <ArrowLeft className="size-4" />
            Back to Login
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
