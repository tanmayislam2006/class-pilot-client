import VerifyEmailUI from "@/components/modules/Auth/VerifyEmailUI";
import React from "react";

export const metadata = {
  title: "Verify Signal | Class Pilot",
  description: "Complete email verification to activate your Class Pilot profile.",
};

type VerifyEmailPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const email = resolvedSearchParams.email;
  const registered = resolvedSearchParams.registered;

  const safeEmail = typeof email === "string" ? email : null;
  const isJustRegistered = registered === "true";

  return (
    <div className="flex min-h-[calc(100vh-100px)] items-center justify-center py-12 px-4">
      <VerifyEmailUI email={safeEmail} isJustRegistered={isJustRegistered} />
    </div>
  );
}
