export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryData {
  name: string;
  slug?: string;
  icon?: string;
  description?: string;
  isActive?: boolean;
}

export type UpdateCategoryData = Partial<CreateCategoryData>;
