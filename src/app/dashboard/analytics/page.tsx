"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { Star, Package, MessageSquare, BarChart3, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { useBusinessesStore } from "@/store/businesses.api";
import { useReviewsStore } from "@/store/reviews.api";
import type { BusinessProduct, BusinessService } from "@/types/enterprise";

export default function AnalyticsPage() {
    const { myBusinesses, myLoading, fetchMyBusinesses, fetchProducts, fetchServices } = useBusinessesStore();
    const { reviews, loading: reviewsLoading, fetchBusinessReviews } = useReviewsStore();
    const [products, setProducts] = useState<BusinessProduct[]>([]);
    const [services, setServices] = useState<BusinessService[]>([]);

    const business = myBusinesses[0];

    useEffect(() => {
        fetchMyBusinesses();
    }, [fetchMyBusinesses]);

    useEffect(() => {
        if (business?.id) {
            fetchBusinessReviews(business.id);
            fetchProducts(business.id).then(setProducts);
            fetchServices(business.id).then(setServices);
        }
    }, [business?.id, fetchBusinessReviews, fetchProducts, fetchServices]);

    const avgRating = reviews.length > 0
        ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
        : 0;

    // Distribution of ratings
    const ratingDist = [1, 2, 3, 4, 5].map(
        (r) => reviews.filter((rev) => rev.rating === r).length
    );
    const maxDist = Math.max(...ratingDist, 1);

    if (myLoading || reviewsLoading) {
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
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Analytics
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Track your business performance
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Avg Rating
                                </p>
                                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                    {avgRating.toFixed(1)}
                                </p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    {reviews.length} reviews
                                </p>
                            </div>
                            <div className="rounded-xl bg-amber-100 p-3 dark:bg-amber-900/30">
                                <Star className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Total Reviews
                                </p>
                                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                    {reviews.length}
                                </p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Customer feedback
                                </p>
                            </div>
                            <div className="rounded-xl bg-purple-100 p-3 dark:bg-purple-900/30">
                                <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Products
                                </p>
                                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                    {products.length}
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

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Services
                                </p>
                                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                    {services.length}
                                </p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Active offerings
                                </p>
                            </div>
                            <div className="rounded-xl bg-emerald-100 p-3 dark:bg-emerald-900/30">
                                <Briefcase className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                        <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        <span>Rating Distribution</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((rating) => {
                            const count = ratingDist[rating - 1];
                            const pct = maxDist > 0 ? (count / maxDist) * 100 : 0;
                            return (
                                <div key={rating} className="flex items-center gap-3">
                                    <span className="w-8 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {rating} ★
                                    </span>
                                    <div className="flex-1 h-4 rounded-full bg-gray-200 dark:bg-gray-700">
                                        <div
                                            className="h-4 rounded-full bg-amber-500 transition-all"
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                    <span className="w-8 text-sm text-gray-500 dark:text-gray-400 text-right">
                                        {count}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
