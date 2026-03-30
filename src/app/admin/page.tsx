"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { ActivityFeed } from "@/components/admin/ActivityFeed";
import { useAdminStore } from "@/store/admin.api";
import {
  Building2,
  Users,
  Star,
  TrendingUp,
  Calendar,
  Eye,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function AdminDashboard() {
  const {
    dashboardStats,
    dashboardLoading,
    businesses,
    businessesLoading,
    recentActivity,
    recentActivityLoading,
    fetchDashboard,
    fetchBusinesses,
    fetchRecentActivity,
  } = useAdminStore();

  useEffect(() => {
    fetchDashboard();
    fetchBusinesses();
    fetchRecentActivity();
  }, [fetchDashboard, fetchBusinesses, fetchRecentActivity]);

  const recentEnterprises = [...businesses]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const topRated = [...businesses]
    .filter((b) => b.isApproved)
    .slice(0, 5);

  const activities = recentActivity.map((log) => ({
    id: log.id,
    type: (log.resource === "business"
      ? "business"
      : log.resource === "review"
        ? "review"
        : log.resource === "user"
          ? "user"
          : log.resource === "category"
            ? "category"
            : log.resource === "city"
              ? "city"
              : "verification") as "business" | "review" | "user" | "category" | "city" | "verification",
    title: log.action,
    description: `${log.resource}${log.resourceId ? ` #${log.resourceId.slice(0, 8)}` : ""} by ${log.user?.name ?? "System"}`,
    timestamp: new Date(log.createdAt),
  }));

  const ds = dashboardStats;
  const stats = [
    { title: "Total Businesses", value: ds?.totalBusinesses ?? 0, subtitle: `${ds?.approvedBusinesses ?? 0} approved`, icon: Building2, colorClass: "primary" as const },
    { title: "Total Users", value: ds?.totalUsers ?? 0, subtitle: `${ds?.activeSubscriptions ?? 0} subscribed`, icon: Users, colorClass: "success" as const },
    { title: "Total Reviews", value: ds?.totalReviews ?? 0, subtitle: `${ds?.pendingApprovals ?? 0} pending approvals`, icon: Star, colorClass: "warning" as const },
    { title: "Revenue", value: ds?.totalRevenue ?? 0, subtitle: `${ds?.totalPayments ?? 0} payments`, icon: CreditCard, colorClass: "primary" as const },
  ];

  if (dashboardLoading && !ds) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome back! Here&apos;s what&apos;s happening with your directory.
        </p>
      </div>

      <DashboardStats stats={stats} />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Enterprises */}
        <Card className="animate-slide-in-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span>Recently Updated</span>
              </CardTitle>
              <Link href="/search">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEnterprises.map((enterprise) => (
                <div
                  key={enterprise.id}
                  className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0 dark:border-gray-800"
                >
                  <div className="flex-1">
                    <Link
                      href={`/enterprises/${enterprise.id}`}
                      className="font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                    >
                      {enterprise.name}
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {enterprise.category?.name ?? "Uncategorized"} &bull; {enterprise.address ?? ""}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {enterprise.isApproved && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    )}
                    <Link href={`/enterprises/${enterprise.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Rated */}
        <Card className="animate-slide-in-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span>Top Businesses</span>
              </CardTitle>
              <Link href="/search">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topRated.map((enterprise, index) => (
                <div
                  key={enterprise.id}
                  className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0 dark:border-gray-800"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <Link
                        href={`/enterprises/${enterprise.id}`}
                        className="font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                      >
                        {enterprise.name}
                      </Link>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {enterprise.category?.name ?? ""}
                      </p>
                    </div>
                  </div>
                  <Link href={`/enterprises/${enterprise.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed activities={activities} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/claim" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Building2 className="mr-2 h-4 w-4" />
                Add New Business
              </Button>
            </Link>
            <Link href="/admin/categories" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Manage Categories
              </Button>
            </Link>
            <Link href="/admin/reviews" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Star className="mr-2 h-4 w-4" />
                Moderate Reviews
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

