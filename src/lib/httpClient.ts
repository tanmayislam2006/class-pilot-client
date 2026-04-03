import { env } from "@/env";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getNewTokensWithRefreshToken } from "./serverAuth";
import { isTokenExpired, isTokenExpiringSoon } from "./tokenUtils";

// constants
const API_BASE_URL = env.NEXT_PUBLIC_URL;
const DEFAULT_TIMEOUT = 30_000;
const isServer = typeof window === "undefined";

type RequestHeaders = Record<string, string>;
export interface ApiRequestOption<TBody = unknown> {
  params?: Record<string, unknown>;
  headers?: RequestHeaders;
  signal?: AbortSignal;
  data?: TBody;
  timeout?: number;
}
export interface HttpClientErrorShape {
  message: string;
  status: number;
  data?: unknown;
}
export class HttpClientError extends Error {
  status: number;
  data?: unknown;
  constructor({ message, status, data }: HttpClientErrorShape) {
    super(message);
    this.name = "HttpClientError";
    this.status = status;
    this.data = data;
  }
}

let refreshPromise: Promise<boolean> | null = null;

async function refreshServerTokensIfNeeded(
  accessToken: string,
  refreshToken: string,
): Promise<void> {
  const shouldRefresh =
    !accessToken ||
    (await isTokenExpired(accessToken)) ||
    (await isTokenExpiringSoon(accessToken, 300));

  if (!shouldRefresh) return;

  // Singleton lock: if a refresh is already in progress, wait for it
  if (!refreshPromise) {
    refreshPromise = getNewTokensWithRefreshToken(refreshToken).finally(() => {
      refreshPromise = null;
    });
  }

  try {
    const refreshed = await refreshPromise;

    if (!refreshed) {
      throw new Error("Refresh token request did not return new tokens");
    }
  } catch (error) {
    console.error("Token refresh failed:", error);
    // Throw structured error so React Query onError can redirect to login
    throw new HttpClientError({
      message: "Session expired. Please log in again.",
      status: 401,
      data: error,
    });
  }
}

async function getServerCookieHeader(): Promise<string | undefined> {
  if (!isServer) return undefined;

  const { cookies, headers } = await import("next/headers");
  const requestHeaders = await headers();
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const tokenAlreadyRefreshed = requestHeaders.get("x-token-refreshed") === "1";

  if (refreshToken && !tokenAlreadyRefreshed) {
    // May throw HttpClientError(401) if refresh fails — intentional
    await refreshServerTokensIfNeeded(accessToken ?? "", refreshToken);
  }

  const refreshedCookieStore = await cookies();
  const cookieHeader = refreshedCookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  return cookieHeader || undefined;
}

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosClient.interceptors.response.use(undefined, async (error) => {
  const config = error.config as AxiosRequestConfig & { _retryCount?: number };
  const method = config.method?.toLowerCase();
  const isIdempotent = ["get", "put", "delete"].includes(method ?? "");
  const isServerError = error.response?.status >= 500;
  if (isIdempotent && !config._retryCount && isServerError) {
    config._retryCount = 1;
    return axiosClient.request(config);
  }
  return Promise.reject(error);
});
// extra for dev log
if (process.env.NODE_ENV === "development") {
  axiosClient.interceptors.request.use((config) => {
    console.log(
      `[HTTP] ▶ ${config.method?.toUpperCase()} ${config.url}`,
      config.params ?? "",
    );
    return config;
  });
  axiosClient.interceptors.response.use(
    (res) => {
      console.log(`[HTTP] ✅ ${res.status} ${res.config.url}`);
      return res;
    },
    (err) => {
      console.error(
        `[HTTP] ❌ ${err.response?.status ?? "NETWORK"} ${err.config?.url}`,
        err.message,
      );
      return Promise.reject(err);
    },
  );
}

// error handle
const normalizeError = (error: unknown): HttpClientError => {
  if (error instanceof HttpClientError) return error;
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const status = axiosError.response?.status ?? 500;
    const message =
      axiosError.response?.data?.message ??
      axiosError.message ??
      "Request failed";
    return new HttpClientError({
      message,
      status,
      data: axiosError.response?.data,
    });
  }
  return new HttpClientError({
    message: "Unexpected client error",
    status: 500,
    data: error,
  });
};

async function request<TResponse, TBody = unknown>(
  method: AxiosRequestConfig["method"],
  endpoint: string,
  options?: ApiRequestOption<TBody>,
): Promise<TResponse> {
  try {
    const serverCookieHeader = await getServerCookieHeader();

    const mergedHeaders: RequestHeaders = {
      ...(options?.headers ?? {}),
      ...(serverCookieHeader ? { Cookie: serverCookieHeader } : {}),
    };

    const response = await axiosClient.request<TResponse>({
      url: endpoint,
      method,
      params: options?.params,
      headers: mergedHeaders,
      signal: options?.signal,
      data: options?.data,
      timeout: options?.timeout ?? DEFAULT_TIMEOUT,
    });
    return response.data;
  } catch (error) {
    throw normalizeError(error);
  }
}

export const httpClient = {
  get: <TResponse>(
    endpoint: string,
    options?: ApiRequestOption,
  ) => request<TResponse>("get", endpoint, options),

  post: <TResponse, TBody = unknown>(
    endpoint: string,
    data?: TBody,
    options?: Omit<ApiRequestOption<TBody>, "data">,
  ) => request<TResponse, TBody>("post", endpoint, { ...options, data }),

  put: <TResponse, TBody = unknown>(
    endpoint: string,
    data?: TBody,
    options?: Omit<ApiRequestOption<TBody>, "data">,
  ) => request<TResponse, TBody>("put", endpoint, { ...options, data }),

  patch: <TResponse, TBody = unknown>(
    endpoint: string,
    data?: TBody,
    options?: Omit<ApiRequestOption<TBody>, "data">,
  ) => request<TResponse, TBody>("patch", endpoint, { ...options, data }),

  // Supports optional body for bulk delete use cases
  delete: <TResponse, TBody = unknown>(
    endpoint: string,
    data?: TBody,
    options?: Omit<ApiRequestOption<TBody>, "data">,
  ) => request<TResponse, TBody>("delete", endpoint, { ...options, data }),
};
