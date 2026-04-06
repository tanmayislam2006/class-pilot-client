import "server-only";

import { cookies } from "next/headers";

import { httpClient, HttpClientError } from "@/lib/httpClient";
import type { ApiResponse } from "@/types/api";
import type { AuthUser } from "@/types/auth.types";

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return null;
    }

    const response = await httpClient.get<ApiResponse<AuthUser>>("/auth/me");

    if (!response.success || !response.data) {
      return null;
    }

    return response.data;
  } catch (error) {
    if (error instanceof HttpClientError && error.status === 401) {
      return null;
    }

    if (
      error instanceof Error &&
      (error.message.includes("DYNAMIC_SERVER_USAGE") ||
        error.message.includes("Dynamic server usage"))
    ) {
      return null;
    }

    console.error("Error fetching current user:", error);
    return null;
  }
}
