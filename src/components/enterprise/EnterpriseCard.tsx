"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { RatingStars } from "@/components/common/RatingStars";
import { Button } from "@/components/ui/Button";
import { Heart, MapPin, Phone, Clock, GitCompare } from "lucide-react";
import { Enterprise } from "@/types";
import { useFavoritesStore } from "@/store/favorites.store";
import { useCompareStore } from "@/store/compare.store";
import { getOpenStatus } from "@/lib/time";
import { formatPhoneNumber } from "@/lib/format";
import { getCategoryImage } from "@/lib/images";

interface EnterpriseCardProps {
  enterprise: Enterprise;
}

export function EnterpriseCard({ enterprise }: EnterpriseCardProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const { addToCompare, removeFromCompare, isInCompare, canAddMore } = useCompareStore();

  const favorite = isFavorite(enterprise.slug);
  const inCompare = isInCompare(enterprise.slug);
  const openStatus = getOpenStatus(enterprise.hours);
  const primaryCategory = enterprise.categories[0];

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (favorite) {
      removeFavorite(enterprise.slug);
    } else {
      addFavorite(enterprise.slug);
    }
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inCompare) {
      removeFromCompare(enterprise.slug);
    } else if (canAddMore()) {
      addToCompare(enterprise.slug);
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/enterprises/${enterprise.slug}`}>
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-200">
          <Image
            src={getCategoryImage(primaryCategory.slug, 800, 600)}
            alt={enterprise.name}
            width={800}
            height={600}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            unoptimized
          />
          {/* Verified Badge */}
          {enterprise.verified && (
            <Badge className="absolute left-2 top-2">Verified</Badge>
          )}
          {/* Open Status */}
          <Badge
            variant={openStatus.isOpen ? "success" : "destructive"}
            className="absolute right-2 top-2"
          >
            {openStatus.isOpen ? "Open" : "Closed"}
          </Badge>
        </div>

        <CardContent className="p-4">
          {/* Category */}
          <p className="mb-1 text-xs text-gray-500">
            {primaryCategory.name}
          </p>

          {/* Name */}
          <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
            {enterprise.name}
          </h3>

          {/* Rating */}
          <div className="mb-3 flex items-center space-x-2">
            <RatingStars rating={enterprise.ratingAvg} size="sm" showNumber />
            <span className="text-xs text-gray-500">
              ({enterprise.ratingCount})
            </span>
          </div>

          {/* Description */}
          <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {enterprise.description}
          </p>

          {/* Meta Info */}
          <div className="space-y-1 text-xs text-gray-500">
            <div className="flex items-center">
              <MapPin className="mr-1.5 h-3.5 w-3.5" />
              <span className="line-clamp-1">{enterprise.address.city}</span>
            </div>
            {enterprise.contact.phone && (
              <div className="flex items-center">
                <Phone className="mr-1.5 h-3.5 w-3.5" />
                <span>{formatPhoneNumber(enterprise.contact.phone)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Link>

      <CardFooter className="border-t border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-2">
            {enterprise.priceRange && (
              <Badge variant="outline" className="text-xs">
                {"$".repeat(enterprise.priceRange)}
              </Badge>
            )}
            {enterprise.verified && (
              <Badge variant="success" className="text-xs">
                Verified
              </Badge>
            )}
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavoriteClick}
              className="h-8 w-8"
            >
              <Heart
                className={`h-4 w-4 ${favorite ? 'fill-red-500 text-red-500' : ''}`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCompareClick}
              disabled={!inCompare && !canAddMore()}
              className="h-8 w-8"
            >
              <GitCompare
                className={`h-4 w-4 ${inCompare ? 'fill-blue-500 text-blue-500' : ''}`}
              />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
