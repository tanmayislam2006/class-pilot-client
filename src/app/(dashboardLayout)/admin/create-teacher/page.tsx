import CreateTeacherForm from "@/components/modules/Admin/CreateTeacherForm";
import { UserPlus } from "lucide-react";
import React from "react";

export const metadata = {
  title: "Create Teacher | Admin Dashboard",
  description: "Register a new teacher to the Class Pilot platform.",
};

export default function CreateTeacherPage() {
  return (
    <div className="container max-w-4xl py-10 px-4 md:px-0">
      <div className="mb-10 flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight text-foreground flex items-center gap-3">
          <UserPlus className="size-10 text-primary" />
          Fleet Management
        </h1>
        <p className="text-muted-foreground font-medium text-lg">
          Add new instructors to manage batches and quizzes.
        </p>
      </div>

      <CreateTeacherForm />
    </div>
  );
}
