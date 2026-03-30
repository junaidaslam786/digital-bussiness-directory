"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function SubscriptionCancelPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="py-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
            <XCircle className="h-10 w-10 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
            Payment Cancelled
          </h1>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            Your payment was cancelled. No charges have been made.
            You can try again whenever you&apos;re ready.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/pricing">
              <Button className="bg-blue-600 hover:bg-blue-700">
                View Plans
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline">Go to Dashboard</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
