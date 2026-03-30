"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { Star } from "lucide-react";
import { useEffect } from "react";
import { useBusinessesStore } from "@/store/businesses.api";
import { useReviewsStore } from "@/store/reviews.api";
import { formatRelativeTime } from "@/lib/format";

export default function ReviewsPage() {
    const { myBusinesses, myLoading, fetchMyBusinesses } = useBusinessesStore();
    const { reviews, loading: reviewsLoading, fetchBusinessReviews } = useReviewsStore();

    const business = myBusinesses[0];

    useEffect(() => {
        fetchMyBusinesses();
    }, [fetchMyBusinesses]);

    useEffect(() => {
        if (business?.id) {
            fetchBusinessReviews(business.id);
        }
    }, [business?.id, fetchBusinessReviews]);

    const avgRating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    if (myLoading || reviewsLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-64" />
                <div className="grid gap-4 md:grid-cols-2">
                    <Skeleton className="h-20 w-full rounded-lg" />
                    <Skeleton className="h-20 w-full rounded-lg" />
                </div>
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Reviews
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    View customer reviews
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Total Reviews
                        </div>
                        <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                            {reviews.length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Average Rating
                        </div>
                        <div className="mt-1 text-2xl font-bold text-amber-600 dark:text-amber-400">
                            {avgRating.toFixed(1)} ★
                        </div>
                    </CardContent>
                </Card>
            </div>

            {reviews.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Star className="h-12 w-12 text-gray-400" />
                        <p className="mt-4 text-gray-500 dark:text-gray-400">No reviews yet</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <Card key={review.id}>
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                                                {review.authorName.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white">
                                                    {review.authorName}
                                                </div>
                                                <div className="flex items-center space-x-2">
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
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        {formatRelativeTime(review.createdAt)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {review.comment && (
                                            <p className="mt-3 text-gray-700 dark:text-gray-300">
                                                {review.comment}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
