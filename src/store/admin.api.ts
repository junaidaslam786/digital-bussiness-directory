/**
 * Admin API store – aligned with backend AdminController.
 *
 * Endpoints (all require admin role):
 *   GET    /admin/businesses                    – list businesses
 *   GET    /admin/businesses/:id                – business detail
 *   PATCH  /admin/businesses/:id/approve        – approve
 *   PATCH  /admin/businesses/:id/reject         – reject
 *   PATCH  /admin/businesses/:id/suspend        – suspend
 *   PATCH  /admin/businesses/:id/reinstate      – reinstate
 *   GET    /admin/users                         – list users
 *   POST   /admin/users/:id/deactivate          – deactivate user
 *   PATCH  /admin/users/:id/reinstate           – reinstate user
 *   DELETE /admin/users/:id                     – delete user
 *   PATCH  /admin/users/:id/reset-password      – reset user password
 *   GET    /admin/payments                      – list payments
 *   GET    /admin/subscriptions                 – list subscriptions
 *   GET    /admin/reviews                       – list reviews
 *   DELETE /admin/reviews/:id                   – delete review
 *   GET    /admin/plans                         – list plans
 *   POST   /admin/plans                         – create plan
 *   PATCH  /admin/plans/:id                     – update plan
 *   DELETE /admin/plans/:id                     – delete plan
 *   POST   /admin/notifications/broadcast       – broadcast notification
 *   GET    /admin/notifications/logs            – notification logs
 *   POST   /admin/notifications/retry-failed    – retry failed notifications
 *   GET    /admin/dashboard                     – dashboard stats
 *   GET    /admin/recent-activity               – recent audit logs
 *   GET    /admin/analytics/revenue             – revenue analytics
 *   GET    /admin/audit-logs                    – audit logs
 */

import { create } from "zustand";
import { apiFetch, buildQueryString } from "./api";
import type { Business } from "@/types/enterprise";
import type { Review } from "@/types/review";
import type { Payment } from "@/types/payment";
import type { Subscription, SubscriptionPlan } from "@/types/subscription";
import type { ApiResponse } from "@/types/api";
import type { AuditLog, AuditLogFilters } from "@/types/audit-log";
import type { NotificationLog } from "@/types/notification";
import type {
  AdminBusinessFilters,
  AdminUserFilters,
  AdminPaymentFilters,
  AdminSubscriptionFilters,
  AdminReviewFilters,
  AdminNotificationLogFilters,
  RevenueAnalyticsFilters,
  AdminDashboardStats,
  RevenueAnalytics,
  AdminResetPasswordData,
  CreatePlanData,
  UpdatePlanData,
  BroadcastNotificationData,
} from "@/types/admin";

// ── User type (light version returned by admin endpoints) ──

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  isVerified: boolean;
  isActive: boolean;
  roleId: string;
  role?: { id: string; name: string; description?: string };
  createdAt: string;
  updatedAt: string;
}

// ────────────────────────────────────────────────────────
// State
// ────────────────────────────────────────────────────────

interface AdminState {
  // Businesses
  businesses: Business[];
  businessesLoading: boolean;
  businessesError: string | null;
  currentBusiness: Business | null;

  // Users
  users: AdminUser[];
  usersLoading: boolean;
  usersError: string | null;

  // Payments
  payments: Payment[];
  paymentsLoading: boolean;
  paymentsError: string | null;

  // Subscriptions
  subscriptions: Subscription[];
  subscriptionsLoading: boolean;
  subscriptionsError: string | null;

  // Reviews
  reviews: Review[];
  reviewsLoading: boolean;
  reviewsError: string | null;

  // Plans
  plans: SubscriptionPlan[];
  plansLoading: boolean;
  plansError: string | null;

  // Notification logs
  notificationLogs: NotificationLog[];
  notifLogsLoading: boolean;
  notifLogsError: string | null;

