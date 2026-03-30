"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
  /** If set, only users whose role.name matches one of these can access */
  allowedRoles?: string[];
}

/**
 * Client-side auth guard — verifies the user is authenticated and
 * optionally checks role membership. Redirects on failure.
 *
 * This runs *after* the middleware gate, so it handles cases where
 * the cookie exists but the token is actually invalid / expired.
 */
export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    // Wait until the auth store finishes loading
    if (isLoading) return;

    if (!isAuthenticated || !user) {
      router.replace("/login");
      return;
    }

    if (allowedRoles && allowedRoles.length > 0) {
      const userRole = user.role?.name;
      if (!userRole || !allowedRoles.includes(userRole)) {
        router.replace("/");
      }
    }
  }, [isAuthenticated, isLoading, user, allowedRoles, router]);

  // Show loading state while checking auth
  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  // Role check
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user.role?.name;
    if (!userRole || !allowedRoles.includes(userRole)) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      );
    }
  }

  return <>{children}</>;
}
