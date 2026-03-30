/**
 * Businesses API store – aligned with backend BusinessesController endpoints.
 *
 * Public endpoints:
 *   GET  /businesses              – list approved/active/subscribed businesses
 *   GET  /businesses/:id          – business detail with relations
 *   GET  /businesses/mine         – owner's own listings (auth)
 *   POST /businesses              – create listing (auth)
 *   PATCH /businesses/:id         – update listing (auth + owner)
 *   DELETE /businesses/:id        – delete listing (auth + owner)
 *   PATCH /businesses/:id/activate    – owner activate
 *   PATCH /businesses/:id/deactivate  – owner deactivate
 *   POST /businesses/:id/logo     – upload logo (auth + owner)
 *
 * Sub-resource endpoints (products, services, media, branches, hours, socials, card)
 * are also exposed here to keep one consolidated store per domain.
 */

import { create } from "zustand";
import { apiFetch, buildQueryString } from "./api";
import type {
  Business,
  BusinessFilters,
  CreateBusinessData,
  UpdateBusinessData,
  BusinessProduct,
  CreateBusinessProductData,
  UpdateBusinessProductData,
  BusinessService,
  CreateBusinessServiceData,
  UpdateBusinessServiceData,
  BusinessBranch,
  CreateBusinessBranchData,
  UpdateBusinessBranchData,
  BusinessHour,
  CreateBusinessHourData,
  UpdateBusinessHourData,
  BusinessSocial,
  CreateBusinessSocialData,
  UpdateBusinessSocialData,
  BusinessMedia,
  BusinessCard,
} from "@/types";
import type { ApiResponse, PaginatedResponse, PaginationMeta } from "@/types/api";

// ────────────────────────────────────────────────────────
// State
// ────────────────────────────────────────────────────────

interface BusinessesState {
  // List
  businesses: Business[];
  listMeta: PaginationMeta | null;
  listLoading: boolean;
  listError: string | null;

  // Detail
  currentBusiness: Business | null;
  detailLoading: boolean;
  detailError: string | null;

  // My listings (owner)
  myBusinesses: Business[];
  myMeta: PaginationMeta | null;
  myLoading: boolean;
  myError: string | null;

  // Actions – list
  fetchBusinesses: (filters?: BusinessFilters) => Promise<void>;
  fetchBusinessById: (id: string) => Promise<void>;
  fetchMyBusinesses: (page?: number, limit?: number) => Promise<void>;

  // Actions – mutations
  createBusiness: (data: CreateBusinessData) => Promise<Business>;
  updateBusiness: (id: string, data: UpdateBusinessData) => Promise<Business>;
  deleteBusiness: (id: string) => Promise<void>;
  activateBusiness: (id: string) => Promise<Business>;
  deactivateBusiness: (id: string) => Promise<Business>;
  uploadLogo: (id: string, file: File) => Promise<Business>;

  // Sub-resources: products
  fetchProducts: (businessId: string) => Promise<BusinessProduct[]>;
  createProduct: (businessId: string, data: CreateBusinessProductData) => Promise<BusinessProduct>;
  updateProduct: (businessId: string, productId: string, data: UpdateBusinessProductData) => Promise<BusinessProduct>;
  deleteProduct: (businessId: string, productId: string) => Promise<void>;

  // Sub-resources: services
  fetchServices: (businessId: string) => Promise<BusinessService[]>;
  createService: (businessId: string, data: CreateBusinessServiceData) => Promise<BusinessService>;
  updateService: (businessId: string, serviceId: string, data: UpdateBusinessServiceData) => Promise<BusinessService>;
  deleteService: (businessId: string, serviceId: string) => Promise<void>;

  // Sub-resources: branches
  fetchBranches: (businessId: string) => Promise<BusinessBranch[]>;
  createBranch: (businessId: string, data: CreateBusinessBranchData) => Promise<BusinessBranch>;
  updateBranch: (businessId: string, branchId: string, data: UpdateBusinessBranchData) => Promise<BusinessBranch>;
  deleteBranch: (businessId: string, branchId: string) => Promise<void>;

  // Sub-resources: hours
  fetchHours: (businessId: string) => Promise<BusinessHour[]>;
  createHour: (businessId: string, data: CreateBusinessHourData) => Promise<BusinessHour>;
  updateHour: (businessId: string, hourId: string, data: UpdateBusinessHourData) => Promise<BusinessHour>;
  deleteHour: (businessId: string, hourId: string) => Promise<void>;

