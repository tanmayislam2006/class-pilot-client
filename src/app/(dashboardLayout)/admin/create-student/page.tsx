import CreateStudentForm from "@/components/modules/Admin/CreateStudentForm";
import { GraduationCap } from "lucide-react";
import React from "react";

export const metadata = {
  title: "Enroll Student | Admin Dashboard",
  description: "Register a new student to the Class Pilot platform.",
};

export default function CreateStudentPage() {
  return (
    <div className="container max-w-4xl py-10 px-4 md:px-0">
      <div className="mb-10 flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight text-foreground flex items-center gap-3">
          <GraduationCap className="size-10 text-primary" />
          Enrollment Center
        </h1>
        <p className="text-muted-foreground font-medium text-lg">
          Onboard new students and give them access to their academic voyage.
        </p>
      </div>

      <CreateStudentForm />
    </div>
  );
}
