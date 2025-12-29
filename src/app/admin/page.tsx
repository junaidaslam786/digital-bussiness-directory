"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { ActivityFeed } from "@/components/admin/ActivityFeed";
import { enterprises } from "@/data/enterprises.mock";
import { categories } from "@/data/categories.mock";
import { cities } from "@/data/cities.mock";
import { reviews } from "@/data/reviews.mock";
import {
  Building2,
  Users,
  Star,
  MapPin,
  TrendingUp,
  Calendar,
  Eye,
  Plus,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  // Calculate stats
  const totalEnterprises = enterprises.length;
  const verifiedEnterprises = enterprises.filter((e) => e.verified).length;
  const totalReviews = reviews.length;
  const avgRating =
    enterprises.reduce((sum, e) => sum + e.ratingAvg, 0) / enterprises.length;

  // Recent enterprises
  const recentEnterprises = [...enterprises]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  // Top rated
  const topRated = [...enterprises]
    .sort((a, b) => b.ratingAvg - a.ratingAvg)
    .slice(0, 5);

  // Generate mock activities
  const activities = [
    {
      id: "1",
      type: "business" as const,
      title: "New Business Added",
      description: "Seoul Tech Solutions was added to the directory",
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    },
    {
      id: "2",
      type: "verification" as const,
      title: "Business Verified",
      description: "Busan Manufacturing Co. has been verified",
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    },
    {
      id: "3",
      type: "review" as const,
      title: "New Review Posted",
      description: "5-star review added for Gangnam Cafe",
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    },
    {
      id: "4",
      type: "business" as const,
      title: "Business Updated",
      description: "Incheon Logistics updated their hours",
      timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    },
    {
      id: "5",
      type: "category" as const,
      title: "Category Added",
      description: "New category 'Technology' created",
      timestamp: new Date(Date.now() - 1000 * 60 * 300), // 5 hours ago
    },
  ];

  const stats = [
    {
      title: "Total Businesses",
      value: totalEnterprises,
      subtitle: `${verifiedEnterprises} verified`,
      icon: Building2,
      colorClass: "primary" as const,
      trend: {
        value: 12.5,
        isPositive: true,
      },
    },
    {
      title: "Categories",
      value: categories.length,
      subtitle: "Active categories",
      icon: Users,
      colorClass: "success" as const,
      trend: {
        value: 8.1,
        isPositive: true,
      },
    },
    {
      title: "Total Reviews",
      value: totalReviews,
      subtitle: `Avg ${avgRating.toFixed(1)} rating`,
      icon: Star,
      colorClass: "warning" as const,
      trend: {
        value: 3.2,
        isPositive: false,
      },
    },
    {
      title: "Cities",
      value: cities.length,
      subtitle: "Across South Korea",
      icon: MapPin,
      colorClass: "primary" as const,
      trend: {
        value: 5.0,
        isPositive: true,
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening with your directory.
        </p>
      </div>

      {/* Stats Grid */}
      <DashboardStats stats={stats} />

      {/* Main Content Grid */}
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
                  key={enterprise.slug}
                  className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0 dark:border-gray-800"
                >
                  <div className="flex-1">
                    <Link
                      href={`/enterprises/${enterprise.slug}`}
                      className="font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                    >
                      {enterprise.name}
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {enterprise.categories[0].name} • {enterprise.address.city}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {enterprise.verified && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    )}
                    <Link href={`/enterprises/${enterprise.slug}`}>
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
                <span>Top Rated Businesses</span>
              </CardTitle>
              <Link href="/search?sort=rating">
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
                  key={enterprise.slug}
                  className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0 dark:border-gray-800"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <Link
                        href={`/enterprises/${enterprise.slug}`}
                        className="font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                      >
                        {enterprise.name}
                      </Link>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {enterprise.ratingAvg.toFixed(1)} ★ ({enterprise.ratingCount} reviews)
                      </p>
                    </div>
                  </div>
                  <Link href={`/enterprises/${enterprise.slug}`}>
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

      {/* Activity Feed and Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed activities={activities} />
        </div>

        {/* Quick Actions */}
        <Card className="animate-slide-in-up">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/claim" className="block">
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Business
                </Button>
              </Link>
              <Link href="/categories" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="mr-2 h-4 w-4" />
                  View Categories
                </Button>
              </Link>
              <Link href="/cities" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="mr-2 h-4 w-4" />
                  View Cities
                </Button>
              </Link>
              <Link href="/search" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="mr-2 h-4 w-4" />
                  Browse All
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

