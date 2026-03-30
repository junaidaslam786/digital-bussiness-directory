/**
 * Reviews API store – aligned with backend ReviewsController.
 *
 * Endpoints:
 *   GET  /reviews                     – list all reviews (optional businessId filter)
 *   GET  /reviews/business/:businessId – reviews for a specific business
 *   GET  /reviews/:id                 – get single review
 *   POST /reviews                     – create review (auth)
 *   PATCH /reviews/:id                – update review (auth)
 *   DELETE /reviews/:id               – delete review (auth)
 */

import { create } from "zustand";
import { apiFetch, buildQueryString } from "./api";
import type { Review, CreateReviewData, UpdateReviewData } from "@/types";
import type { ApiResponse, PaginatedResponse, PaginationMeta } from "@/types/api";

interface ReviewsState {
  reviews: Review[];
  meta: PaginationMeta | null;
  loading: boolean;
  error: string | null;
  currentReview: Review | null;

  fetchReviews: (params?: {
    businessId?: string;
    page?: number;
    limit?: number;
  }) => Promise<void>;
  fetchBusinessReviews: (
    businessId: string,
    page?: number,
    limit?: number,
  ) => Promise<void>;
  fetchReviewById: (id: string) => Promise<void>;
  createReview: (data: CreateReviewData) => Promise<Review>;
  updateReview: (id: string, data: UpdateReviewData) => Promise<Review>;
  deleteReview: (id: string) => Promise<void>;

  clearError: () => void;
  clearReviews: () => void;
}

export const useReviewsStore = create<ReviewsState>((set) => ({
  reviews: [],
  meta: null,
  loading: false,
  error: null,
  currentReview: null,

  fetchReviews: async (params) => {
    set({ loading: true, error: null });
    try {
      const qs = params
        ? buildQueryString(params as Record<string, unknown>)
        : "";
      const res = await apiFetch<PaginatedResponse<Review>>(
        `/reviews${qs}`,
        { skipAuth: true },
      );
      set({ reviews: res.data, meta: res.meta, loading: false });
    } catch (err) {
      set({ loading: false, error: (err as Error).message });
    }
  },

  fetchBusinessReviews: async (businessId, page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const qs = buildQueryString({ page, limit });
      const res = await apiFetch<PaginatedResponse<Review>>(
        `/reviews/business/${encodeURIComponent(businessId)}${qs}`,
        { skipAuth: true },
      );
      set({ reviews: res.data, meta: res.meta, loading: false });
    } catch (err) {
      set({ loading: false, error: (err as Error).message });
    }
  },

  fetchReviewById: async (id) => {
    try {
      const res = await apiFetch<ApiResponse<Review>>(
        `/reviews/${encodeURIComponent(id)}`,
        { skipAuth: true },
      );
      set({ currentReview: res.data });
    } catch (err) {
      set({ error: (err as Error).message });
    }
  },

  createReview: async (data) => {
    const res = await apiFetch<ApiResponse<Review>>("/reviews", {
      method: "POST",
      body: data,
    });
    set((s) => ({ reviews: [res.data, ...s.reviews] }));
    return res.data;
  },

  updateReview: async (id, data) => {
    const res = await apiFetch<ApiResponse<Review>>(
      `/reviews/${encodeURIComponent(id)}`,
      { method: "PATCH", body: data },
    );
    set((s) => ({
      reviews: s.reviews.map((r) => (r.id === id ? res.data : r)),
      currentReview:
        s.currentReview?.id === id ? res.data : s.currentReview,
    }));
    return res.data;
  },

  deleteReview: async (id) => {
    await apiFetch(`/reviews/${encodeURIComponent(id)}`, { method: "DELETE" });
    set((s) => ({
      reviews: s.reviews.filter((r) => r.id !== id),
    }));
  },

  clearError: () => set({ error: null }),
  clearReviews: () => set({ reviews: [], meta: null }),
}));

// ── Selectors ──
export const selectReviews = (s: ReviewsState) => s.reviews;
export const selectReviewsMeta = (s: ReviewsState) => s.meta;
export const selectReviewsLoading = (s: ReviewsState) => s.loading;
export const selectReviewsError = (s: ReviewsState) => s.error;
export const selectCurrentReview = (s: ReviewsState) => s.currentReview;

export const selectAverageRating = (s: ReviewsState) => {
  if (s.reviews.length === 0) return 0;
  const total = s.reviews.reduce((sum, r) => sum + r.rating, 0);
  return Math.round((total / s.reviews.length) * 10) / 10;
};

export const selectReviewCount = (s: ReviewsState) =>
  s.meta?.total ?? s.reviews.length;