  // Dashboard
  dashboardStats: AdminDashboardStats | null;
  dashboardLoading: boolean;
  dashboardError: string | null;

  // Recent activity
  recentActivity: AuditLog[];
  recentActivityLoading: boolean;

  // Revenue analytics
  revenueAnalytics: RevenueAnalytics | null;
  revenueLoading: boolean;
  revenueError: string | null;

  // Audit logs
  auditLogs: AuditLog[];
  auditLogsLoading: boolean;
  auditLogsError: string | null;

  // ── Business moderation ──
  fetchBusinesses: (filters?: AdminBusinessFilters) => Promise<void>;
  fetchBusinessById: (id: string) => Promise<void>;
  approveBusiness: (id: string) => Promise<Business>;
  rejectBusiness: (id: string, reason: string) => Promise<Business>;
  suspendBusiness: (id: string) => Promise<Business>;
  reinstateBusiness: (id: string) => Promise<Business>;

  // ── User management ──
  fetchUsers: (filters?: AdminUserFilters) => Promise<void>;
  deactivateUser: (id: string) => Promise<void>;
  reinstateUser: (id: string) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  resetUserPassword: (id: string, data: AdminResetPasswordData) => Promise<void>;

  // ── Payments / Subscriptions (admin view) ──
  fetchPayments: (filters?: AdminPaymentFilters) => Promise<void>;
  fetchSubscriptions: (filters?: AdminSubscriptionFilters) => Promise<void>;

  // ── Reviews (admin) ──
  fetchReviews: (filters?: AdminReviewFilters) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;

  // ── Plans CRUD ──
  fetchPlans: (page?: number, limit?: number) => Promise<void>;
  createPlan: (data: CreatePlanData) => Promise<SubscriptionPlan>;
  updatePlan: (id: string, data: UpdatePlanData) => Promise<SubscriptionPlan>;
  deletePlan: (id: string) => Promise<void>;

  // ── Notifications ──
  broadcastNotification: (data: BroadcastNotificationData) => Promise<{ sent: number; failed: number }>;
  fetchNotificationLogs: (filters?: AdminNotificationLogFilters) => Promise<void>;
  retryFailedNotifications: () => Promise<{ retriedCount: number }>;

  // ── Dashboard / Analytics ──
  fetchDashboard: (countryId?: string) => Promise<void>;
  fetchRecentActivity: () => Promise<void>;
  fetchRevenueAnalytics: (filters?: RevenueAnalyticsFilters) => Promise<void>;

  // ── Audit Logs ──
  fetchAuditLogs: (filters?: AuditLogFilters) => Promise<void>;

  // ── Utilities ──
  clearErrors: () => void;
}

// ────────────────────────────────────────────────────────
// Store
// ────────────────────────────────────────────────────────

