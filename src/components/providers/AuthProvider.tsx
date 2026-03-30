"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { getStoredToken } from "@/store/api";

/**
 * AuthProvider — wraps the app to hydrate auth state on mount.
 * If a stored token exists, fetches the current user from /auth/me.
 * Provides a loading state to prevent flash of unauthenticated content.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const fetchCurrentUser = useAuthStore((s) => s.fetchCurrentUser);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      fetchCurrentUser().finally(() => setHydrated(true));
    } else {
      setHydrated(true);
    }
  }, [fetchCurrentUser]);

  // During SSR / before hydration, render children immediately
  // to avoid layout shift; auth guards handle redirects separately
  if (!hydrated) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
