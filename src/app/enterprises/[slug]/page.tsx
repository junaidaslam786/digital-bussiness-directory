"use client";

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { useBusinessesStore } from "@/store/businesses.api";
import { useReviewsStore } from "@/store/reviews.api";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { RatingStars } from "@/components/common/RatingStars";
import { GalleryCarousel } from "@/components/enterprise/GalleryCarousel";
import { ContactPanel } from "@/components/enterprise/ContactPanel";
import { BusinessHoursTable } from "@/components/enterprise/BusinessHoursTable";
import { ReviewsSection } from "@/components/enterprise/ReviewsSection";
import { RelatedBusinesses } from "@/components/enterprise/RelatedBusinesses";
import { OwnerInfo } from "@/components/enterprise/OwnerInfo";
import { BusinessCard } from "@/components/enterprise/BusinessCard";
import { Heart, GitCompare, Share2, MapPin } from "lucide-react";
import { useFavoritesStore } from "@/store/favorites.store";
import { useCompareStore } from "@/store/compare.store";
import { formatCurrency } from "@/lib/format";

export default function EnterprisePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { currentBusiness: enterprise, detailLoading, detailError, fetchBusinessById, clearCurrentBusiness } = useBusinessesStore();
  const { reviews, loading: reviewsLoading, fetchBusinessReviews } = useReviewsStore();
  const [activeTab, setActiveTab] = useState<"overview" | "services" | "reviews">("overview");
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const { addToCompare, removeFromCompare, isInCompare, canAddMore } = useCompareStore();

  useEffect(() => {
    fetchBusinessById(slug);
    fetchBusinessReviews(slug);
    return () => { clearCurrentBusiness(); };
  }, [slug, fetchBusinessById, fetchBusinessReviews, clearCurrentBusiness]);

  if (detailLoading || !enterprise) {
    if (detailError) {
      notFound();
    }
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="mb-4 h-6 w-48" />
        <Skeleton className="mb-4 h-10 w-96" />
        <Skeleton className="mb-8 h-6 w-64" />
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  const enterpriseReviews = reviews;
  const avgRating =
    enterpriseReviews.length > 0
      ? enterpriseReviews.reduce((s, r) => s + r.rating, 0) / enterpriseReviews.length
      : 0;

  const favorite = isFavorite(enterprise.id);
  const inCompare = isInCompare(enterprise.id);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(enterprise.id);
    } else {
      addFavorite(enterprise.id);
    }
  };

  const handleCompareClick = () => {
    if (inCompare) {
      removeFromCompare(enterprise.id);
    } else if (canAddMore()) {
      addToCompare(enterprise.id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Search", href: "/search" },
          { label: enterprise.name, href: `/enterprises/${enterprise.id}` },
        ]}
      />

      {/* Header */}
      <div className="mb-8 mt-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {enterprise.isApproved && <Badge variant="success">Approved</Badge>}
              {enterprise.category && (
                <Badge variant="secondary">{enterprise.category.name}</Badge>
              )}
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              {enterprise.name}
            </h1>
            {enterpriseReviews.length > 0 && (
              <div className="mb-3 flex items-center space-x-2">
                <RatingStars rating={avgRating} size="lg" showNumber />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({enterpriseReviews.length} reviews)
                </span>
              </div>
            )}
            {enterprise.description && (
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {enterprise.description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant={favorite ? "default" : "outline"} onClick={handleFavoriteClick}>
              <Heart className={`mr-2 h-4 w-4 ${favorite ? "fill-current" : ""}`} />
              {favorite ? "Saved" : "Save"}
            </Button>
            <Button
              variant={inCompare ? "default" : "outline"}
              onClick={handleCompareClick}
              disabled={!inCompare && !canAddMore()}
            >
              <GitCompare className={`mr-2 h-4 w-4 ${inCompare ? "fill-current" : ""}`} />
              {inCompare ? "In Compare" : "Compare"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: enterprise.name, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-8 lg:col-span-2">
          {/* Gallery */}
          {enterprise.media && enterprise.media.length > 0 && (
            <GalleryCarousel images={enterprise.media} />
          )}

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-800">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`border-b-2 pb-4 text-sm font-medium transition-colors ${
                  activeTab === "overview"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("services")}
                className={`border-b-2 pb-4 text-sm font-medium transition-colors ${
                  activeTab === "services"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                Services & Products
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`border-b-2 pb-4 text-sm font-medium transition-colors ${
                  activeTab === "reviews"
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                Reviews ({enterpriseReviews.length})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {enterprise.description && (
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">About</h2>
                  <p className="text-gray-700 dark:text-gray-300">{enterprise.description}</p>
                </div>
              )}

              {enterprise.address && (
                <Card>
                  <CardContent className="flex items-center space-x-3 p-4">
                    <MapPin className="h-8 w-8 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {enterprise.address}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === "services" && (
            <div className="space-y-6">
              {enterprise.services && enterprise.services.length > 0 && (
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Services</h2>
                  <div className="space-y-3">
                    {enterprise.services.map((service) => (
                      <Card key={service.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {service.title}
                              </h3>
                              {service.description && (
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                  {service.description}
                                </p>
                              )}
                            </div>
                            {service.price != null && (
                              <Badge variant="outline">
                                From {formatCurrency(service.price)}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {enterprise.products && enterprise.products.length > 0 && (
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Products</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {enterprise.products.map((product) => (
                      <Card key={product.id}>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {product.name}
                          </h3>
                          {product.description && (
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                              {product.description}
                            </p>
                          )}
                          {product.sku && (
                            <p className="mt-2 text-xs text-gray-500">SKU: {product.sku}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {(!enterprise.services || enterprise.services.length === 0) &&
                (!enterprise.products || enterprise.products.length === 0) && (
                  <p className="text-center text-gray-500">
                    No services or products listed yet.
                  </p>
                )}
            </div>
          )}

          {activeTab === "reviews" && <ReviewsSection businessId={enterprise.id} />}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <BusinessCard enterprise={enterprise} />
          {enterprise.user && <OwnerInfo owner={enterprise.user} />}
          <ContactPanel enterprise={enterprise} />
          {enterprise.businessHours && enterprise.businessHours.length > 0 && (
            <BusinessHoursTable hours={enterprise.businessHours} />
          )}
        </div>
      </div>

      {/* Related Businesses */}
      <div className="mt-12">
        <RelatedBusinesses currentEnterprise={enterprise} />
      </div>
    </div>
  );
}
