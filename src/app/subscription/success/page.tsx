"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useSubscriptionsStore } from "@/store/subscriptions.api";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { verifySession } = useSubscriptionsStore();
  const [verifying, setVerifying] = useState(!!sessionId);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    let cancelled = false;
    (async () => {
      try {
        await verifySession(sessionId);
        if (!cancelled) setVerified(true);
      } catch {
        // even if verify fails, show success — webhook may fire later
      } finally {
        if (!cancelled) setVerifying(false);
      }
    })();
    return () => { cancelled = true; };
  }, [sessionId, verifySession]);

  return (
    <Card className="w-full max-w-md">
      <CardContent className="py-12 text-center">
        {verifying ? (
          <>
            <Loader2 className="mx-auto mb-6 h-10 w-10 animate-spin text-emerald-600" />
            <h1 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
              Activating Subscription...
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Please wait while we verify your payment.
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
              Payment Successful!
            </h1>
            <p className="mb-2 text-gray-600 dark:text-gray-400">
              {verified
                ? "Your subscription is now active. Your business listing will be reviewed by our admin team and published once approved."
                : "Your payment has been received. Your subscription will be activated shortly."}
            </p>
            <p className="mb-8 text-sm text-gray-500 dark:text-gray-500">
              You&apos;ll receive an email notification once your listing is approved.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/dashboard/subscription">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  View Subscription
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline">Go to Dashboard</Button>
              </Link>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function SubscriptionSuccessPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      <Suspense fallback={
        <Card className="w-full max-w-md">
          <CardContent className="py-12 text-center">
            <Loader2 className="mx-auto mb-6 h-10 w-10 animate-spin text-emerald-600" />
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </CardContent>
        </Card>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
