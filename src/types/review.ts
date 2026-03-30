export interface Review {
  id: string;
  businessId: string;
  userId?: string;
  authorName: string;
  rating: number;
  comment?: string;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  business?: {
    id: string;
    name: string;
  };
}

export interface CreateReviewData {
  businessId: string;
  authorName: string;
  rating: number;
  comment?: string;
}

export type UpdateReviewData = Partial<Omit<CreateReviewData, "businessId">>;
