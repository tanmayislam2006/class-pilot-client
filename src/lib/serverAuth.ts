import "server-only";

import { env } from "@/env";

import { setToken } from "./tokenUtils";

export async function getNewTokensWithRefreshToken(
  refreshToken: string,
): Promise<boolean> {
  if (!refreshToken) {
    return false;
  }

  try {
    const response = await fetch(`${env.NEXT_PUBLIC_URL}/auth/refresh-token`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    if (!response.ok) {
      return false;
    }

    const payload = (await response.json()) as {
      data?: {
        accessToken?: string;
        refreshToken?: string;
        token?: string;
      } | null;
    };

    const accessToken = payload.data?.accessToken;
    const newRefreshToken = payload.data?.refreshToken;
    const sessionToken = payload.data?.token;

    if (!accessToken && !newRefreshToken && !sessionToken) {
      return false;
    }

    const cookieTasks: Promise<void>[] = [];

    if (accessToken) {
      cookieTasks.push(setToken("accessToken", accessToken));
    }

    if (newRefreshToken) {
      cookieTasks.push(setToken("refreshToken", newRefreshToken));
    }

    if (sessionToken) {
      cookieTasks.push(
        setToken("better-auth.session_token", sessionToken, 24 * 60 * 60),
      );
    }

    await Promise.all(cookieTasks);

    return true;
  } catch (error) {
    console.error("Error generating new tokens from refresh token:", error);
    return false;
  }
}
