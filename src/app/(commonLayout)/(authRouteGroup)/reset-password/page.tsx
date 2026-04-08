import ResetPasswordForm from "@/components/modules/Auth/ResetPasswordForm";
import React from "react";

export const metadata = {
  title: "Reset Identity | Class Pilot",
  description: "Secure your Class Pilot cockpit with a new password.",
};

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-[calc(100vh-100px)] items-center justify-center py-12 px-4">
      <ResetPasswordForm />
    </div>
  );
}