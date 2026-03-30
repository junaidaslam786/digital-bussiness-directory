// ────────────────────────────────────────────────────────
// Admin-specific types – aligned with backend AdminController
// ────────────────────────────────────────────────────────

import type { Business } from "./enterprise";
import type { SubscriptionPlan } from "./subscription";

// ── Dashboard ──

export interface AdminDashboardStats {
  totalUsers: number;
  totalBusinesses: number;
  approvedBusinesses: number;
  pendingApprovals: number;
  activeSubscriptions: number;
  totalRevenue: number;
  totalReviews: number;
  totalPayments: number;
  subscriptionConversionRate: number;
  businessesByCountry: { countryId: string; countryName: string; count: number }[];
  revenueByCountry: { countryId: string; countryName: string; revenue: number }[];
}

// ── Revenue Analytics ──

export interface RevenueAnalytics {
  monthly: { month: string; revenue: number; count: number }[];
  paymentVolumeByCountry: {
    countryId: string;
    countryName: string;
    totalAmount: number;
    count: number;
  }[];
}

// ── Query Filters ──

export interface AdminBusinessFilters {
  page?: number;
  limit?: number;
  search?: string;
  isApproved?: boolean;
}

export interface AdminUserFilters {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}

export interface AdminPaymentFilters {
  page?: number;
  limit?: number;
  status?: string;
  countryId?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface AdminSubscriptionFilters {
  page?: number;
  limit?: number;
  status?: string;
  countryId?: string;
}

export interface AdminReviewFilters {
  page?: number;
  limit?: number;
  businessId?: string;
}

export interface AdminNotificationLogFilters {
  page?: number;
  limit?: number;
  status?: string;
}

export interface RevenueAnalyticsFilters {
  startDate?: string;
  endDate?: string;
  countryId?: string;
}

// ── DTOs ──

export interface AdminResetPasswordData {
  newPassword?: string;
}

export interface CreatePlanData {
  name: string;
  price: number;
  durationInDays?: number;
  description?: string;
  billingCycle?: string;
  features?: string[];
  isActive?: boolean;
  stripePriceId?: string;
}

export type UpdatePlanData = Partial<CreatePlanData>;

export interface BroadcastNotificationData {
  subject: string;
  content: string;
  countryId?: string;
  userId?: string;
}

// ── Admin-scoped response aliases ──

export type AdminBusiness = Business;
export type AdminPlan = SubscriptionPlan;
