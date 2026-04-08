import AccessRequired from "@/components/modules/Auth/AccessRequired";
import React from "react";

export const metadata = {
  title: "Access Restricted | Class Pilot",
  description: "Contact an administrator to receive your Class Pilot credentials.",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-100px)] items-center justify-center py-12 px-4">
      <AccessRequired />
    </div>
  );
}
