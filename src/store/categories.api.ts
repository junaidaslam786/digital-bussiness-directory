/**
 * Categories API store – aligned with backend CategoriesController.
 *
 * Endpoints:
 *   GET  /categories              – list categories (public)
 *   GET  /categories/:id          – get one category
 *   POST /categories              – create (admin)
 *   PATCH /categories/:id         – update (admin)
 *   DELETE /categories/:id        – soft-delete (admin)
 */

import { create } from "zustand";
import { apiFetch, buildQueryString } from "./api";
import type { Category, CreateCategoryData, UpdateCategoryData } from "@/types";
import type { ApiResponse, PaginatedResponse, PaginationMeta } from "@/types/api";

interface CategoriesState {
  categories: Category[];
  meta: PaginationMeta | null;
  loading: boolean;
  error: string | null;
  currentCategory: Category | null;

  fetchCategories: (params?: {
    page?: number;
    limit?: number;
    includeInactive?: boolean;
  }) => Promise<void>;
  fetchCategoryById: (id: string) => Promise<void>;
  createCategory: (data: CreateCategoryData) => Promise<Category>;
  updateCategory: (id: string, data: UpdateCategoryData) => Promise<Category>;
  deleteCategory: (id: string) => Promise<void>;

  clearError: () => void;
}

export const useCategoriesStore = create<CategoriesState>((set) => ({
  categories: [],
  meta: null,
  loading: false,
  error: null,
  currentCategory: null,

  fetchCategories: async (params) => {
    set({ loading: true, error: null });
    try {
      const qs = params
        ? buildQueryString(params as Record<string, unknown>)
        : "";
      const res = await apiFetch<PaginatedResponse<Category>>(
        `/categories${qs}`,
        { skipAuth: true },
      );
      set({ categories: res.data, meta: res.meta, loading: false });
    } catch (err) {
      set({ loading: false, error: (err as Error).message });
    }
  },

  fetchCategoryById: async (id) => {
    try {
      const res = await apiFetch<ApiResponse<Category>>(
        `/categories/${encodeURIComponent(id)}`,
        { skipAuth: true },
      );
      set({ currentCategory: res.data });
    } catch (err) {
      set({ error: (err as Error).message });
    }
  },

  createCategory: async (data) => {
    const res = await apiFetch<ApiResponse<Category>>("/categories", {
      method: "POST",
      body: data,
    });
    set((s) => ({ categories: [...s.categories, res.data] }));
    return res.data;
  },

  updateCategory: async (id, data) => {
    const res = await apiFetch<ApiResponse<Category>>(
      `/categories/${encodeURIComponent(id)}`,
      { method: "PATCH", body: data },
    );
    set((s) => ({
      categories: s.categories.map((c) => (c.id === id ? res.data : c)),
      currentCategory:
        s.currentCategory?.id === id ? res.data : s.currentCategory,
    }));
    return res.data;
  },

  deleteCategory: async (id) => {
    await apiFetch(`/categories/${encodeURIComponent(id)}`, { method: "DELETE" });
    set((s) => ({
      categories: s.categories.filter((c) => c.id !== id),
    }));
  },

  clearError: () => set({ error: null }),
}));

// ── Selectors ──
export const selectCategories = (s: CategoriesState) => s.categories;
export const selectActiveCategories = (s: CategoriesState) =>
  s.categories.filter((c) => c.isActive);
export const selectCategoriesLoading = (s: CategoriesState) => s.loading;
export const selectCategoriesError = (s: CategoriesState) => s.error;
export const selectCurrentCategory = (s: CategoriesState) => s.currentCategory;
