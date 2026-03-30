// ────────────────────────────────────────────────────────
// Payment types – aligned with backend Payment entity
// ────────────────────────────────────────────────────────

export type PaymentStatus = "success" | "failed" | "refunded";

export interface Payment {
  id: string;
  subscriptionId: string;
  stripePaymentIntent: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  invoiceUrl?: string;
  createdAt: string;
  subscription?: {
    id: string;
    businessId: string;
    status: string;
    plan?: { id: string; name: string; price: number };
    business?: { id: string; name: string };
  };
}
