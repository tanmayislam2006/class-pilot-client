"use client";

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
} from "react";

import { isUserRole, type UserRole } from "@/lib/authUtils";
import type { AuthUser } from "@/types/auth.types";

type AuthContextValue = {
  user: AuthUser | null;
  role: UserRole | null;
  loading: boolean;
  refreshAuth: () => Promise<void>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function fetchCurrentUser() {
  const response = await fetch("/api/auth/me", {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as { data?: AuthUser | null };
  return payload.data ?? null;
}

export function AuthProvider({
  children,
  initialUser = null,
}: {
  children: React.ReactNode;
  initialUser?: AuthUser | null;
}) {
  const [user, setUser] = useState<AuthUser | null>(initialUser);
  const [loading, setLoading] = useState(initialUser === null);
  const [bootstrapped, setBootstrapped] = useState(initialUser !== null);

  const syncAuth = useEffectEvent(async () => {
    const shouldShowLoader = !bootstrapped && user === null;

    if (shouldShowLoader) {
      setLoading(true);
    }

    try {
      const nextUser = await fetchCurrentUser();
      setUser(nextUser);
    } catch (error) {
      console.error("Error syncing auth state:", error);
      setUser(null);
    } finally {
      if (!bootstrapped) {
        setBootstrapped(true);
      }
      setLoading(false);
    }
  });

  useEffect(() => {
    if (bootstrapped) {
      return;
    }

    void syncAuth();
  }, [bootstrapped]);

  const value: AuthContextValue = {
    user,
    role: isUserRole(user?.role) ? user.role : null,
    loading,
    refreshAuth: syncAuth,
    setLoading,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
