"use client";

import type { AuthUser } from "@/types/auth.types";

import { AuthProvider } from "./AuthProvider";
import QueryProviders from "./QueryProvider";

export default function AppProviders({
  children,
  initialUser = null,
}: {
  children: React.ReactNode;
  initialUser?: AuthUser | null;
}) {
  return (
    <QueryProviders>
      <AuthProvider initialUser={initialUser}>{children}</AuthProvider>
    </QueryProviders>
  );
}
