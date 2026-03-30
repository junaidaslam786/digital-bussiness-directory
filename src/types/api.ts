/**
 * Common API response types aligned with the backend's ServiceResponse pattern.
 */

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  /** Not all backend endpoints include this; compute as Math.ceil(total / limit) if absent. */
  totalPages?: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: PaginationMeta;
}

export interface QueryParams {
  page?: number;
  limit?: number;
}

export interface SearchParams extends QueryParams {
  q?: string;
  cityId?: string;
  categoryId?: string;
  serviceType?: string;
  sortBy?: "relevance" | "name";
}

export interface SearchSuggestion {
  name: string;
  type: "business" | "category";
}
