"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/common/SearchBar";
import { EnterpriseCard } from "@/components/enterprise/EnterpriseCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import { searchEnterprises, sortEnterprises } from "@/lib/search";
import { enterprises } from "@/data/enterprises.mock";
import { categories } from "@/data/categories.mock";
import { cities } from "@/data/cities.mock";
import { SORT_OPTIONS, PRICE_RANGES, EMPLOYEE_RANGES } from "@/lib/constants";
import { SearchFilters, SortOption } from "@/lib/search";
import { Filter, X, ChevronDown } from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get("q") || "",
    categories: searchParams.get("category") ? [searchParams.get("category")!] : [],
    cities: searchParams.get("city") ? [searchParams.get("city")!] : [],
    priceRanges: [],
    employeeRanges: [],
    verified: searchParams.get("verified") === "true",
    minRating: undefined,
  });
  const [sortBy, setSortBy] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) || "relevance"
  );
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState(enterprises);

  useEffect(() => {
    const filtered = searchEnterprises(enterprises, filters);
    const sorted = sortEnterprises(filtered, sortBy);
    setResults(sorted);
  }, [filters, sortBy]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: "categories" | "cities" | "priceRanges" | "employeeRanges", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const clearFilters = () => {
    setFilters({
      query: "",
      categories: [],
      cities: [],
      priceRanges: [],
      employeeRanges: [],
      verified: false,
      minRating: undefined,
    });
  };

  const activeFilterCount =
    filters.categories.length +
    filters.cities.length +
    filters.priceRanges.length +
    filters.employeeRanges.length +
    (filters.verified ? 1 : 0) +
    (filters.minRating ? 1 : 0);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Filters Sidebar */}
        <aside
          className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}
        >
          <div className="sticky top-20 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Filters
              </h2>
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs"
                >
                  Clear All
                </Button>
              )}
            </div>

            {/* Categories */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.slice(0, 8).map((category) => (
                  <label
                    key={category.slug}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category.slug)}
                      onChange={() => toggleArrayFilter("categories", category.slug)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      {category.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Cities */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                Cities
              </h3>
              <div className="space-y-2">
                {cities.slice(0, 8).map((city) => (
                  <label
                    key={city.slug}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={filters.cities.includes(city.nameEn)}
                      onChange={() => toggleArrayFilter("cities", city.nameEn)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      {city.nameEn}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Verified Only */}
            <div>
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={filters.verified}
                  onChange={(e) => handleFilterChange("verified", e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Verified Only
                </span>
              </label>
            </div>

            {/* Minimum Rating */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                Minimum Rating
              </h3>
              <Input
                type="number"
                min="0"
                max="5"
                step="0.5"
                value={filters.minRating || ""}
                onChange={(e) =>
                  handleFilterChange(
                    "minRating",
                    e.target.value ? parseFloat(e.target.value) : undefined
                  )
                }
                placeholder="e.g., 4.0"
              />
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
              {/* Mobile Filter Toggle */}
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

          {/* Active Filters */}
          {activeFilterCount > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {filters.categories.map((slug) => {
                const category = categories.find((c) => c.slug === slug);
                return (
                  <Badge key={slug} variant="secondary">
                    {category?.name}
                    <button
                      onClick={() => toggleArrayFilter("categories", slug)}
                      className="ml-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                );
              })}
              {filters.cities.map((city) => (
                <Badge key={city} variant="secondary">
                  {city}
                  <button
                    onClick={() => toggleArrayFilter("cities", city)}
                    className="ml-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {filters.verified && (
                <Badge variant="secondary">
                  Verified
                  <button
                    onClick={() => handleFilterChange("verified", false)}
                    className="ml-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}

          {/* Results Grid */}
          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {results.map((enterprise) => (
                <EnterpriseCard key={enterprise.slug} enterprise={enterprise} />
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
