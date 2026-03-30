"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useAdminStore } from "@/store/admin.api";
import {
  Search,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function SubscriptionsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { subscriptions, subscriptionsLoading, fetchSubscriptions } = useAdminStore();

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const filteredSubs = subscriptions.filter(
    (s) =>
      s.business?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.plan?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeSubs = subscriptions.filter((s) => s.status === "active");
  const expiredSubs = subscriptions.filter((s) => s.status === "expired");

  if (subscriptionsLoading && subscriptions.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const statusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "expired": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "cancelled": return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      default: return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Subscriptions</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Manage business subscriptions</p>
        </div>
        <Button variant="outline" onClick={() => fetchSubscriptions()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input type="text" placeholder="Search subscriptions..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Total</div>
            <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{subscriptions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Active</div>
            <div className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{activeSubs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Expired</div>
            <div className="mt-1 text-2xl font-bold text-red-600 dark:text-red-400">{expiredSubs.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Business</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Start</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">End</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Auto-Renew</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredSubs.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {sub.business?.name ?? sub.businessId.slice(0, 8)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {sub.plan?.name ?? "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge className={statusColor(sub.status)}>{sub.status}</Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {sub.startDate ? new Date(sub.startDate).toLocaleDateString() : "—"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {sub.endDate ? new Date(sub.endDate).toLocaleDateString() : "—"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span className={sub.autoRenew ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400"}>
                        {sub.autoRenew ? "Yes" : "No"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
