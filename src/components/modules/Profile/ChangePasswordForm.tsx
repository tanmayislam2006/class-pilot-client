"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ChangePasswordForm() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Note: Form logic will be added by the user as requested
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password change requested (UI only)");
  };

  return (
    <Card className="overflow-hidden border-border/70 bg-card/95 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] backdrop-blur">
      <CardHeader className="border-b border-border/40 bg-muted/5 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold">Security Settings</CardTitle>
            <CardDescription className="text-sm font-medium">
              Maintain your account security by updating your password.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold tracking-tight text-foreground/80">
              Current Password
            </Label>
            <div className="group relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none group-focus-within:text-primary transition-colors text-muted-foreground">
                <Lock className="size-4" />
              </div>
              <Input
                type={showCurrent ? "text" : "password"}
                placeholder="••••••••"
                className="h-12 w-full rounded-2xl border-border/60 bg-muted/20 pl-11 pr-11 transition-all focus:border-primary/40 focus:bg-background focus:ring-4 focus:ring-primary/5"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 hover:text-primary transition-colors text-muted-foreground"
              >
                {showCurrent ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* New Password */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold tracking-tight text-foreground/80">
                New Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted-foreground">
                   <KeyRound className="size-4" />
                </div>
                <Input
                  type={showNew ? "text" : "password"}
                  placeholder="Minimum 6 characters"
                  className="h-12 w-full rounded-2xl border-border/60 bg-muted/20 pl-11 pr-11 transition-all focus:border-primary/40 focus:bg-background focus:ring-4 focus:ring-primary/5"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 hover:text-primary transition-colors text-muted-foreground"
                >
                  {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold tracking-tight text-foreground/80">
                Confirm New Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted-foreground">
                   <KeyRound className="size-4" />
                </div>
                <Input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Match new password"
                  className="h-12 w-full rounded-2xl border-border/60 bg-muted/20 pl-11 pr-11 transition-all focus:border-primary/40 focus:bg-background focus:ring-4 focus:ring-primary/5"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 hover:text-primary transition-colors text-muted-foreground"
                >
                  {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            <p className="text-xs font-medium text-muted-foreground">
                Ensure your password is complex for better security.
            </p>
            <Button
              type="submit"
              className="h-12 rounded-2xl bg-primary px-8 font-bold text-primary-foreground shadow-xl shadow-primary/20 hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all"
            >
              Update Password
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
