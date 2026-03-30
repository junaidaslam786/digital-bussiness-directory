"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
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
    CheckCircle2,
    CreditCard,
    Clock,
    Building2,
} from "lucide-react";
import { useBusinessesStore } from "@/store/businesses.api";
import { useReviewsStore } from "@/store/reviews.api";
import { useSubscriptionsStore } from "@/store/subscriptions.api";
import { formatRelativeTime } from "@/lib/format";

export default function DashboardOverview() {
    const { myBusinesses, myLoading, fetchMyBusinesses } = useBusinessesStore();
    const { reviews, fetchBusinessReviews } = useReviewsStore();
    const { mySubscriptions, fetchMySubscriptions } = useSubscriptionsStore();
    const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
    const { fetchProducts } = useBusinessesStore();

    const business = myBusinesses[0];
    const activeSub = mySubscriptions.find((s) => s.status === "active");

    useEffect(() => {
        fetchMyBusinesses();
        fetchMySubscriptions();
    }, [fetchMyBusinesses, fetchMySubscriptions]);

    useEffect(() => {
        if (business?.id) {
            fetchBusinessReviews(business.id);
            fetchProducts(business.id).then((p) => setProducts(p));
        }
    }, [business?.id, fetchBusinessReviews, fetchProducts]);

    const avgRating = reviews.length > 0
        ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
        : 0;

    const stats = {
        rating: avgRating,
        ratingCount: reviews.length,
        products: products.length,
        reviews: reviews.length,
    };

    const recentReviews = reviews.slice(0, 3);

    const profileCompletion = business ? (
        (business.name ? 15 : 0) +
        (business.description ? 15 : 0) +
        (business.phone ? 10 : 0) +
        (business.email ? 10 : 0) +
        (business.website ? 10 : 0) +
        (business.address ? 10 : 0) +
        (products.length > 0 ? 15 : 0) +
        (business.businessHours && business.businessHours.length > 0 ? 15 : 0)
    ) : 0;

    if (myLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-64" />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-28 w-full rounded-lg" />
                    ))}
                </div>
                <Skeleton className="h-64 w-full rounded-lg" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* No Business State */}
            {!business && !myLoading && (
                <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="py-12 text-center">
                        <Building2 className="mx-auto mb-4 h-12 w-12 text-blue-500" />
                        <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                            No Business Listing Yet
                        </h2>
                        <p className="mb-6 text-gray-600 dark:text-gray-400">
                            Create your first business listing to get started.
                        </p>
                        <Link href="/claim">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Business
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            )}

            {/* Business Status Banners */}
            {business && !activeSub && (
                <Card className="border-l-4 border-l-amber-500 animate-slide-in-up">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <CreditCard className="h-5 w-5 text-amber-600" />
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Subscription Required</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Your business needs an active subscription to be visible to customers.
                                    </p>
                                </div>
                            </div>
                            <Link href={`/pricing?businessId=${business.id}`}>
                                <Button size="sm" className="bg-amber-600 hover:bg-amber-700">Choose a Plan</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            )}

            {business && activeSub && !business.isApproved && (
                <Card className="border-l-4 border-l-blue-500 animate-slide-in-up">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-blue-600" />
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Pending Admin Approval</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Your subscription is active. Your listing is being reviewed by our team and will be published once approved.
                                    {business.rejectionReason && (
                                        <span className="block mt-1 text-red-600 dark:text-red-400">
                                            Rejection reason: {business.rejectionReason}
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {business && activeSub && business.isApproved && business.isActive && (
                <Card className="border-l-4 border-l-emerald-500 animate-slide-in-up">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Business is Live</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Your business listing is publicly visible to customers.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Dashboard Overview
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Welcome back! Here&apos;s how your business is performing.
                    </p>
                </div>
                {business && (
                    <Link href="/dashboard/profile">
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                        </Button>
                    </Link>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="animate-slide-in-up">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Business Status
                                </p>
                                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                    {business?.isActive ? "Active" : "Inactive"}
                                </p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    {business?.isApproved ? "Approved" : "Pending approval"}
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
                                    {review.authorName.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="font-medium text-gray-900 dark:text-white">
                                            {review.authorName}
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
                                        {formatRelativeTime(review.createdAt)}
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
