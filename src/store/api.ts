/**
 * Base API client for communicating with the backend.
 * Handles authentication headers, token refresh, and common error handling.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// ────────────────────────────────────────────────────────
// Token storage helpers
// ────────────────────────────────────────────────────────

const TOKEN_KEY = "koreabiz-auth-token";
const REFRESH_TOKEN_KEY = "koreabiz-refresh-token";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setStoredTokens(token: string, refreshToken: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  // Sync a cookie so Next.js middleware can detect auth status server-side
  document.cookie = `${TOKEN_KEY}=1; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function clearStoredTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  // Remove the server-side auth cookie
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
}

// ────────────────────────────────────────────────────────
// Core fetch wrapper
// ────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface FetchOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  /** Skip automatic JSON content-type header (e.g. for FormData) */
  skipContentType?: boolean;
  /** Skip attaching the auth token */
  skipAuth?: boolean;
}

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = getStoredRefreshToken();
  if (!refreshToken) return false;

  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      clearStoredTokens();
      return false;
    }

    const json = await res.json();
    const newToken = json.data?.accessToken ?? json.accessToken;
    const newRefresh = json.data?.refreshToken ?? json.refreshToken;
    if (newToken && newRefresh) {
      setStoredTokens(newToken, newRefresh);
      return true;
    }
    clearStoredTokens();
    return false;
  } catch {
    clearStoredTokens();
    return false;
  }
}

export async function apiFetch<T = unknown>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const { body, skipContentType, skipAuth, ...init } = options;

  const headers = new Headers(init.headers);

  if (!skipAuth) {
    const token = getStoredToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  if (!skipContentType && !(body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  let res = await fetch(url, {
    ...init,
    headers,
    credentials: "include",
    body:
      body instanceof FormData ? body : body != null ? JSON.stringify(body) : undefined,
  });

  // Automatic token refresh on 401
  if (res.status === 401 && !skipAuth) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = refreshAccessToken().finally(() => {
        isRefreshing = false;
        refreshPromise = null;
      });
    }

    const refreshed = await (refreshPromise ?? Promise.resolve(false));
    if (refreshed) {
      // Retry the original request with the new token
      const retryHeaders = new Headers(headers);
      const newToken = getStoredToken();
      if (newToken) {
        retryHeaders.set("Authorization", `Bearer ${newToken}`);
      }
      res = await fetch(url, {
        ...init,
        headers: retryHeaders,
        credentials: "include",
        body:
          body instanceof FormData
            ? body
            : body != null
              ? JSON.stringify(body)
              : undefined,
      });
    }
  }

  if (!res.ok) {
    let errorData: unknown;
    try {
      errorData = await res.json();
    } catch {
      /* ignore parse errors */
    }
    throw new ApiError(
      res.status,
      (errorData as { message?: string })?.message ?? res.statusText,
      errorData,
    );
  }

  // Handle 204 No Content
  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

// ────────────────────────────────────────────────────────
// Query string builder
// ────────────────────────────────────────────────────────

export function buildQueryString(
  params: Record<string, unknown>,
): string {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  }
  const qs = searchParams.toString();
  return qs ? `?${qs}` : "";
}
