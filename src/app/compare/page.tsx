"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useCompareStore } from "@/store/compare.store";
import { useBusinessesStore } from "@/store/businesses.api";
import { GitCompare, X, MapPin } from "lucide-react";
import Link from "next/link";
import { formatPhoneNumber } from "@/lib/format";
import { getOpenStatus } from "@/lib/time";

export default function ComparePage() {
  const { compareIds, removeFromCompare, clearCompare } = useCompareStore();
  const { businesses, listLoading, fetchBusinesses } = useBusinessesStore();

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  const compareEnterprises = businesses.filter((e) =>
    compareIds.includes(e.id)
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
        <Button variant="outline" onClick={clearCompare}>
          Clear All
        </Button>
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
                  key={enterprise.id}
                  className="border-b-2 border-gray-200 bg-gray-50 p-4 text-left dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="flex items-start justify-between">
                    <Link
                      href={`/enterprises/${enterprise.id}`}
                      className="font-semibold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                    >
                      {enterprise.name}
                    </Link>
                    <button
                      onClick={() => removeFromCompare(enterprise.id)}
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
            {/* Category */}
            <tr>
              <td className="border-b border-gray-200 p-4 font-medium text-gray-700 dark:border-gray-800 dark:text-gray-300">
                Category
              </td>
              {compareEnterprises.map((enterprise) => (
                <td
                  key={enterprise.id}
                  className="border-b border-gray-200 p-4 dark:border-gray-800"
                >
                  {enterprise.category && (
                    <Badge variant="secondary">{enterprise.category.name}</Badge>
                  )}
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
                  key={enterprise.id}
                  className="border-b border-gray-200 p-4 text-sm dark:border-gray-800"
                >
                  <div className="flex items-start space-x-2">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                    <span>{enterprise.address ?? "N/A"}</span>
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
                const status = enterprise.businessHours
                  ? getOpenStatus(enterprise.businessHours)
                  : { isOpen: false, message: "Hours not available" };
                return (
                  <td
                    key={enterprise.id}
                    className="border-b border-gray-200 p-4 dark:border-gray-800"
                  >
                    <Badge variant={status.isOpen ? "success" : "destructive"}>
                      {status.isOpen ? "Open Now" : "Closed"}
                    </Badge>
                  </td>
                );
              })}
            </tr>

            {/* Approved */}
            <tr>
              <td className="border-b border-gray-200 p-4 font-medium text-gray-700 dark:border-gray-800 dark:text-gray-300">
                Approved
              </td>
              {compareEnterprises.map((enterprise) => (
                <td
                  key={enterprise.id}
                  className="border-b border-gray-200 p-4 dark:border-gray-800"
                >
                  {enterprise.isApproved ? (
                    <Badge variant="success">Approved</Badge>
                  ) : (
                    <span className="text-sm text-gray-500">Pending</span>
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
                  key={enterprise.id}
                  className="border-b border-gray-200 p-4 text-sm dark:border-gray-800"
                >
                  {enterprise.phone ? (
                    <a
                      href={`tel:${enterprise.phone}`}
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {formatPhoneNumber(enterprise.phone)}
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
                  key={enterprise.id}
                  className="border-b border-gray-200 p-4 text-sm dark:border-gray-800"
                >
                  {enterprise.website ? (
                    <a
                      href={enterprise.website}
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
