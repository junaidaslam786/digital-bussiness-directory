// ────────────────────────────────────────────────────────
// Notification Log types – aligned with backend NotificationLog entity
// ────────────────────────────────────────────────────────

export type NotificationChannel = "email" | "in_app";
export type NotificationStatus = "sent" | "failed" | "pending";

export interface NotificationLog {
  id: string;
  userId: string;
  type: string;
  channel: NotificationChannel;
  status: NotificationStatus;
  sentAt?: string;
  errorMessage?: string;
  recipientEmail?: string;
  subject?: string;
  templateName?: string;
  contextData?: Record<string, unknown>;
  createdAt: string;
  user?: { id: string; name: string; email: string };
}
