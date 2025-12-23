"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories.mock";
import { enterprises } from "@/data/enterprises.mock";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { EnterpriseCard } from "@/components/enterprise/EnterpriseCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SORT_OPTIONS } from "@/lib/constants";
import { sortEnterprises, SortOption } from "@/lib/search";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const category = categories.find((c) => c.slug === slug);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");

  if (!category) {
    notFound();
  }

  // Get icon component
  const IconComponent = (Icons[category.icon as keyof typeof Icons] as LucideIcon) || Icons.Building2;

  // Filter enterprises by category
  const categoryEnterprises = enterprises.filter((e) =>
    e.categories.some((c) => c.slug === category.slug)
  );

  // Sort enterprises
  const sortedEnterprises = sortEnterprises(categoryEnterprises, sortBy);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: category.name, href: `/categories/${category.slug}` },
        ]}
      />

      {/* Header */}
      <div className="mb-8 mt-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <IconComponent className="h-8 w-8 text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                {category.name}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {category.description}
              </p>
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
            <EnterpriseCard key={enterprise.slug} enterprise={enterprise} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-gray-500">No businesses found in this category.</p>
        </div>
      )}
    </div>
  );
}
