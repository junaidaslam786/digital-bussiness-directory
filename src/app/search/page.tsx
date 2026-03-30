"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/common/SearchBar";
import { EnterpriseCard } from "@/components/enterprise/EnterpriseCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { useSearchStore } from "@/store/search.api";
import { useCategoriesStore } from "@/store/categories.api";
import { useLocationsStore } from "@/store/locations.api";
import type { SearchParams as ApiSearchParams } from "@/types/api";
import { Filter, X } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const { results, loading: searchLoading, search } = useSearchStore();
  const { categories, fetchCategories } = useCategoriesStore();
  const { cities, fetchCities } = useLocationsStore();

  const [filters, setFilters] = useState<ApiSearchParams>({
    q: searchParams.get("q") || "",
    categoryId: searchParams.get("category") || undefined,
    cityId: searchParams.get("city") || undefined,
    sortBy: (searchParams.get("sort") as "relevance" | "name") || "relevance",
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchCities();
  }, [fetchCategories, fetchCities]);

  useEffect(() => {
    search(filters);
  }, [filters, search]);

  const activeFilterCount =
    (filters.categoryId ? 1 : 0) + (filters.cityId ? 1 : 0);

  const clearFilters = () => {
    setFilters({ q: filters.q, sortBy: filters.sortBy });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Filters Sidebar */}
        <aside className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
          <div className="sticky top-20 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Filters
              </h2>
              {activeFilterCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
                  Clear All
                </Button>
              )}
            </div>

            {/* Categories */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                Category
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center space-x-2 text-sm">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.categoryId === category.id}
                      onChange={() =>
                        setFilters((prev) => ({
                          ...prev,
                          categoryId: prev.categoryId === category.id ? undefined : category.id,
                        }))
                      }
                      className="rounded border-gray-300"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Cities */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                City
              </h3>
              <div className="space-y-2">
                {cities.map((city) => (
                  <label key={city.id} className="flex items-center space-x-2 text-sm">
                    <input
                      type="radio"
                      name="city"
                      checked={filters.cityId === city.id}
                      onChange={() =>
                        setFilters((prev) => ({
                          ...prev,
                          cityId: prev.cityId === city.id ? undefined : city.id,
                        }))
                      }
                      className="rounded border-gray-300"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{city.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <main className="flex-1">
          {/* Results Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Search Results
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {results.length} {results.length === 1 ? "business" : "businesses"} found
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge className="ml-2">{activeFilterCount}</Badge>
                )}
              </Button>

              <select
                value={filters.sortBy || "relevance"}
                onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as "relevance" | "name" }))}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
              >
                <option value="relevance">Relevance</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilterCount > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {filters.categoryId && (
                <Badge variant="secondary">
                  {categories.find((c) => c.id === filters.categoryId)?.name}
                  <button
                    onClick={() => setFilters((p) => ({ ...p, categoryId: undefined }))}
                    className="ml-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.cityId && (
                <Badge variant="secondary">
                  {cities.find((c) => c.id === filters.cityId)?.name}
                  <button
                    onClick={() => setFilters((p) => ({ ...p, cityId: undefined }))}
                    className="ml-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}

          {/* Results Grid */}
          {searchLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-lg" />
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {results.map((enterprise) => (
                <EnterpriseCard key={enterprise.id} enterprise={enterprise} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No businesses found"
              description="Try adjusting your filters or search query"
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8"><Skeleton className="h-96 w-full" /></div>}>
      <SearchContent />
    </Suspense>
  );
}
