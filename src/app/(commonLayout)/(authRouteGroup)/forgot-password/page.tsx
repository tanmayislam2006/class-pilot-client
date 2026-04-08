import ForgotPasswordForm from "@/components/modules/Auth/ForgotPasswordForm";
import React from "react";

export const metadata = {
  title: "Recover Access | Class Pilot",
  description: "Reset your Class Pilot password and recover cockpit access.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-[calc(100vh-100px)] items-center justify-center py-12 px-4 italic">
      <ForgotPasswordForm />
    </div>
  );
}