/**
 * Subscriptions API store – aligned with backend SubscriptionsController.
 *
 * Endpoints:
 *   GET   /subscriptions/plans            – list active plans (public)
 *   POST  /subscriptions/checkout         – create Stripe checkout session (auth)
 *   GET   /subscriptions/my               – list owner's subscriptions (auth)
 *   GET   /subscriptions/my/:businessId   – get subscription for a specific business (auth)
 *   PATCH /subscriptions/cancel           – cancel subscription (auth)
 *   PATCH /subscriptions/auto-renew       – toggle auto-renew (auth)
 */

import { create } from "zustand";
import { apiFetch } from "./api";
import type { ApiResponse } from "@/types/api";
import type {
  SubscriptionPlan,
  Subscription,
  CreateCheckoutData,
} from "@/types/subscription";

// Re-export types for consumers that import from this store file
export type { SubscriptionStatus, SubscriptionPlan, Subscription, CreateCheckoutData } from "@/types/subscription";

// ────────────────────────────────────────────────────────
// State
// ────────────────────────────────────────────────────────

interface SubscriptionsState {
  plans: SubscriptionPlan[];
  plansLoading: boolean;
  plansError: string | null;

  mySubscriptions: Subscription[];
  mySubsLoading: boolean;
  mySubsError: string | null;

  currentSubscription: Subscription | null;

  fetchPlans: () => Promise<void>;
  createCheckout: (data: CreateCheckoutData) => Promise<{ sessionUrl: string }>;
  verifySession: (sessionId: string) => Promise<Subscription | null>;
  fetchMySubscriptions: () => Promise<void>;
  fetchBusinessSubscription: (businessId: string) => Promise<void>;
  cancelSubscription: (subscriptionId: string) => Promise<void>;
  toggleAutoRenew: (subscriptionId: string, autoRenew: boolean) => Promise<Subscription>;

  clearErrors: () => void;
}

// ────────────────────────────────────────────────────────
// Store
// ────────────────────────────────────────────────────────

export const useSubscriptionsStore = create<SubscriptionsState>((set) => ({
  plans: [],
  plansLoading: false,
  plansError: null,

  mySubscriptions: [],
  mySubsLoading: false,
  mySubsError: null,

  currentSubscription: null,

  fetchPlans: async () => {
    set({ plansLoading: true, plansError: null });
    try {
      const res = await apiFetch<ApiResponse<SubscriptionPlan[]>>(
        "/subscriptions/plans",
        { skipAuth: true },
      );
      set({ plans: res.data, plansLoading: false });
    } catch (err) {
      set({ plansLoading: false, plansError: (err as Error).message });
    }
  },

  createCheckout: async (data) => {
    const res = await apiFetch<ApiResponse<{ sessionUrl: string }>>(
      "/subscriptions/checkout",
      { method: "POST", body: data },
    );
    return res.data;
  },

  verifySession: async (sessionId) => {
    const res = await apiFetch<ApiResponse<Subscription | null>>(
      "/subscriptions/verify-session",
      { method: "POST", body: { sessionId } },
    );
    return res.data;
  },

  fetchMySubscriptions: async () => {
    set({ mySubsLoading: true, mySubsError: null });
    try {
      const res = await apiFetch<ApiResponse<Subscription[]>>(
        "/subscriptions/my",
      );
      set({ mySubscriptions: res.data, mySubsLoading: false });
    } catch (err) {
      set({ mySubsLoading: false, mySubsError: (err as Error).message });
    }
  },

  fetchBusinessSubscription: async (businessId) => {
    try {
      const res = await apiFetch<ApiResponse<Subscription | null>>(
        `/subscriptions/my/${encodeURIComponent(businessId)}`,
      );
      set({ currentSubscription: res.data });
    } catch {
      set({ currentSubscription: null });
    }
  },

  cancelSubscription: async (subscriptionId) => {
    const res = await apiFetch<ApiResponse<Subscription>>("/subscriptions/cancel", {
      method: "PATCH",
      body: { subscriptionId },
    });
    set((s) => ({
      mySubscriptions: s.mySubscriptions.map((sub) =>
        sub.id === subscriptionId ? res.data : sub,
      ),
      currentSubscription:
        s.currentSubscription?.id === subscriptionId
          ? res.data
          : s.currentSubscription,
    }));
  },

  toggleAutoRenew: async (subscriptionId, autoRenew) => {
    const res = await apiFetch<ApiResponse<Subscription>>(
      "/subscriptions/auto-renew",
      { method: "PATCH", body: { subscriptionId, autoRenew } },
    );
    set((s) => ({
      mySubscriptions: s.mySubscriptions.map((sub) =>
        sub.id === subscriptionId ? res.data : sub,
      ),
      currentSubscription:
        s.currentSubscription?.id === subscriptionId
          ? res.data
          : s.currentSubscription,
    }));
    return res.data;
  },

  clearErrors: () => set({ plansError: null, mySubsError: null }),
}));

// ── Selectors ──
export const selectPlans = (s: SubscriptionsState) => s.plans;
export const selectActivePlans = (s: SubscriptionsState) =>
  s.plans.filter((p) => p.isActive);
export const selectPlansLoading = (s: SubscriptionsState) => s.plansLoading;
export const selectMySubscriptions = (s: SubscriptionsState) => s.mySubscriptions;
export const selectMySubsLoading = (s: SubscriptionsState) => s.mySubsLoading;
export const selectCurrentSubscription = (s: SubscriptionsState) => s.currentSubscription;
export const selectActiveSubscriptions = (s: SubscriptionsState) =>
  s.mySubscriptions.filter((sub) => sub.status === "active");
