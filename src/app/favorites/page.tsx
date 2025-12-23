"use client";

import { EnterpriseCard } from "@/components/enterprise/EnterpriseCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useFavoritesStore } from "@/store/favorites.store";
import { enterprises } from "@/data/enterprises.mock";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);

  const favoriteEnterprises = enterprises.filter((e) =>
    favoriteIds.includes(e.slug)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Favorites", href: "/favorites" },
        ]}
      />

      <div className="mb-8 mt-4">
        <div className="flex items-center space-x-3">
          <Heart className="h-10 w-10 text-red-500" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              My Favorites
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {favoriteEnterprises.length}{" "}
              {favoriteEnterprises.length === 1 ? "business" : "businesses"} saved
            </p>
          </div>
        </div>
      </div>

      {favoriteEnterprises.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favoriteEnterprises.map((enterprise) => (
            <EnterpriseCard key={enterprise.slug} enterprise={enterprise} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No favorites yet"
          description="Start exploring and save your favorite businesses to see them here"
        />
      )}
    </div>
  );
}
