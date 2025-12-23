import { Enterprise } from "@/types";

export interface SearchFilters {
  query?: string;
  categories?: string[];
  cities?: string[];
  city?: string;
  minRating?: number;
  openNow?: boolean;
  tags?: string[];
  priceRange?: number[];
  priceRanges?: number[][];
  employeeRanges?: string[];
  verified?: boolean;
}

export type SortOption = "relevance" | "rating" | "newest" | "alphabetical";

export function searchEnterprises(
  enterprises: Enterprise[],
  filters: SearchFilters
): Enterprise[] {
  let results = [...enterprises];

  // Text search
  if (filters.query && filters.query.trim()) {
    const query = filters.query.toLowerCase().trim();
    results = results.filter((e) => {
      const searchText = `
        ${e.name} 
        ${e.shortDescription} 
        ${e.description} 
        ${e.tags.join(" ")} 
        ${e.categories.map((c) => c.name).join(" ")} 
        ${e.address.city}
      `.toLowerCase();
      
      return searchText.includes(query);
    });
  }

  // Category filter
  if (filters.categories && filters.categories.length > 0) {
    results = results.filter((e) =>
      e.categories.some((c) => filters.categories!.includes(c.slug))
    );
  }

  // City filter
  if (filters.city) {
    results = results.filter(
      (e) => e.address.city.toLowerCase() === filters.city!.toLowerCase()
    );
  }

  // Rating filter
  if (filters.minRating) {
    results = results.filter((e) => e.ratingAvg >= filters.minRating!);
  }

  // Open now filter
  if (filters.openNow) {
    const now = new Date();
    const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
    const today = dayNames[now.getDay()];
    const currentTime = now.getHours() * 60 + now.getMinutes();

    results = results.filter((e) => {
      const todayHours = e.hours[today];
      if (todayHours.closed) return false;

      const [openHour, openMin] = todayHours.open.split(":").map(Number);
      const [closeHour, closeMin] = todayHours.close.split(":").map(Number);

      const openTime = openHour * 60 + openMin;
      const closeTime = closeHour * 60 + closeMin;

      return currentTime >= openTime && currentTime < closeTime;
    });
  }

  // Tags filter
  if (filters.tags && filters.tags.length > 0) {
    results = results.filter((e) =>
      filters.tags!.some((tag) =>
        e.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
      )
    );
  }

  // Price range filter
  if (filters.priceRange && filters.priceRange.length > 0) {
    results = results.filter(
      (e) => e.priceRange && filters.priceRange!.includes(e.priceRange)
    );
  }

  return results;
}

export function sortEnterprises(
  enterprises: Enterprise[],
  sortBy: SortOption
): Enterprise[] {
  const sorted = [...enterprises];

  switch (sortBy) {
    case "rating":
      return sorted.sort((a, b) => b.ratingAvg - a.ratingAvg);

    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

    case "alphabetical":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case "relevance":
    default:
      return sorted;
  }
}

export function getRelatedEnterprises(
  enterprise: Enterprise,
  allEnterprises: Enterprise[],
  limit: number = 6
): Enterprise[] {
  // Use manual relationships if available
  if (enterprise.relatedEnterpriseSlugs && enterprise.relatedEnterpriseSlugs.length > 0) {
    const related = allEnterprises.filter((e) =>
      enterprise.relatedEnterpriseSlugs!.includes(e.slug)
    );
    if (related.length >= limit) {
      return related.slice(0, limit);
    }
  }

  // Automatic fallback: find similar enterprises
  const related = allEnterprises
    .filter((e) => e.id !== enterprise.id)
    .map((e) => {
      let score = 0;

      // Same category = +10 points per match
      const sharedCategories = e.categories.filter((c) =>
        enterprise.categories.some((ec) => ec.id === c.id)
      );
      score += sharedCategories.length * 10;

      // Same city = +5 points
      if (e.address.city === enterprise.address.city) {
        score += 5;
      }

      // Shared tags = +2 points per tag
      const sharedTags = e.tags.filter((t) =>
        enterprise.tags.includes(t)
      );
      score += sharedTags.length * 2;

      return { enterprise: e, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.enterprise);

  return related;
}

export function getAutocompleteResults(
  query: string,
  enterprises: Enterprise[],
  limit: number = 5
): Array<{ type: "enterprise"; data: Enterprise }> {
  if (!query.trim()) return [];

  const q = query.toLowerCase();
  const results = enterprises
    .filter((e) => e.name.toLowerCase().includes(q))
    .slice(0, limit)
    .map((e) => ({ type: "enterprise" as const, data: e }));

  return results;
}
