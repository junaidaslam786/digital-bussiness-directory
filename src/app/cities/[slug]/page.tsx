"use client";

import { use, useEffect } from "react";
import { notFound } from "next/navigation";
import { useLocationsStore } from "@/store/locations.api";
import { useBusinessesStore } from "@/store/businesses.api";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { EnterpriseCard } from "@/components/enterprise/EnterpriseCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { MapPin } from "lucide-react";
import { useState } from "react";
import type { Business } from "@/types/enterprise";

type SortOption = "relevance" | "name";
const SORT_OPTIONS = [
  { value: "relevance" as const, label: "Most Relevant" },
  { value: "name" as const, label: "Alphabetical" },
];
function sortEnterprises(list: Business[], sort: SortOption): Business[] {
  if (sort === "name") return [...list].sort((a, b) => a.name.localeCompare(b.name));
  return list;
}

export default function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { cities, citiesLoading, fetchCities } = useLocationsStore();
  const { businesses, listLoading: businessesLoading, fetchBusinesses } = useBusinessesStore();
  const [sortBy, setSortBy] = useState<SortOption>("relevance");

  useEffect(() => {
    fetchCities();
    fetchBusinesses();
  }, [fetchCities, fetchBusinesses]);

  const city = cities.find((c) => c.id === slug);

  if (!citiesLoading && !city && cities.length > 0) {
    notFound();
  }

  if (citiesLoading || !city) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="mb-4 h-6 w-48" />
        <Skeleton className="mb-8 h-16 w-full" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  // Filter enterprises by city
  const cityEnterprises = businesses.filter((e) => e.cityId === city.id);

  // Sort enterprises
  const sortedEnterprises = sortEnterprises(cityEnterprises, sortBy);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Cities", href: "/cities" },
          { label: city.name, href: `/cities/${city.id}` },
        ]}
      />

      {/* Header */}
      <div className="mb-8 mt-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <MapPin className="h-8 w-8 text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                {city.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">{city.country?.name ?? ""}</p>
              <p className="mt-1 text-sm text-gray-500">
                {sortedEnterprises.length}{" "}
                {sortedEnterprises.length === 1 ? "business" : "businesses"}
              </p>
            </div>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Enterprises Grid */}
      {sortedEnterprises.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedEnterprises.map((enterprise) => (
            <EnterpriseCard key={enterprise.id} enterprise={enterprise} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-gray-500">No businesses found in this city.</p>
        </div>
      )}
    </div>
  );
}