  // Sub-resources: socials
  fetchSocials: (businessId: string) => Promise<BusinessSocial[]>;
  createSocial: (businessId: string, data: CreateBusinessSocialData) => Promise<BusinessSocial>;
  updateSocial: (businessId: string, socialId: string, data: UpdateBusinessSocialData) => Promise<BusinessSocial>;
  deleteSocial: (businessId: string, socialId: string) => Promise<void>;

  // Sub-resources: media
  fetchMedia: (businessId: string, mediaType?: string) => Promise<BusinessMedia[]>;
  uploadMedia: (businessId: string, file: File, mediaType?: string, sortOrder?: number) => Promise<BusinessMedia>;
  deleteMedia: (businessId: string, mediaId: string) => Promise<void>;

  // Sub-resources: card
  fetchCard: (businessId: string) => Promise<BusinessCard | null>;
  uploadCard: (businessId: string, file: File) => Promise<BusinessCard>;
  replaceCard: (businessId: string, file: File) => Promise<BusinessCard>;
  deleteCard: (businessId: string) => Promise<void>;

  // Utility
  clearCurrentBusiness: () => void;
  clearListError: () => void;
}

// ────────────────────────────────────────────────────────
// Store
// ────────────────────────────────────────────────────────

export const useBusinessesStore = create<BusinessesState>((set) => ({
  businesses: [],
  listMeta: null,
  listLoading: false,
  listError: null,

  currentBusiness: null,
  detailLoading: false,
  detailError: null,

  myBusinesses: [],
  myMeta: null,
  myLoading: false,
  myError: null,

  // ── List ──

  fetchBusinesses: async (filters) => {
    set({ listLoading: true, listError: null });
    try {
      const qs = filters ? buildQueryString(filters as Record<string, unknown>) : "";
      const res = await apiFetch<PaginatedResponse<Business>>(
        `/businesses${qs}`,
        { skipAuth: true },
      );
      set({ businesses: res.data, listMeta: res.meta, listLoading: false });
    } catch (err) {
      set({ listLoading: false, listError: (err as Error).message });
    }
  },

  fetchBusinessById: async (id) => {
    set({ detailLoading: true, detailError: null });
    try {
      const res = await apiFetch<ApiResponse<Business>>(`/businesses/${encodeURIComponent(id)}`);
      set({ currentBusiness: res.data, detailLoading: false });
    } catch (err) {
      set({ detailLoading: false, detailError: (err as Error).message });
    }
  },

  fetchMyBusinesses: async (page = 1, limit = 10) => {
    set({ myLoading: true, myError: null });
    try {
      const qs = buildQueryString({ page, limit });
      const res = await apiFetch<PaginatedResponse<Business>>(
        `/businesses/mine${qs}`,
      );
      set({ myBusinesses: res.data, myMeta: res.meta, myLoading: false });
    } catch (err) {
      set({ myLoading: false, myError: (err as Error).message });
    }
  },

  // ── Mutations ──

  createBusiness: async (data) => {
    const res = await apiFetch<ApiResponse<Business>>("/businesses", {
      method: "POST",
      body: data,
    });
    return res.data;
  },

  updateBusiness: async (id, data) => {
    const res = await apiFetch<ApiResponse<Business>>(
      `/businesses/${encodeURIComponent(id)}`,
      { method: "PATCH", body: data },
    );
    set((s) => ({
      currentBusiness:
        s.currentBusiness?.id === id ? res.data : s.currentBusiness,
    }));
    return res.data;
  },

  deleteBusiness: async (id) => {
    await apiFetch(`/businesses/${encodeURIComponent(id)}`, { method: "DELETE" });
    set((s) => ({
      businesses: s.businesses.filter((b) => b.id !== id),
      myBusinesses: s.myBusinesses.filter((b) => b.id !== id),
      currentBusiness: s.currentBusiness?.id === id ? null : s.currentBusiness,
    }));
  },

  activateBusiness: async (id) => {
    const res = await apiFetch<ApiResponse<Business>>(
      `/businesses/${encodeURIComponent(id)}/activate`,
      { method: "PATCH" },
    );
    return res.data;
  },

  deactivateBusiness: async (id) => {
    const res = await apiFetch<ApiResponse<Business>>(
      `/businesses/${encodeURIComponent(id)}/deactivate`,
      { method: "PATCH" },
    );
    return res.data;
  },

  uploadLogo: async (id, file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await apiFetch<ApiResponse<Business>>(
      `/businesses/${encodeURIComponent(id)}/logo`,
      { method: "POST", body: formData, skipContentType: true },
    );
    return res.data;
  },

  // ── Products ──

  fetchProducts: async (businessId) => {
    const res = await apiFetch<ApiResponse<BusinessProduct[]>>(
      `/businesses/${encodeURIComponent(businessId)}/products`,
      { skipAuth: true },
    );
    return res.data;
  },

  createProduct: async (businessId, data) => {
    const res = await apiFetch<ApiResponse<BusinessProduct>>(
      `/businesses/${encodeURIComponent(businessId)}/products`,
      { method: "POST", body: data },
    );
    return res.data;
  },

  updateProduct: async (businessId, productId, data) => {
    const res = await apiFetch<ApiResponse<BusinessProduct>>(
      `/businesses/${encodeURIComponent(businessId)}/products/${encodeURIComponent(productId)}`,
      { method: "PATCH", body: data },
    );
    return res.data;
  },

  deleteProduct: async (businessId, productId) => {
    await apiFetch(
      `/businesses/${encodeURIComponent(businessId)}/products/${encodeURIComponent(productId)}`,
      { method: "DELETE" },
    );
  },

  // ── Services ──

  fetchServices: async (businessId) => {
    const res = await apiFetch<ApiResponse<BusinessService[]>>(
      `/businesses/${encodeURIComponent(businessId)}/services`,
      { skipAuth: true },
    );
    return res.data;
  },

  createService: async (businessId, data) => {
    const res = await apiFetch<ApiResponse<BusinessService>>(
      `/businesses/${encodeURIComponent(businessId)}/services`,
      { method: "POST", body: data },
    );
    return res.data;
  },

  updateService: async (businessId, serviceId, data) => {
    const res = await apiFetch<ApiResponse<BusinessService>>(
      `/businesses/${encodeURIComponent(businessId)}/services/${encodeURIComponent(serviceId)}`,
      { method: "PATCH", body: data },
    );
    return res.data;
  },

  deleteService: async (businessId, serviceId) => {
    await apiFetch(
      `/businesses/${encodeURIComponent(businessId)}/services/${encodeURIComponent(serviceId)}`,
      { method: "DELETE" },
    );
  },

  // ── Branches ──

  fetchBranches: async (businessId) => {
    const res = await apiFetch<ApiResponse<BusinessBranch[]>>(
      `/businesses/${encodeURIComponent(businessId)}/branches`,
      { skipAuth: true },
    );
    return res.data;
  },

  createBranch: async (businessId, data) => {
    const res = await apiFetch<ApiResponse<BusinessBranch>>(
      `/businesses/${encodeURIComponent(businessId)}/branches`,
      { method: "POST", body: data },
    );
    return res.data;
  },

  updateBranch: async (businessId, branchId, data) => {
    const res = await apiFetch<ApiResponse<BusinessBranch>>(
      `/businesses/${encodeURIComponent(businessId)}/branches/${encodeURIComponent(branchId)}`,
      { method: "PATCH", body: data },
    );
    return res.data;
  },

  deleteBranch: async (businessId, branchId) => {
    await apiFetch(
      `/businesses/${encodeURIComponent(businessId)}/branches/${encodeURIComponent(branchId)}`,
      { method: "DELETE" },
    );
  },

  // ── Hours ──

  fetchHours: async (businessId) => {
    const res = await apiFetch<ApiResponse<BusinessHour[]>>(
      `/businesses/${encodeURIComponent(businessId)}/hours`,
      { skipAuth: true },
    );
    return res.data;
  },

  createHour: async (businessId, data) => {
    const res = await apiFetch<ApiResponse<BusinessHour>>(
      `/businesses/${encodeURIComponent(businessId)}/hours`,
      { method: "POST", body: data },
    );
    return res.data;
  },

  updateHour: async (businessId, hourId, data) => {
    const res = await apiFetch<ApiResponse<BusinessHour>>(
      `/businesses/${encodeURIComponent(businessId)}/hours/${encodeURIComponent(hourId)}`,
      { method: "PATCH", body: data },
    );
    return res.data;
  },

  deleteHour: async (businessId, hourId) => {
    await apiFetch(
      `/businesses/${encodeURIComponent(businessId)}/hours/${encodeURIComponent(hourId)}`,
      { method: "DELETE" },
    );
  },

  // ── Socials ──

  fetchSocials: async (businessId) => {
    const res = await apiFetch<ApiResponse<BusinessSocial[]>>(
      `/businesses/${encodeURIComponent(businessId)}/socials`,
      { skipAuth: true },
    );
    return res.data;
  },

  createSocial: async (businessId, data) => {
    const res = await apiFetch<ApiResponse<BusinessSocial>>(
      `/businesses/${encodeURIComponent(businessId)}/socials`,
      { method: "POST", body: data },
    );
    return res.data;
  },

  updateSocial: async (businessId, socialId, data) => {
    const res = await apiFetch<ApiResponse<BusinessSocial>>(
      `/businesses/${encodeURIComponent(businessId)}/socials/${encodeURIComponent(socialId)}`,
      { method: "PATCH", body: data },
    );
    return res.data;
  },

  deleteSocial: async (businessId, socialId) => {
    await apiFetch(
      `/businesses/${encodeURIComponent(businessId)}/socials/${encodeURIComponent(socialId)}`,
      { method: "DELETE" },
    );
  },

  // ── Media ──

  fetchMedia: async (businessId, mediaType) => {
    const qs = mediaType ? buildQueryString({ mediaType }) : "";
    const res = await apiFetch<ApiResponse<BusinessMedia[]>>(
      `/businesses/${encodeURIComponent(businessId)}/media${qs}`,
      { skipAuth: true },
    );
    return res.data;
  },

  uploadMedia: async (businessId, file, mediaType, sortOrder) => {
    const formData = new FormData();
    formData.append("file", file);
    if (mediaType) formData.append("mediaType", mediaType);
    if (sortOrder !== undefined) formData.append("sortOrder", String(sortOrder));
    const res = await apiFetch<ApiResponse<BusinessMedia>>(
      `/businesses/${encodeURIComponent(businessId)}/media`,
      { method: "POST", body: formData, skipContentType: true },
    );
    return res.data;
  },

  deleteMedia: async (businessId, mediaId) => {
    await apiFetch(
      `/businesses/${encodeURIComponent(businessId)}/media/${encodeURIComponent(mediaId)}`,
      { method: "DELETE" },
    );
  },

  // ── Card ──

  fetchCard: async (businessId) => {
    try {
      const res = await apiFetch<ApiResponse<BusinessCard>>(
        `/businesses/${encodeURIComponent(businessId)}/card`,
        { skipAuth: true },
      );
      return res.data;
    } catch {
      return null;
    }
  },

  uploadCard: async (businessId, file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await apiFetch<ApiResponse<BusinessCard>>(
      `/businesses/${encodeURIComponent(businessId)}/card`,
      { method: "POST", body: formData, skipContentType: true },
    );
    return res.data;
  },

  replaceCard: async (businessId, file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await apiFetch<ApiResponse<BusinessCard>>(
      `/businesses/${encodeURIComponent(businessId)}/card`,
      { method: "PUT", body: formData, skipContentType: true },
    );
    return res.data;
  },

  deleteCard: async (businessId) => {
    await apiFetch(
      `/businesses/${encodeURIComponent(businessId)}/card`,
      { method: "DELETE" },
    );
  },

  // ── Utility ──

  clearCurrentBusiness: () => set({ currentBusiness: null, detailError: null }),
  clearListError: () => set({ listError: null }),
}));

// ────────────────────────────────────────────────────────
// Selectors
// ────────────────────────────────────────────────────────

export const selectBusinesses = (s: { businesses: Business[] }) => s.businesses;
export const selectBusinessListMeta = (s: { listMeta: PaginationMeta | null }) => s.listMeta;
export const selectBusinessListLoading = (s: { listLoading: boolean }) => s.listLoading;
export const selectBusinessListError = (s: { listError: string | null }) => s.listError;

export const selectCurrentBusiness = (s: { currentBusiness: Business | null }) => s.currentBusiness;
export const selectBusinessDetailLoading = (s: { detailLoading: boolean }) => s.detailLoading;
export const selectBusinessDetailError = (s: { detailError: string | null }) => s.detailError;

export const selectMyBusinesses = (s: { myBusinesses: Business[] }) => s.myBusinesses;
export const selectMyBusinessesMeta = (s: { myMeta: PaginationMeta | null }) => s.myMeta;
export const selectMyBusinessesLoading = (s: { myLoading: boolean }) => s.myLoading;
