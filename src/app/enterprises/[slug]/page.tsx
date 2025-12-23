"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { enterprises } from "@/data/enterprises.mock";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { RatingStars } from "@/components/common/RatingStars";
import { TagPills } from "@/components/common/TagPills";
import { GalleryCarousel } from "@/components/enterprise/GalleryCarousel";
import { ContactPanel } from "@/components/enterprise/ContactPanel";
import { BusinessHoursTable } from "@/components/enterprise/BusinessHoursTable";
import { ReviewsSection } from "@/components/enterprise/ReviewsSection";
import { RelatedBusinesses } from "@/components/enterprise/RelatedBusinesses";
import { OwnerInfo } from "@/components/enterprise/OwnerInfo";
import { BusinessCard } from "@/components/enterprise/BusinessCard";
import { Heart, GitCompare, Share2, MapPin, Users, Calendar, Award } from "lucide-react";
import { useFavoritesStore } from "@/store/favorites.store";
import { useCompareStore } from "@/store/compare.store";
import { formatCurrency, formatDate } from "@/lib/format";
import { getEnterpriseGallery, getCategoryImage } from "@/lib/images";
import { useState } from "react";
import Image from "next/image";

export default function EnterprisePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const enterprise = enterprises.find((e) => e.slug === slug);
  const [activeTab, setActiveTab] = useState<"overview" | "services" | "reviews">("overview");

  if (!enterprise) {
    notFound();
  }

  // Use enterprise gallery if available, otherwise generate placeholder images
  const galleryImages = enterprise.gallery.length > 0 
    ? enterprise.gallery 
    : getEnterpriseGallery(
        enterprise.id,
        enterprise.categories[0].slug,
        3
      );

  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const { addToCompare, removeFromCompare, isInCompare, canAddMore } = useCompareStore();

  const favorite = isFavorite(enterprise.slug);
  const inCompare = isInCompare(enterprise.slug);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(enterprise.slug);
    } else {
      addFavorite(enterprise.slug);
    }
  };

  const handleCompareClick = () => {
    if (inCompare) {
      removeFromCompare(enterprise.slug);
    } else if (canAddMore()) {
      addToCompare(enterprise.slug);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Search", href: "/search" },
          { label: enterprise.name, href: `/enterprises/${enterprise.slug}` },
        ]}
      />

      {/* Header */}
      <div className="mb-8 mt-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          {/* Enterprise Info - Left Side */}
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {enterprise.verified && <Badge variant="success">✓ Verified</Badge>}
              {enterprise.categories.map((cat) => (
                <Badge key={cat.slug} variant="secondary">
                  {cat.name}
                </Badge>
              ))}
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              {enterprise.name}
            </h1>
            {enterprise.legalName && enterprise.legalName !== enterprise.name && (
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                {enterprise.legalName}
              </p>
            )}
            <div className="mb-3 flex items-center space-x-2">
              <RatingStars rating={enterprise.ratingAvg} size="lg" showNumber />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ({enterprise.ratingCount} reviews)
              </span>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {enterprise.shortDescription}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={favorite ? "default" : "outline"}
              onClick={handleFavoriteClick}
            >
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
            <Button variant="outline">
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
          <GalleryCarousel images={galleryImages} />

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
                Reviews ({enterprise.ratingCount})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  About
                </h2>
                <p className="text-gray-700 dark:text-gray-300">{enterprise.description}</p>
              </div>

              {enterprise.tags.length > 0 && (
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                    Tags
                  </h3>
                  <TagPills tags={enterprise.tags} />
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                {enterprise.foundedYear && (
                  <Card>
                    <CardContent className="flex items-center space-x-3 p-4">
                      <Calendar className="h-8 w-8 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Founded</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {enterprise.foundedYear}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {enterprise.employeeRange && (
                  <Card>
                    <CardContent className="flex items-center space-x-3 p-4">
                      <Users className="h-8 w-8 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Employees</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {enterprise.employeeRange}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardContent className="flex items-center space-x-3 p-4">
                    <MapPin className="h-8 w-8 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {enterprise.address.city}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {enterprise.priceRange && (
                  <Card>
                    <CardContent className="flex items-center space-x-3 p-4">
                      <Award className="h-8 w-8 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Price Range</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {"$".repeat(enterprise.priceRange)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {enterprise.certifications.length > 0 && (
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                    Certifications
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {enterprise.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "services" && (
            <div className="space-y-6">
              {enterprise.services.length > 0 && (
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                    Services
                  </h2>
                  <div className="space-y-3">
                    {enterprise.services.map((service, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {service.name}
                              </h3>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                {service.description}
                              </p>
                            </div>
                            {service.priceFrom && (
                              <Badge variant="outline">
                                From {formatCurrency(service.priceFrom)}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {enterprise.products.length > 0 && (
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                    Products
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {enterprise.products.map((product, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {product.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {product.description}
                          </p>
                          {product.sku && (
                            <p className="mt-2 text-xs text-gray-500">SKU: {product.sku}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {enterprise.services.length === 0 && enterprise.products.length === 0 && (
                <p className="text-center text-gray-500">
                  No services or products listed yet.
                </p>
              )}
            </div>
          )}

          {activeTab === "reviews" && <ReviewsSection enterpriseSlug={enterprise.slug} />}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <BusinessCard enterprise={enterprise} />
          {enterprise.owner && <OwnerInfo owner={enterprise.owner} />}
          <ContactPanel enterprise={enterprise} />
          <BusinessHoursTable hours={enterprise.hours} />
        </div>
      </div>

      {/* Related Businesses */}
      <div className="mt-12">
        <RelatedBusinesses currentEnterprise={enterprise} />
      </div>
    </div>
  );
}
