import "server-only";

import { cookies } from "next/headers";

import { env } from "@/env";
import type { AuthUser } from "@/types/auth.types";

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    if (!accessToken) {
      return null;
    }

    const response = await fetch(`${env.NEXT_PUBLIC_URL}/auth/me`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}; better-auth.session_token=${sessionToken ?? ""}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { data?: AuthUser | null };
    return payload.data ?? null;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}
