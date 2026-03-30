"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useAdminStore } from "@/store/admin.api";
import {
    Search,
    Star,
    ThumbsUp,
    Trash2,
    MessageSquare,
    Filter,
    Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "@/lib/time";

export default function ReviewsPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const { reviews, reviewsLoading, fetchReviews, deleteReview } = useAdminStore();

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    const filteredReviews = reviews.filter(
        (review) =>
            review.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (review.business?.name ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.comment?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const avgRating =
        reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;
    const positiveReviews = reviews.filter((r) => r.rating >= 4).length;
    const negativeReviews = reviews.filter((r) => r.rating <= 2).length;

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this review?")) return;
        try { await deleteReview(id); } catch {}
    };

    if (reviewsLoading && reviews.length === 0) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Reviews
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Manage all customer reviews
                    </p>
                </div>
            </div>

            {/* Search & Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search reviews..."
                                    className="pl-10"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" />
                            Filters
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Total Reviews
                        </div>
                        <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                            {filteredReviews.length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Avg Rating
                        </div>
                        <div className="mt-1 text-2xl font-bold text-amber-600 dark:text-amber-400">
                            {avgRating.toFixed(1)} ★
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Positive
                        </div>
                        <div className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {positiveReviews}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Negative
                        </div>
                        <div className="mt-1 text-2xl font-bold text-red-600 dark:text-red-400">
                            {negativeReviews}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {filteredReviews.map((review) => (
                    <Card key={review.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                            {review.authorName.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {review.authorName}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                reviewed{" "}
                                                <span className="font-medium text-blue-600 dark:text-blue-400">
                                                    {review.business?.name ?? "Unknown"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-3 flex items-center space-x-2">
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
                                            {formatDistanceToNow(new Date(review.createdAt))}
                                        </span>
                                    </div>

                                    <p className="mt-3 text-gray-700 dark:text-gray-300">
                                        {review.comment}
                                    </p>
                                </div>

                                <div className="ml-4 flex flex-col items-end gap-2">
                                    <Badge
                                        className={
                                            review.rating >= 4
                                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                : review.rating <= 2
                                                    ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                                    : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                                        }
                                    >
                                        {review.rating >= 4
                                            ? "Positive"
                                            : review.rating <= 2
                                                ? "Negative"
                                                : "Neutral"}
                                    </Badge>
                                    <div className="flex items-center gap-1">
                                        <Button variant="ghost" size="sm">
                                            <ThumbsUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => handleDelete(review.id)}>
                                            <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
