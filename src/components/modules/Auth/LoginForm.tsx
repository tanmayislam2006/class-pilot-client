"use client";

import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
  UserRole,
} from "@/lib/authUtils";

import { loginAction } from "@/service/auth.service";
import { AuthUser } from "@/types/auth.types";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { 
  Eye, 
  EyeOff, 
  LockKeyhole, 
  Mail, 
  ChevronRight, 
  KeyRound, 
  Zap, 
  CircleUser 
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectFromUrl = searchParams.get("redirect");

  const credentials = {
    student: {
      email: "alice@example.com",
      password: "NewPass@1234",
    },
    teacher: {
      email: "john@example.com",
      password: "Teacher123",
    },
    admin: {
      email: "admin@classpilot.com",
      password: "Admin12345",
    },
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: ILoginPayload) => loginAction(payload),
  });

  const form = useForm({
    defaultValues: credentials.student,
    onSubmit: async ({ value }) => {
      setServerError(null);

      try {
        const result = await mutateAsync(value);

        if (!result.success) {
          setServerError(result.message || "Access Denied: Check pilot credentials");
          return;
        }

        const user = result.data?.user as AuthUser;
        const role = user.role as UserRole;

        let targetPath = getDefaultDashboardRoute(role);

        if (
          redirectFromUrl &&
          isValidRedirectForRole(redirectFromUrl, role)
        ) {
          targetPath = redirectFromUrl;
        }

        router.replace(targetPath);
        router.refresh();
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "Flight controller error: Unexpected disconnect";

        setServerError(`Login failed: ${message}`);
      }
    },
  });

  const handleRoleChange = (role: "student" | "teacher" | "admin") => {
    form.setFieldValue("email", credentials[role].email);
    form.setFieldValue("password", credentials[role].password);
  };

  return (
    <Card className="overflow-hidden border border-border/40 bg-background/80 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.15)] backdrop-blur-2xl transition-all duration-300 hover:shadow-primary/5 ring-1 ring-white/10 rounded-[32px]">
      <div className="bg-primary/5 p-4 text-center border-b border-border/40">
        <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-primary/60">
            <Zap className="h-3 w-3 fill-primary text-primary" />
            Active Boarding Sequence
        </div>
      </div>
      
      <CardContent className="p-8 lg:p-10">
        <div className="mb-10 text-center">
            <Tabs
                defaultValue="student"
                onValueChange={(value) =>
                    handleRoleChange(value as "student" | "teacher" | "admin")
                }
                className="w-full"
            >
                <TabsList className="grid w-full grid-cols-3 h-12 bg-muted/40 p-1 rounded-2xl">
                    <TabsTrigger value="student" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg font-bold transition-all flex gap-1.5 leading-none">
                        Student
                    </TabsTrigger>
                    <TabsTrigger value="teacher" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg font-bold transition-all flex gap-1.5 leading-none">
                        Teacher
                    </TabsTrigger>
                    <TabsTrigger value="admin" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg font-bold transition-all flex gap-1.5 leading-none">
                        Admin
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>

        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <form.Field
            name="email"
            validators={{ onChange: loginZodSchema.shape.email }}
          >
            {(field) => (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                   <CircleUser className="h-3 w-3 text-primary" />
                   Pilot Identity
                </label>
                <AppField
                  field={field}
                  type="email"
                  placeholder="name@example.com"
                  className="h-14 rounded-2xl bg-muted/30 border-border/40 focus:bg-background transition-all outline-none"
                  prepend={<Mail className="size-4 text-muted-foreground" />} label={""}                />
              </div>
            )}
          </form.Field>

          <form.Field
            name="password"
            validators={{ onChange: loginZodSchema.shape.password }}
          >
            {(field) => (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                   <KeyRound className="h-3 w-3 text-primary" />
                   Security Key
                </label>
                <AppField
                  field={field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your passkey"
                  className="h-14 rounded-2xl bg-muted/30 border-border/40 focus:bg-background transition-all outline-none"
                  prepend={<LockKeyhole className="size-4 text-muted-foreground" />}
                  append={<Button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all mr-1 rounded-xl"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </Button>} label={""}                />
              </div>
            )}
          </form.Field>

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/70 transition-all"
            >
              Recover Key?
            </Link>
          </div>

          {serverError && (
            <Alert variant="destructive" className="rounded-2xl border-destructive/20 bg-destructive/5 text-destructive animate-in fade-in zoom-in-95">
              <AlertDescription className="text-sm font-bold tracking-tight">{serverError}</AlertDescription>
            </Alert>
          )}

          <form.Subscribe
            selector={(s) => [s.canSubmit, s.isSubmitting] as const}
          >
            {([canSubmit, isSubmitting]) => (
              <AppSubmitButton
                isPending={isSubmitting || isPending}
                pendingLabel="Authenticating Pilot..."
                disabled={!canSubmit}
                className="h-16 w-full rounded-[20px] bg-primary text-base font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-white"
              >
                Boarding Mission <ChevronRight className="ml-2 h-5 w-5" />
              </AppSubmitButton>
            )}
          </form.Subscribe>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t border-border/40 bg-muted/20 py-8 lg:py-10">
        <p className="text-sm font-medium text-muted-foreground/80">
          First-time pilot?{" "}
          <Link href="/register" className="text-primary font-bold hover:underline">
            Register your cockpit
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