export const useAdminStore = create<AdminState>((set, get) => ({
  businesses: [],
  businessesLoading: false,
  businessesError: null,
  currentBusiness: null,

  users: [],
  usersLoading: false,
  usersError: null,

  payments: [],
  paymentsLoading: false,
  paymentsError: null,

  subscriptions: [],
  subscriptionsLoading: false,
  subscriptionsError: null,

  reviews: [],
  reviewsLoading: false,
  reviewsError: null,

  plans: [],
  plansLoading: false,
  plansError: null,

  notificationLogs: [],
  notifLogsLoading: false,
  notifLogsError: null,

  dashboardStats: null,
  dashboardLoading: false,
  dashboardError: null,

  recentActivity: [],
  recentActivityLoading: false,

  revenueAnalytics: null,
  revenueLoading: false,
  revenueError: null,

  auditLogs: [],
  auditLogsLoading: false,
  auditLogsError: null,

  // ── Business moderation ──────────────────────────────

  fetchBusinesses: async (filters) => {
    set({ businessesLoading: true, businessesError: null });
    try {
      const qs = filters ? buildQueryString(filters as Record<string, unknown>) : "";
      const res = await apiFetch<ApiResponse<Business[]>>(`/admin/businesses${qs}`);
      set({ businesses: res.data, businessesLoading: false });
    } catch (e) {
      set({ businessesError: (e as Error).message, businessesLoading: false });
    }
  },

  fetchBusinessById: async (id) => {
    set({ businessesLoading: true, businessesError: null });
    try {
      const res = await apiFetch<ApiResponse<Business>>(`/admin/businesses/${encodeURIComponent(id)}`);
      set({ currentBusiness: res.data, businessesLoading: false });
    } catch (e) {
      set({ businessesError: (e as Error).message, businessesLoading: false });
    }
  },

  approveBusiness: async (id) => {
    const res = await apiFetch<ApiResponse<Business>>(
      `/admin/businesses/${encodeURIComponent(id)}/approve`,
      { method: "PATCH" },
    );
    const updated = res.data;
    set((s) => ({
      businesses: s.businesses.map((b) => (b.id === id ? updated : b)),
      currentBusiness: s.currentBusiness?.id === id ? updated : s.currentBusiness,
    }));
    return updated;
  },

  rejectBusiness: async (id, reason) => {
    const res = await apiFetch<ApiResponse<Business>>(
      `/admin/businesses/${encodeURIComponent(id)}/reject`,
      { method: "PATCH", body: { reason } },
    );
    const updated = res.data;
    set((s) => ({
      businesses: s.businesses.map((b) => (b.id === id ? updated : b)),
      currentBusiness: s.currentBusiness?.id === id ? updated : s.currentBusiness,
    }));
    return updated;
  },

  suspendBusiness: async (id) => {
    const res = await apiFetch<ApiResponse<Business>>(
      `/admin/businesses/${encodeURIComponent(id)}/suspend`,
      { method: "PATCH" },
    );
    const updated = res.data;
    set((s) => ({
      businesses: s.businesses.map((b) => (b.id === id ? updated : b)),
      currentBusiness: s.currentBusiness?.id === id ? updated : s.currentBusiness,
    }));
    return updated;
  },

  reinstateBusiness: async (id) => {
    const res = await apiFetch<ApiResponse<Business>>(
      `/admin/businesses/${encodeURIComponent(id)}/reinstate`,
      { method: "PATCH" },
    );
    const updated = res.data;
    set((s) => ({
      businesses: s.businesses.map((b) => (b.id === id ? updated : b)),
      currentBusiness: s.currentBusiness?.id === id ? updated : s.currentBusiness,
    }));
    return updated;
  },

  // ── User management ──────────────────────────────────

  fetchUsers: async (filters) => {
    set({ usersLoading: true, usersError: null });
    try {
      const qs = filters ? buildQueryString(filters as Record<string, unknown>) : "";
      const res = await apiFetch<ApiResponse<AdminUser[]>>(`/admin/users${qs}`);
      set({ users: res.data, usersLoading: false });
    } catch (e) {
      set({ usersError: (e as Error).message, usersLoading: false });
    }
  },

  deactivateUser: async (id) => {
    await apiFetch(`/admin/users/${encodeURIComponent(id)}/deactivate`, { method: "POST" });
    set((s) => ({
      users: s.users.map((u) => (u.id === id ? { ...u, isActive: false } : u)),
    }));
  },

  reinstateUser: async (id) => {
    await apiFetch(`/admin/users/${encodeURIComponent(id)}/reinstate`, { method: "PATCH" });
    set((s) => ({
      users: s.users.map((u) => (u.id === id ? { ...u, isActive: true } : u)),
    }));
  },

  deleteUser: async (id) => {
    await apiFetch(`/admin/users/${encodeURIComponent(id)}`, { method: "DELETE" });
    set((s) => ({ users: s.users.filter((u) => u.id !== id) }));
  },

  resetUserPassword: async (id, data) => {
    await apiFetch(`/admin/users/${encodeURIComponent(id)}/reset-password`, {
      method: "PATCH",
      body: data,
    });
  },

  // ── Payments / Subscriptions ─────────────────────────

  fetchPayments: async (filters) => {
    set({ paymentsLoading: true, paymentsError: null });
    try {
      const qs = filters ? buildQueryString(filters as Record<string, unknown>) : "";
      const res = await apiFetch<ApiResponse<Payment[]>>(`/admin/payments${qs}`);
      set({ payments: res.data, paymentsLoading: false });
    } catch (e) {
      set({ paymentsError: (e as Error).message, paymentsLoading: false });
    }
  },

  fetchSubscriptions: async (filters) => {
    set({ subscriptionsLoading: true, subscriptionsError: null });
    try {
      const qs = filters ? buildQueryString(filters as Record<string, unknown>) : "";
      const res = await apiFetch<ApiResponse<Subscription[]>>(`/admin/subscriptions${qs}`);
      set({ subscriptions: res.data, subscriptionsLoading: false });
    } catch (e) {
      set({ subscriptionsError: (e as Error).message, subscriptionsLoading: false });
    }
  },

  // ── Reviews ──────────────────────────────────────────

  fetchReviews: async (filters) => {
    set({ reviewsLoading: true, reviewsError: null });
    try {
      const qs = filters ? buildQueryString(filters as Record<string, unknown>) : "";
      const res = await apiFetch<ApiResponse<Review[]>>(`/admin/reviews${qs}`);
      set({ reviews: res.data, reviewsLoading: false });
    } catch (e) {
      set({ reviewsError: (e as Error).message, reviewsLoading: false });
    }
  },

  deleteReview: async (id) => {
    await apiFetch(`/admin/reviews/${encodeURIComponent(id)}`, { method: "DELETE" });
    set((s) => ({ reviews: s.reviews.filter((r) => r.id !== id) }));
  },

  // ── Plans CRUD ───────────────────────────────────────

  fetchPlans: async (page, limit) => {
    set({ plansLoading: true, plansError: null });
    try {
      const qs = buildQueryString({ page, limit });
      const res = await apiFetch<ApiResponse<SubscriptionPlan[]>>(`/admin/plans${qs}`);
      set({ plans: res.data, plansLoading: false });
    } catch (e) {
      set({ plansError: (e as Error).message, plansLoading: false });
    }
  },

  createPlan: async (data) => {
    const res = await apiFetch<ApiResponse<SubscriptionPlan>>("/admin/plans", {
      method: "POST",
      body: data,
    });
    const plan = res.data;
    set((s) => ({ plans: [...s.plans, plan] }));
    return plan;
  },

  updatePlan: async (id, data) => {
    const res = await apiFetch<ApiResponse<SubscriptionPlan>>(
      `/admin/plans/${encodeURIComponent(id)}`,
      { method: "PATCH", body: data },
    );
    const updated = res.data;
    set((s) => ({ plans: s.plans.map((p) => (p.id === id ? updated : p)) }));
    return updated;
  },

  deletePlan: async (id) => {
    await apiFetch(`/admin/plans/${encodeURIComponent(id)}`, { method: "DELETE" });
    set((s) => ({ plans: s.plans.filter((p) => p.id !== id) }));
  },

  // ── Notifications ────────────────────────────────────

  broadcastNotification: async (data) => {
    const res = await apiFetch<ApiResponse<{ sent: number; failed: number }>>(
      "/admin/notifications/broadcast",
      { method: "POST", body: data },
    );
    return res.data;
  },

  fetchNotificationLogs: async (filters) => {
    set({ notifLogsLoading: true, notifLogsError: null });
    try {
      const qs = filters ? buildQueryString(filters as Record<string, unknown>) : "";
      const res = await apiFetch<ApiResponse<NotificationLog[]>>(
        `/admin/notifications/logs${qs}`,
      );
      set({ notificationLogs: res.data, notifLogsLoading: false });
    } catch (e) {
      set({ notifLogsError: (e as Error).message, notifLogsLoading: false });
    }
  },

  retryFailedNotifications: async () => {
    const res = await apiFetch<ApiResponse<{ retriedCount: number }>>(
      "/admin/notifications/retry-failed",
      { method: "POST" },
    );
    return res.data;
  },

  // ── Dashboard / Analytics ────────────────────────────

  fetchDashboard: async (countryId) => {
    set({ dashboardLoading: true, dashboardError: null });
    try {
      const qs = countryId ? buildQueryString({ countryId }) : "";
      const res = await apiFetch<ApiResponse<AdminDashboardStats>>(
        `/admin/dashboard${qs}`,
      );
      set({ dashboardStats: res.data, dashboardLoading: false });
    } catch (e) {
      set({ dashboardError: (e as Error).message, dashboardLoading: false });
    }
  },

  fetchRecentActivity: async () => {
    set({ recentActivityLoading: true });
    try {
      const res = await apiFetch<ApiResponse<AuditLog[]>>("/admin/recent-activity");
      set({ recentActivity: res.data, recentActivityLoading: false });
    } catch {
      set({ recentActivityLoading: false });
    }
  },

  fetchRevenueAnalytics: async (filters) => {
    set({ revenueLoading: true, revenueError: null });
    try {
      const qs = filters ? buildQueryString(filters as Record<string, unknown>) : "";
      const res = await apiFetch<ApiResponse<RevenueAnalytics>>(
        `/admin/analytics/revenue${qs}`,
      );
      set({ revenueAnalytics: res.data, revenueLoading: false });
    } catch (e) {
      set({ revenueError: (e as Error).message, revenueLoading: false });
    }
  },

  // ── Audit Logs ───────────────────────────────────────

  fetchAuditLogs: async (filters) => {
    set({ auditLogsLoading: true, auditLogsError: null });
    try {
      const qs = filters ? buildQueryString(filters as Record<string, unknown>) : "";
      const res = await apiFetch<ApiResponse<AuditLog[]>>(`/admin/audit-logs${qs}`);
      set({ auditLogs: res.data, auditLogsLoading: false });
    } catch (e) {
      set({ auditLogsError: (e as Error).message, auditLogsLoading: false });
    }
  },

  // ── Utilities ────────────────────────────────────────

  clearErrors: () => {
    set({
      businessesError: null,
      usersError: null,
      paymentsError: null,
      subscriptionsError: null,
      reviewsError: null,
      plansError: null,
      notifLogsError: null,
      dashboardError: null,
      revenueError: null,
      auditLogsError: null,
    });
  },
}));

// ────────────────────────────────────────────────────────
// Selectors
// ────────────────────────────────────────────────────────

export const selectAdminBusinesses = (s: AdminState) => s.businesses;
export const selectAdminBusinessesLoading = (s: AdminState) => s.businessesLoading;
export const selectAdminCurrentBusiness = (s: AdminState) => s.currentBusiness;
export const selectAdminUsers = (s: AdminState) => s.users;
export const selectAdminUsersLoading = (s: AdminState) => s.usersLoading;
export const selectAdminPayments = (s: AdminState) => s.payments;
export const selectAdminSubscriptions = (s: AdminState) => s.subscriptions;
export const selectAdminReviews = (s: AdminState) => s.reviews;
export const selectAdminPlans = (s: AdminState) => s.plans;
export const selectDashboardStats = (s: AdminState) => s.dashboardStats;
export const selectDashboardLoading = (s: AdminState) => s.dashboardLoading;
export const selectRevenueAnalytics = (s: AdminState) => s.revenueAnalytics;
export const selectRecentActivity = (s: AdminState) => s.recentActivity;
export const selectAuditLogs = (s: AdminState) => s.auditLogs;
export const selectNotificationLogs = (s: AdminState) => s.notificationLogs;
