import type { Category } from "./category";
import type { City, Country } from "./city";

// ────────────────────────────────────────────────────────
// Core Business entity – matches backend Business entity
// ────────────────────────────────────────────────────────

export interface Business {
  id: string;
  userId?: string;
  countryId?: string;
  cityId?: string;
  categoryId?: string;
  name: string;
  description?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  logoUrl?: string;
  isApproved: boolean;
  isActive: boolean;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  // Relations (loaded on detail endpoints)
  user?: BusinessOwner;
  countryEntity?: Country;
  cityEntity?: City;
  category?: Category;
  socials?: BusinessSocial[];
  businessHours?: BusinessHour[];
  services?: BusinessService[];
  products?: BusinessProduct[];
  branches?: BusinessBranch[];
  reviews?: import("./review").Review[];
  /**
   * Media items are NOT included in the business detail response.
   * Fetch separately via GET /businesses/:id/media.
   */
  media?: BusinessMedia[];
  /**
   * Business card is NOT included in the business detail response.
   * Fetch separately via GET /businesses/:id/card.
   */
  card?: BusinessCard;
}

/** Backward-compat alias so existing component imports still resolve. */
export type Enterprise = Business;

// ────────────────────────────────────────────────────────
// Related sub-entities
// ────────────────────────────────────────────────────────

export type SocialPlatformType =
  | "facebook"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "x"
  | "kakao"
  | (string & {});

export interface BusinessSocial {
  id: string;
  businessId: string;
  type: SocialPlatformType;
  url: string;
  createdAt: string;
}

export type DayOfWeek = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface BusinessHour {
  id: string;
  businessId: string;
  dayOfWeek: DayOfWeek;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
  createdAt: string;
}

export interface BusinessService {
  id: string;
  businessId: string;
  title: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  createdAt: string;
}

export interface BusinessProduct {
  id: string;
  businessId: string;
  name: string;
  description?: string;
  sku?: string;
  sortOrder: number;
  price?: number;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BusinessBranch {
  id: string;
  businessId: string;
  address: string;
  cityId?: string;
  phone?: string;
  operatingHours?: string;
  createdAt: string;
  city?: City;
}

export interface CreateBusinessBranchData {
  address: string;
  cityId: string;
  phone?: string;
  operatingHours?: string;
}

export type UpdateBusinessBranchData = Partial<CreateBusinessBranchData>;

export type MediaType = "image" | "video";

export interface BusinessMedia {
  id: string;
  businessId: string;
  mediaType: MediaType;
  mediaUrl: string;
  sortOrder: number;
  createdAt: string;
}

export type CardFileType = "image" | "pdf";

export interface BusinessCard {
  id: string;
  businessId: string;
  cardUrl: string;
  fileType: CardFileType;
  createdAt: string;
}

export interface BusinessOwner {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  isActive: boolean;
  isVerified: boolean;
  emailVerifiedAt?: string;
  roleId: string;
  role?: { id: string; name: string; description?: string };
  createdAt: string;
  updatedAt: string;
}

// ────────────────────────────────────────────────────────
// Business filters – aligned with backend query params
// ────────────────────────────────────────────────────────

export interface BusinessFilters {
  page?: number;
  limit?: number;
  category?: string;
  city?: string;
  search?: string;
}

export interface CreateBusinessData {
  name: string;
  description?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  logoUrl?: string;
  countryId: string;
  cityId: string;
  categoryId: string;
}

export type UpdateBusinessData = Partial<CreateBusinessData>;

// ────────────────────────────────────────────────────────
// Sub-resource Create/Update DTOs – match backend DTOs
// ────────────────────────────────────────────────────────

export interface CreateBusinessServiceData {
  title: string;
  description?: string;
  price?: number;
  imageUrl?: string;
}

export type UpdateBusinessServiceData = Partial<CreateBusinessServiceData>;

export interface CreateBusinessProductData {
  name: string;
  description?: string;
  sku?: string;
  sortOrder?: number;
  price?: number;
  imageUrl?: string;
}

export type UpdateBusinessProductData = Partial<CreateBusinessProductData>;

export interface CreateBusinessHourData {
  dayOfWeek: DayOfWeek;
  openTime?: string;
  closeTime?: string;
  isClosed?: boolean;
}

export type UpdateBusinessHourData = Partial<CreateBusinessHourData>;

export interface CreateBusinessSocialData {
  type: string;
  url: string;
}

export type UpdateBusinessSocialData = Partial<CreateBusinessSocialData>;

// ────────────────────────────────────────────────────────
// Legacy type aliases for backward compatibility
// ────────────────────────────────────────────────────────

/** @deprecated Use BusinessSocial instead */
export type Social = BusinessSocial;

/** @deprecated Use BusinessHour instead */
export type DayHours = BusinessHour;

/** @deprecated Use BusinessHour[] instead */
export type BusinessHours = BusinessHour[];

/** @deprecated Use BusinessMedia instead */
export type GalleryImage = BusinessMedia;

/** @deprecated Use BusinessService instead */
export type Service = BusinessService;

/** @deprecated Use BusinessProduct instead */
export type Product = BusinessProduct;

/** @deprecated Use BusinessBranch instead */
export type Branch = BusinessBranch;

/** @deprecated Use Category instead */
export type CategoryReference = Category;

/** @deprecated Use BusinessOwner instead */
export type OwnerInfo = BusinessOwner;


