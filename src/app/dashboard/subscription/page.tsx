"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  CreditCard,
  RefreshCw,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { useSubscriptionsStore } from "@/store/subscriptions.api";
import { useBusinessesStore } from "@/store/businesses.api";

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle2; label: string }> = {
  active: { color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle2, label: "Active" },
  expired: { color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", icon: XCircle, label: "Expired" },
  cancelled: { color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400", icon: XCircle, label: "Cancelled" },
  pending: { color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400", icon: AlertTriangle, label: "Pending" },
};

export default function SubscriptionPage() {
  const { mySubscriptions, mySubsLoading, fetchMySubscriptions, cancelSubscription, toggleAutoRenew } = useSubscriptionsStore();
  const { myBusinesses, fetchMyBusinesses } = useBusinessesStore();
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchMySubscriptions();
    fetchMyBusinesses();
  }, [fetchMySubscriptions, fetchMyBusinesses]);

  const business = myBusinesses[0];

  const handleCancel = async (subId: string) => {
    if (!confirm("Are you sure you want to cancel this subscription?")) return;
    setActionLoading(subId);
    try {
      await cancelSubscription(subId);
    } catch {}
    setActionLoading(null);
  };

  const handleToggleRenew = async (subId: string, current: boolean) => {
    setActionLoading(subId);
    try {
      await toggleAutoRenew(subId, !current);
    } catch {}
    setActionLoading(null);
  };

  if (mySubsLoading && mySubscriptions.length === 0) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  const activeSub = mySubscriptions.find((s) => s.status === "active");
  const hasSubscription = mySubscriptions.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Subscription</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your subscription plan and billing
        </p>
      </div>

      {/* Business Status Banner */}
      {business && (
        <Card className={`border-l-4 ${business.isApproved && business.isActive ? "border-l-emerald-500" : business.isApproved ? "border-l-amber-500" : "border-l-blue-500"}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {business.isApproved && business.isActive ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                ) : business.isApproved ? (
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                )}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{business.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {business.isApproved && business.isActive && activeSub
                      ? "Your business is live and publicly visible"
                      : business.isApproved && !activeSub
                        ? "Your business is approved but needs an active subscription to be visible"
                        : !business.isApproved && activeSub
                          ? "Your subscription is active — waiting for admin approval"
                          : "Create a subscription to activate your listing"}
                  </p>
                </div>
              </div>
              {business.rejectionReason && (
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                  Rejected: {business.rejectionReason}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Subscription — CTA */}
      {!hasSubscription && business && (
        <Card>
          <CardContent className="py-12 text-center">
            <CreditCard className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              No Active Subscription
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Choose a plan to activate your business listing and make it visible to customers.
            </p>
            <Link href={`/pricing?businessId=${business.id}`}>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <CreditCard className="mr-2 h-4 w-4" />
                Choose a Plan
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Subscriptions List */}
      {mySubscriptions.map((sub) => {
        const config = statusConfig[sub.status] ?? statusConfig.pending;
        const StatusIcon = config.icon;

        return (
          <Card key={sub.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{sub.plan?.name ?? "Subscription"}</CardTitle>
                <Badge className={config.color}>
                  <StatusIcon className="mr-1 h-3 w-3" />
                  {config.label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Plan</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {sub.plan?.name} — ${sub.plan?.price ?? 0}/{sub.plan?.billingCycle ?? "month"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Period</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {sub.startDate ? new Date(sub.startDate).toLocaleDateString() : "—"} → {sub.endDate ? new Date(sub.endDate).toLocaleDateString() : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Auto-Renew</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {sub.autoRenew ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              {sub.status === "active" && (
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleRenew(sub.id, sub.autoRenew)}
                    disabled={actionLoading === sub.id}
                  >
                    {actionLoading === sub.id ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-2 h-4 w-4" />
                    )}
                    {sub.autoRenew ? "Disable Auto-Renew" : "Enable Auto-Renew"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 dark:text-red-400"
                    onClick={() => handleCancel(sub.id)}
                    disabled={actionLoading === sub.id}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Cancel Subscription
                  </Button>
                </div>
              )}

              {(sub.status === "expired" || sub.status === "cancelled") && business && (
                <div className="mt-6">
                  <Link href={`/pricing?businessId=${business.id}`}>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      Renew Subscription
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
