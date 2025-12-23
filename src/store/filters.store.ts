import { create } from "zustand";
import { SearchFilters, SortOption } from "@/lib/search";

interface FiltersState {
  filters: SearchFilters;
  sortBy: SortOption;
  setFilters: (filters: Partial<SearchFilters>) => void;
  setSortBy: (sortBy: SortOption) => void;
  resetFilters: () => void;
}

const initialFilters: SearchFilters = {
  query: "",
  categories: [],
  city: undefined,
  minRating: undefined,
  openNow: false,
  tags: [],
  priceRange: [],
};

export const useFiltersStore = create<FiltersState>((set) => ({
  filters: initialFilters,
  sortBy: "relevance",

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  setSortBy: (sortBy) => {
    set({ sortBy });
  },

  resetFilters: () => {
    set({ filters: initialFilters, sortBy: "relevance" });
  },
}));
