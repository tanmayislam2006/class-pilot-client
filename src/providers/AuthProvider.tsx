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
import { usePathname } from "next/navigation";

import { type AppRole, normalizeRole } from "@/lib/authUtils";
import type { AuthUser } from "@/types/auth.types";

type AuthContextValue = {
  user: AuthUser | null;
  role: AppRole | null;
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
  const pathname = usePathname();
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
    void syncAuth();
  }, [pathname]);

  const value: AuthContextValue = {
    user,
    role: normalizeRole(user?.role),
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
