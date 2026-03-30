"use client";

import { useState, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Building2, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const resetPassword = useAuthStore((s) => s.resetPassword);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    setIsLoading(true);
    setError(null);
    try {
      await resetPassword(token, password);
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Invalid reset link
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            This password reset link is invalid or has expired.
          </p>
          <Link href="/forgot-password">
            <Button variant="outline" className="mt-4">
              Request a new link
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Password reset successful
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your password has been updated. You can now sign in with your new password.
          </p>
          <Link href="/login">
            <Button className="mt-4">Sign in</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 dark:bg-white">
            <Building2 className="h-6 w-6 text-white dark:text-gray-900" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Reset your password
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter your new password below
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                New password
              </label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1"
              />
              {password && confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  Passwords do not match
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || (!!confirmPassword && password !== confirmPassword)}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Resetting...
              </>
            ) : (
              "Reset password"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
