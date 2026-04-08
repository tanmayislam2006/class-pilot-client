"use client";

import React, { useState } from "react";
import { 
  LockKeyhole, 
  ArrowLeft, 
  Zap, 
  Eye, 
  EyeOff,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
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
import { useRouter } from "next/navigation";

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        toast.error("Format Mismatch", {
            description: "Passwords do not match. Check your input.",
        });
        return;
    }

    setIsPending(true);
    
    // Fake success for UI demonstration
    setTimeout(() => {
        toast.success("Identity Recalibrated!", {
            description: "Your new password has been set. Safe landing!",
        });
        setIsPending(false);
        router.push("/login");
    }, 1500);
  };

  return (
    <Card className="mx-auto w-full max-w-md border border-border/40 bg-background/80 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.15)] backdrop-blur-2xl ring-1 ring-white/10 rounded-[32px]">
      <div className="bg-primary/5 p-4 text-center border-b border-border/40">
        <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-primary/60">
            <ShieldCheck className="h-3 w-3 fill-primary text-primary" />
            Identity Correction Sequence
        </div>
      </div>
      
      <CardHeader className="p-8 text-center pt-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-primary/10 text-primary shadow-inner mb-6">
            <Zap className="size-10" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-foreground mb-3">Reset Security Key</h1>
        <p className="text-muted-foreground font-medium text-sm px-4">
          Prepare for landing. Set a new secure password for your Class Pilot account.
        </p>
      </CardHeader>
      
      <CardContent className="px-8 pb-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
              New Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                <LockKeyhole className="size-4" />
              </div>
              <Input 
                type={showPassword ? "text" : "password"} 
                placeholder="Minimum 8 characters"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 rounded-2xl bg-muted/30 border-border/40 pl-11 pr-11 focus:bg-background transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
              Confirm New Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                <LockKeyhole className="size-4" />
              </div>
              <Input 
                type={showPassword ? "text" : "password"} 
                placeholder="Repeat new password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-14 rounded-2xl bg-muted/30 border-border/40 pl-11 focus:bg-background transition-all"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isPending}
            className="h-16 w-full rounded-[20px] bg-primary text-base font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-white"
          >
            {isPending ? "Updating Security Checkpoint..." : (
               <>Secure Account <ChevronRight className="ml-2 size-5" /></>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t border-border/40 bg-muted/20 py-8 rounded-b-[32px]">
        <Button variant="link" className="text-primary font-bold hover:no-underline flex items-center gap-2" asChild>
          <Link href="/login">
            <ArrowLeft className="size-4" />
            Back to Base Login
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
