import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { RatingStars } from "@/components/common/RatingStars";
import { reviews } from "@/data/reviews.mock";
import { formatRelativeTime } from "@/lib/format";
import { User } from "lucide-react";

interface ReviewsSectionProps {
  enterpriseSlug: string;
}

export function ReviewsSection({ enterpriseSlug }: ReviewsSectionProps) {
  const enterpriseReviews = reviews.filter((r) => r.enterpriseSlug === enterpriseSlug);

  // Calculate rating distribution
  const distribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: enterpriseReviews.filter((r) => r.rating === rating).length,
    percentage:
      enterpriseReviews.length > 0
        ? (enterpriseReviews.filter((r) => r.rating === rating).length /
            enterpriseReviews.length) *
          100
        : 0,
  }));

  if (enterpriseReviews.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Customer Reviews
      </h2>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Rating Summary */}
        <Card>
          <CardContent className="py-6">
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-gray-900 dark:text-white">
                {(
                  enterpriseReviews.reduce((sum, r) => sum + r.rating, 0) /
                  enterpriseReviews.length
                ).toFixed(1)}
              </div>
              <RatingStars
                rating={
                  enterpriseReviews.reduce((sum, r) => sum + r.rating, 0) /
                  enterpriseReviews.length
                }
                size="lg"
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Based on {enterpriseReviews.length} reviews
              </p>
            </div>

            <div className="mt-6 space-y-2">
              {distribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="w-8 text-sm text-gray-600 dark:text-gray-400">
                    {rating}★
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                    <div
                      className="h-full bg-yellow-400"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-sm text-gray-600 dark:text-gray-400">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-4 lg:col-span-2">
          {enterpriseReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="py-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
                      <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {review.authorName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatRelativeTime(review.createdAt)}
                      </p>
                    </div>
                  </div>
                  <RatingStars rating={review.rating} size="sm" />
                </div>

                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  {review.comment}
                </p>

                {review.helpful > 0 && (
                  <div className="mt-4 flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      👍 {review.helpful} found this helpful
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
