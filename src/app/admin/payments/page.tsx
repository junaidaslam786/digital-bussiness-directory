"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useAdminStore } from "@/store/admin.api";
import {
  Search,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { payments, paymentsLoading, fetchPayments } = useAdminStore();

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const filteredPayments = payments.filter(
    (p) =>
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subscription?.business?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalAmount = payments.reduce((s, p) => s + p.amount, 0);
  const successPayments = payments.filter((p) => p.status === "success");
  const failedPayments = payments.filter((p) => p.status === "failed");

  if (paymentsLoading && payments.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payments</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Payment history and records</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input type="text" placeholder="Search payments..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Payments</div>
            <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{payments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Amount</div>
            <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">${totalAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Successful</div>
            <div className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{successPayments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Failed</div>
            <div className="mt-1 text-2xl font-bold text-red-600 dark:text-red-400">{failedPayments.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Business</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-mono text-gray-500 dark:text-gray-400">
                      {payment.id.slice(0, 8)}...
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {payment.subscription?.business?.name ?? "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {payment.subscription?.plan?.name ?? "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      ${payment.amount} {payment.currency.toUpperCase()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge className={
                        payment.status === "success"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : payment.status === "failed"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                      }>
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      {payment.invoiceUrl && (
                        <a href={payment.invoiceUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
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
