"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Heart, MapPin, Phone, GitCompare, Building2 } from "lucide-react";
import { Enterprise } from "@/types";
import { useFavoritesStore } from "@/store/favorites.store";
import { useCompareStore } from "@/store/compare.store";
import { getOpenStatus } from "@/lib/time";
import { formatPhoneNumber } from "@/lib/format";

interface EnterpriseCardProps {
  enterprise: Enterprise;
}

export function EnterpriseCard({ enterprise }: EnterpriseCardProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const { addToCompare, removeFromCompare, isInCompare, canAddMore } = useCompareStore();

  const favorite = isFavorite(enterprise.id);
  const inCompare = isInCompare(enterprise.id);
  const openStatus = enterprise.businessHours ? getOpenStatus(enterprise.businessHours) : { isOpen: false, message: "Hours not available" };
  const primaryCategory = enterprise.category;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (favorite) {
      removeFavorite(enterprise.id);
    } else {
      addFavorite(enterprise.id);
    }
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inCompare) {
      removeFromCompare(enterprise.id);
    } else if (canAddMore()) {
      addToCompare(enterprise.id);
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/enterprises/${enterprise.id}`}>
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
          {enterprise.logoUrl ? (
            <img
              src={enterprise.logoUrl}
              alt={enterprise.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
              <Building2 className="h-16 w-16 text-gray-400 dark:text-gray-500" />
            </div>
          )}
          {/* Approved Badge */}
          {enterprise.isApproved && (
            <Badge className="absolute left-2 top-2">Approved</Badge>
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
          {primaryCategory && (
            <p className="mb-1 text-xs text-gray-500">
              {primaryCategory.name}
            </p>
          )}

          {/* Name */}
          <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
            {enterprise.name}
          </h3>



          {/* Description */}
          <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {enterprise.description}
          </p>

          {/* Meta Info */}
          <div className="space-y-1 text-xs text-gray-500">
            <div className="flex items-center">
              <MapPin className="mr-1.5 h-3.5 w-3.5" />
              <span className="line-clamp-1">{enterprise.address ?? ""}</span>
            </div>
            {enterprise.phone && (
              <div className="flex items-center">
                <Phone className="mr-1.5 h-3.5 w-3.5" />
                <span>{formatPhoneNumber(enterprise.phone)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Link>

      <CardFooter className="border-t border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-2">
            {enterprise.isApproved && (
              <Badge variant="success" className="text-xs">
                Approved
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
