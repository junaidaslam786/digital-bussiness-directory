export interface Enterprise {
  id: string;
  slug: string;
  name: string;
  legalName?: string;
  logo?: string;
  businessCard?: string;
  shortDescription: string;
  description: string;
  categories: CategoryReference[];
  tags: string[];
  ratingAvg: number;
  ratingCount: number;
  priceRange?: 1 | 2 | 3 | 4;
  verified: boolean;
  foundedYear?: number;
  employeeRange?: string;
  certifications: string[];
  owner?: OwnerInfo;
  contact: Contact;
  address: Address;
  hours: BusinessHours;
  gallery: GalleryImage[];
  services: Service[];
  products: Product[];
  branches?: Branch[];
  relatedEnterpriseSlugs?: string[];
  updatedAt: string;
}

export interface OwnerInfo {
  name: string;
  title: string; // e.g., "CEO", "Founder", "Managing Director"
  bio?: string;
  photo?: string;
  email?: string;
  linkedin?: string;
}

export interface CategoryReference {
  id: string;
  slug: string;
  name: string;
}

export interface Contact {
  phone?: string;
  email?: string;
  website?: string;
  socials?: Social[];
}

export interface Social {
  type: "facebook" | "instagram" | "linkedin" | "youtube" | "x" | "kakao";
  url: string;
}

export interface Address {
  country: string;
  city: string;
  district?: string;
  street: string;
  postalCode?: string;
  lat?: number;
  lng?: number;
}

export interface BusinessHours {
  mon: DayHours;
  tue: DayHours;
  wed: DayHours;
  thu: DayHours;
  fri: DayHours;
  sat: DayHours;
  sun: DayHours;
}

export interface DayHours {
  open: string;
  close: string;
  closed: boolean;
}

export interface GalleryImage {
  url: string;
  alt: string;
}

export interface Service {
  name: string;
  description: string;
  priceFrom?: number;
}

export interface Product {
  name: string;
  description: string;
  sku?: string;
}

export interface Branch {
  name: string;
  address: string;
  contact?: string;
}
