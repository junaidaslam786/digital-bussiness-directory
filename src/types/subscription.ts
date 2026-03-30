// ────────────────────────────────────────────────────────
// Subscription types – aligned with backend Subscription + SubscriptionPlan entities
// ────────────────────────────────────────────────────────

export type SubscriptionStatus = "active" | "expired" | "cancelled" | "pending";

export interface SubscriptionPlan {
  id: string;
  name: string;
  description?: string;
  price: number;
  billingCycle: string;
  durationInDays: number;
  features?: string[];
  isActive: boolean;
  stripePriceId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  businessId: string;
  planId: string;
  stripeSubscriptionId?: string;
  startDate?: string | null;
  endDate?: string | null;
  status: SubscriptionStatus;
  autoRenew: boolean;
  createdAt: string;
  plan?: SubscriptionPlan;
  business?: { id: string; name: string };
  payments?: import("./payment").Payment[];
}

export interface CreateCheckoutData {
  planId: string;
  businessId: string;
}
