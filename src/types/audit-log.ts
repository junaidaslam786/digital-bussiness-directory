// ────────────────────────────────────────────────────────
// Audit Log types – aligned with backend AuditLog entity
// ────────────────────────────────────────────────────────

export interface AuditLog {
  id: string;
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  user?: { id: string; name: string; email: string };
}

export interface AuditLogFilters {
  page?: number;
  limit?: number;
  userId?: string;
  action?: string;
  resource?: string;
  dateFrom?: string;
  dateTo?: string;
}
