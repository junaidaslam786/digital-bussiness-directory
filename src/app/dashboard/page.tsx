"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import {
    Eye,
    Star,
    Package,
    MessageSquare,
    TrendingUp,
    Edit,
    Plus,
    ArrowUpRight,
} from "lucide-react";

export default function DashboardOverview() {
    // Mock data for demonstration
    const stats = {
        views: 1247,
        viewsTrend: 15.3,
        rating: 4.8,
        ratingCount: 156,
        products: 24,
        reviews: 89,
    };

    const recentReviews = [
        {
            id: "1",
            author: "John Kim",
            rating: 5,
            comment: "Excellent service and quality products!",
            createdAt: "2 days ago",
        },
        {
            id: "2",
            author: "Sarah Lee",
            rating: 4,
            comment: "Great experience, highly recommended.",
            createdAt: "3 days ago",
        },
        {
            id: "3",
            author: "Mike Park",
            rating: 5,
            comment: "Professional and reliable business.",
            createdAt: "5 days ago",
        },
    ];

    const profileCompletion = 85; // percentage

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Dashboard Overview
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Welcome back! Here's how your business is performing.
                    </p>
                </div>
                <Link href="/dashboard/profile">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="animate-slide-in-up">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Total Views
                                </p>
                                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                    {stats.views.toLocaleString()}
                                </p>
                                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                                    ↑ {stats.viewsTrend}% this month
                                </p>
                            </div>
                            <div className="rounded-xl bg-emerald-100 p-3 dark:bg-emerald-900/30">
                                <Eye className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="animate-slide-in-up">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Rating
                                </p>
                                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                    {stats.rating.toFixed(1)}
                                </p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Based on {stats.ratingCount} reviews
                                </p>
                            </div>
                            <div className="rounded-xl bg-amber-100 p-3 dark:bg-amber-900/30">
                                <Star className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="animate-slide-in-up">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Products
                                </p>
                                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                    {stats.products}
                                </p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Active listings
                                </p>
                            </div>
                            <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
                                <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="animate-slide-in-up">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Reviews
                                </p>
                                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                    {stats.reviews}
                                </p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Total feedback
                                </p>
                            </div>
                            <div className="rounded-xl bg-purple-100 p-3 dark:bg-purple-900/30">
                                <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Profile Completion */}
                <Card className="animate-slide-in-up lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between text-lg">
                            <span className="flex items-center space-x-2">
                                <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                <span>Profile Completion</span>
                            </span>
                            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                {profileCompletion}%
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                <div
                                    className="h-3 rounded-full bg-emerald-600 dark:bg-emerald-500 transition-all"
                                    style={{ width: `${profileCompletion}%` }}
                                />
                            </div>
                            <div className="grid gap-3 md:grid-cols-2">
                                <div className="flex items-center text-sm">
                                    <div className="mr-2 h-2 w-2 rounded-full bg-emerald-600" />
                                    <span className="text-gray-700 dark:text-gray-300">
                                        Basic information completed
                                    </span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <div className="mr-2 h-2 w-2 rounded-full bg-emerald-600" />
                                    <span className="text-gray-700 dark:text-gray-300">
                                        Products added
                                    </span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <div className="mr-2 h-2 w-2 rounded-full bg-emerald-600" />
                                    <span className="text-gray-700 dark:text-gray-300">
                                        Gallery uploaded
                                    </span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <div className="mr-2 h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600" />
                                    <span className="text-gray-500 dark:text-gray-400">
                                        Add business hours
                                    </span>
                                </div>
                            </div>
                            <Link href="/dashboard/profile">
                                <Button variant="outline" className="w-full">
                                    Complete Your Profile
                                    <ArrowUpRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="animate-slide-in-up">
                    <CardHeader>
                        <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <Link href="/dashboard/products/new" className="block">
                                <Button className="w-full justify-start bg-emerald-600 hover:bg-emerald-700">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Product
                                </Button>
                            </Link>
                            <Link href="/dashboard/services/new" className="block">
                                <Button variant="outline" className="w-full justify-start">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Service
                                </Button>
                            </Link>
                            <Link href="/dashboard/gallery" className="block">
                                <Button variant="outline" className="w-full justify-start">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Upload Images
                                </Button>
                            </Link>
                            <Link href="/dashboard/reviews" className="block">
                                <Button variant="outline" className="w-full justify-start">
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    View Reviews
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Reviews */}
            <Card className="animate-slide-in-up">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Recent Reviews</CardTitle>
                        <Link href="/dashboard/reviews">
                            <Button variant="ghost" size="sm">
                                View All
                                <ArrowUpRight className="ml-1 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentReviews.map((review) => (
                            <div
                                key={review.id}
                                className="flex items-start space-x-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0 dark:border-gray-800"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                                    {review.author.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium text-gray-900 dark:text-white">
                                            {review.author}
                                        </div>
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`h-4 w-4 ${star <= review.rating
                                                            ? "fill-amber-400 text-amber-400"
                                                            : "text-gray-300 dark:text-gray-600"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        {review.comment}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                                        {review.createdAt}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
