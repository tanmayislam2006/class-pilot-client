"use client";

import React from "react";
import ProfileInfoForm from "@/components/modules/Profile/ProfileInfoForm";
import ChangePasswordForm from "@/components/modules/Profile/ChangePasswordForm";
import { UserCog } from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="relative min-h-[calc(100vh-4rem)] pt-24 pb-20 overflow-hidden">
      {/* Background blobs for depth */}
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute top-[10%] left-[5%] h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] h-80 w-80 rounded-full bg-secondary/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        {/* Header Section */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-[24px] bg-primary/10 text-primary shadow-[0_15px_30px_-10px_rgba(99,57,166,0.2)]">
                <UserCog className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tighter text-foreground sm:text-5xl">
                   My <span className="text-primary italic">Profile</span> Settings
                </h1>
              </div>
            </div>
            <p className="max-w-[500px] text-lg font-medium text-muted-foreground/80 leading-relaxed">
              Manage your personal information, update your visibility, and secure your account credentials.
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid gap-12">
          {/* Section 1: Personal Info */}
          <section className="animate-in fade-in slide-in-from-bottom-5 duration-700">
             <ProfileInfoForm />
          </section>

          {/* Section 2: Security */}
          <section className="animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
             <ChangePasswordForm />
          </section>
        </div>

      </div>
    </main>
  );
}
