"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Star, MessageSquare, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default function ReviewsPage() {
    const reviews = [
        {
            id: "1",
            author: "John Kim",
            rating: 5,
            comment: "Excellent service and quality products! Very professional team.",
            createdAt: "2 days ago",
            replied: false,
        },
        {
            id: "2",
            author: "Sarah Lee",
            rating: 4,
            comment: "Great experience overall. Fast delivery and good communication.",
            createdAt: "5 days ago",
            replied: true,
        },
        {
            id: "3",
            author: "Mike Park",
            rating: 5,
            comment: "Highly recommended! Will definitely use their services again.",
            createdAt: "1 week ago",
            replied: true,
        },
    ];

    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Reviews
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    View and respond to customer reviews
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
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
                <Card>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Response Rate
                        </div>
                        <div className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {Math.round((reviews.filter((r) => r.replied).length / reviews.length) * 100)}%
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                {reviews.map((review) => (
                    <Card key={review.id}>
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                                            {review.author.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {review.author}
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
                                                    {review.createdAt}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-gray-700 dark:text-gray-300">
                                        {review.comment}
                                    </p>
                                </div>
                                {review.replied ? (
                                    <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                                        Replied
                                    </Badge>
                                ) : (
                                    <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                                        Pending
                                    </Badge>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
