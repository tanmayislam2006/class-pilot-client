"use server";

import { getCurrentUser } from "@/lib/currentUser";
import { httpClient, HttpClientError } from "@/lib/httpClient";
import { setToken } from "@/lib/tokenUtils";
import { ApiResponse } from "@/types/api";
import { LoginData } from "@/types/auth.types";
import { ILoginPayload, loginZodSchema } from "@/zod/auth.validation";
import { env } from "@/env";

export async function getNewTokensWithRefreshToken(
  refreshToken: string,
): Promise<boolean> {
  if (!refreshToken) {
    return false;
  }

  try {
    const res = await fetch(`${env.NEXT_PUBLIC_URL}/auth/refresh-token`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
    });
    if (!res.ok) {
      return false;
    }
    const { data } = await res.json();

    const {
      accessToken,
      refreshToken: newRefreshToken,
      token,
    }: {
      accessToken?: string;
      refreshToken?: string;
      token?: string;
    } = data ?? {};

    if (!accessToken && !newRefreshToken && !token) {
      return false;
    }

    const tasks: Promise<void>[] = [];

    if (accessToken) {
      tasks.push(setToken("accessToken", accessToken));
    }

    if (newRefreshToken) {
      tasks.push(setToken("refreshToken", newRefreshToken));
    }

    if (token) {
      tasks.push(setToken("better-auth.session_token", token, 24 * 60 * 60)); // 1 day in seconds
    }

    await Promise.all(tasks);

    return true;
  } catch (error) {
    console.error(
      "Error to generate refreshToken token in auth service ",
      error,
    );
    return false;
  }
}


export async function getUserInfo() {
  return getCurrentUser();
}


export const loginAction = async (
  payload: ILoginPayload,
  redirectPath?: string,
): Promise<ApiResponse<LoginData>> => {
  const parsedPayload = loginZodSchema.safeParse(payload);
  
  if (!parsedPayload.success) {
    const firstError =
      parsedPayload.error.issues[0]?.message || "Invalid input";

    return {
      status: 400,
      success: false,
      message: firstError,
    };
  }

  try {
    const response = await httpClient.post<
      ApiResponse<LoginData>,
      ILoginPayload
    >("/auth/login", parsedPayload.data);
    if (response.success && response.data) {
      await Promise.all([
        setToken("better-auth.session_token", response.data.token),
        setToken("accessToken", response.data.accessToken),
        setToken("refreshToken", response.data.refreshToken),
      ]);
    }

    return response;
  } catch (error) {
    if (error instanceof HttpClientError) {
      return {
        status: error.status,
        success: false,
        message: error.message,
      };
    }

    return {
      status: 500,
      success: false,
      message: "Unexpected error while logging in",
    };
  }
};
