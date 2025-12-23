"use client";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RatingStars } from "@/components/common/RatingStars";
import { useCompareStore } from "@/store/compare.store";
import { enterprises } from "@/data/enterprises.mock";
import { GitCompare, X, MapPin, Phone, Mail, Globe, Clock } from "lucide-react";
import Link from "next/link";
import { formatPhoneNumber } from "@/lib/format";
import { getOpenStatus } from "@/lib/time";

export default function ComparePage() {
  const { compareSlugs, removeFromCompare, clearCompare } = useCompareStore();

  const compareEnterprises = enterprises.filter((e) =>
    compareSlugs.includes(e.slug)
  );

  if (compareEnterprises.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Compare", href: "/compare" },
          ]}
        />
        <div className="mt-8">
          <EmptyState
            title="No businesses to compare"
            description="Add businesses to compare by clicking the compare icon on business cards"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Compare", href: "/compare" },
        ]}
      />

      <div className="mb-8 mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <GitCompare className="h-10 w-10 text-blue-500" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Compare Businesses
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Comparing {compareEnterprises.length}{" "}
              {compareEnterprises.length === 1 ? "business" : "businesses"}
            </p>
          </div>
        </div>
        {compareEnterprises.length > 0 && (
          <Button variant="outline" onClick={clearCompare}>
            Clear All
          </Button>
        )}
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-200 bg-gray-50 p-4 text-left text-sm font-semibold text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white">
                Feature
              </th>
              {compareEnterprises.map((enterprise) => (
                <th
                  key={enterprise.slug}
                  className="border-b-2 border-gray-200 bg-gray-50 p-4 text-left dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="flex items-start justify-between">
                    <Link
                      href={`/enterprises/${enterprise.slug}`}
                      className="font-semibold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                    >
                      {enterprise.name}
                    </Link>
                    <button
                      onClick={() => removeFromCompare(enterprise.slug)}
                      className="ml-2 text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Image */}
            <tr>
              <td className="border-b border-gray-200 p-4 font-medium text-gray-700 dark:border-gray-800 dark:text-gray-300">
                Image
              </td>
              {compareEnterprises.map((enterprise) => (
                <td
                  key={enterprise.slug}
                  className="border-b border-gray-200 p-4 dark:border-gray-800"
                >
                  {enterprise.gallery[0] && (
                    <img
                      src={enterprise.gallery[0].url}
                      alt={enterprise.gallery[0].alt}
                      className="h-32 w-full rounded-lg object-cover"
                    />
                  )}
                </td>
              ))}
            </tr>

            {/* Rating */}
            <tr>
              <td className="border-b border-gray-200 p-4 font-medium text-gray-700 dark:border-gray-800 dark:text-gray-300">
                Rating
              </td>
              {compareEnterprises.map((enterprise) => (
                <td
                  key={enterprise.slug}
                  className="border-b border-gray-200 p-4 dark:border-gray-800"
                >
                  <RatingStars rating={enterprise.ratingAvg} showNumber />
                  <div className="mt-1 text-xs text-gray-500">
                    {enterprise.ratingCount} reviews
                  </div>
                </td>
              ))}
            </tr>

            {/* Category */}
            <tr>
              <td className="border-b border-gray-200 p-4 font-medium text-gray-700 dark:border-gray-800 dark:text-gray-300">
                Category
              </td>
              {compareEnterprises.map((enterprise) => (
                <td
                  key={enterprise.slug}
                  className="border-b border-gray-200 p-4 dark:border-gray-800"
                >
                  <div className="flex flex-wrap gap-1">
                    {enterprise.categories.map((cat) => (
                      <Badge key={cat.slug} variant="secondary">
                        {cat.name}
                      </Badge>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Location */}
            <tr>
              <td className="border-b border-gray-200 p-4 font-medium text-gray-700 dark:border-gray-800 dark:text-gray-300">
                Location
              </td>
              {compareEnterprises.map((enterprise) => (
                <td
                  key={enterprise.slug}
                  className="border-b border-gray-200 p-4 text-sm dark:border-gray-800"
                >
                  <div className="flex items-start space-x-2">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                    <span>{enterprise.address.city}</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Status */}
            <tr>
              <td className="border-b border-gray-200 p-4 font-medium text-gray-700 dark:border-gray-800 dark:text-gray-300">
                Status
              </td>
              {compareEnterprises.map((enterprise) => {
                const status = getOpenStatus(enterprise.hours);
                return (
                  <td
                    key={enterprise.slug}
                    className="border-b border-gray-200 p-4 dark:border-gray-800"
                  >
                    <Badge variant={status.isOpen ? "success" : "destructive"}>
                      {status.isOpen ? "Open Now" : "Closed"}
                    </Badge>
                  </td>
                );
              })}
            </tr>

            {/* Verified */}
            <tr>
              <td className="border-b border-gray-200 p-4 font-medium text-gray-700 dark:border-gray-800 dark:text-gray-300">
                Verified
              </td>
              {compareEnterprises.map((enterprise) => (
                <td
                  key={enterprise.slug}
                  className="border-b border-gray-200 p-4 dark:border-gray-800"
                >
                  {enterprise.verified ? (
                    <Badge variant="success">✓ Verified</Badge>
                  ) : (
                    <span className="text-sm text-gray-500">Not verified</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Price Range */}
            <tr>
              <td className="border-b border-gray-200 p-4 font-medium text-gray-700 dark:border-gray-800 dark:text-gray-300">
                Price Range
              </td>
              {compareEnterprises.map((enterprise) => (
                <td
                  key={enterprise.slug}
                  className="border-b border-gray-200 p-4 dark:border-gray-800"
                >
                  {enterprise.priceRange ? (
                    <span className="text-lg">{"$".repeat(enterprise.priceRange)}</span>
                  ) : (
                    <span className="text-sm text-gray-500">N/A</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Phone */}
            <tr>
              <td className="border-b border-gray-200 p-4 font-medium text-gray-700 dark:border-gray-800 dark:text-gray-300">
                Phone
              </td>
              {compareEnterprises.map((enterprise) => (
                <td
                  key={enterprise.slug}
                  className="border-b border-gray-200 p-4 text-sm dark:border-gray-800"
                >
                  {enterprise.contact.phone ? (
                    <a
                      href={`tel:${enterprise.contact.phone}`}
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {formatPhoneNumber(enterprise.contact.phone)}
                    </a>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Website */}
            <tr>
              <td className="border-b border-gray-200 p-4 font-medium text-gray-700 dark:border-gray-800 dark:text-gray-300">
                Website
              </td>
              {compareEnterprises.map((enterprise) => (
                <td
                  key={enterprise.slug}
                  className="border-b border-gray-200 p-4 text-sm dark:border-gray-800"
                >
                  {enterprise.contact.website ? (
                    <a
                      href={enterprise.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Visit Website
                    </a>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
