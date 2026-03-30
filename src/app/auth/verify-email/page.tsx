"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const verifyEmail = useAuthStore((s) => s.verifyEmail);

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    token ? "loading" : "error"
  );
  const [message, setMessage] = useState(
    token ? "" : "No verification token found in the URL."
  );

  useEffect(() => {
    if (!token) return;
    let cancelled = false;

    verifyEmail(token)
      .then((res) => {
        if (cancelled) return;
        setStatus("success");
        setMessage(res.message || "Your email has been verified successfully.");
      })
      .catch((err) => {
        if (cancelled) return;
        setStatus("error");
        setMessage(
          (err as Error).message ||
            "Verification failed. The link may be expired or invalid."
        );
      });

    return () => {
      cancelled = true;
    };
  }, [token, verifyEmail]);

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        {status === "loading" && (
          <>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-gray-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Verifying your email...
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Please wait while we verify your email address.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Email verified!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{message}</p>
            <Link href="/login">
              <Button className="mt-4">Sign in to your account</Button>
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Verification failed
            </h1>
            <p className="text-gray-600 dark:text-gray-400">{message}</p>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Link href="/login">
                <Button variant="outline">Sign in</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline">Create new account</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
