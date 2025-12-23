import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  className?: string;
}

export function RatingStars({
  rating,
  maxRating = 5,
  size = "md",
  showNumber = false,
  className,
}: RatingStarsProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < maxRating; i++) {
    if (i < fullStars) {
      stars.push(
        <Star
          key={i}
          className={cn(sizeClasses[size], "fill-yellow-400 text-yellow-400")}
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <StarHalf
          key={i}
          className={cn(sizeClasses[size], "fill-yellow-400 text-yellow-400")}
        />
      );
    } else {
      stars.push(
        <Star
          key={i}
          className={cn(sizeClasses[size], "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700")}
        />
      );
    }
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {stars}
      {showNumber && (
        <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
