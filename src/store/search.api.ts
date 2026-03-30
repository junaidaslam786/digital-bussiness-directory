/**
 * Search API store – aligned with backend SearchController.
 *
 * Endpoints:
 *   GET /search             – full-text search across businesses (public, throttled)
 *   GET /search/suggestions – autocomplete suggestions (public, throttled, cached)
 */

import { create } from "zustand";
import { apiFetch, buildQueryString } from "./api";
import type { Business } from "@/types";
import type { PaginatedResponse, PaginationMeta, SearchParams, SearchSuggestion, ApiResponse } from "@/types/api";

interface SearchState {
  results: Business[];
  meta: PaginationMeta | null;
  loading: boolean;
  error: string | null;

  suggestions: SearchSuggestion[];
  suggestionsLoading: boolean;

  search: (params: SearchParams) => Promise<void>;
  fetchSuggestions: (q: string) => Promise<void>;

  clearResults: () => void;
  clearSuggestions: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  results: [],
  meta: null,
  loading: false,
  error: null,

  suggestions: [],
  suggestionsLoading: false,

  search: async (params) => {
    set({ loading: true, error: null });
    try {
      const qs = buildQueryString(params as Record<string, unknown>);
      const res = await apiFetch<PaginatedResponse<Business>>(
        `/search${qs}`,
        { skipAuth: true },
      );
      set({ results: res.data, meta: res.meta, loading: false });
    } catch (err) {
      set({ loading: false, error: (err as Error).message });
    }
  },

  fetchSuggestions: async (q) => {
    if (!q || q.trim().length < 2) {
      set({ suggestions: [] });
      return;
    }
    set({ suggestionsLoading: true });
    try {
      const qs = buildQueryString({ q });
      const res = await apiFetch<ApiResponse<SearchSuggestion[]>>(
        `/search/suggestions${qs}`,
        { skipAuth: true },
      );
      set({ suggestions: res.data, suggestionsLoading: false });
    } catch {
      set({ suggestionsLoading: false, suggestions: [] });
    }
  },

  clearResults: () => set({ results: [], meta: null, error: null }),
  clearSuggestions: () => set({ suggestions: [] }),
}));

// ── Selectors ──
export const selectSearchResults = (s: SearchState) => s.results;
export const selectSearchMeta = (s: SearchState) => s.meta;
export const selectSearchLoading = (s: SearchState) => s.loading;
export const selectSearchError = (s: SearchState) => s.error;
export const selectSearchSuggestions = (s: SearchState) => s.suggestions;
export const selectSearchSuggestionsLoading = (s: SearchState) => s.suggestionsLoading;
