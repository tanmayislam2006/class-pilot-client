"use client";

import { useEffect } from "react";

import type { AuthUser } from "@/types/auth.types";

import { useAuth } from "./AuthProvider";

export default function AuthHydrator({ user }: { user: AuthUser | null }) {
  const { setLoading, setUser } = useAuth();

  useEffect(() => {
    setUser(user);
    setLoading(false);
  }, [setLoading, setUser, user]);

  return null;
}
