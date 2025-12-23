export const CATEGORIES = {
  MANUFACTURING: "manufacturing",
  LOGISTICS: "logistics",
  IT_SERVICES: "it-services",
  RESTAURANTS: "restaurants",
  CLINICS: "clinics",
  EDUCATION: "education",
  BEAUTY: "beauty",
  CONSTRUCTION: "construction",
  AUTOMOTIVE: "automotive",
  RETAIL: "retail",
  TOURISM: "tourism",
  FINANCE: "finance",
} as const;

export const CITIES = {
  SEOUL: "seoul",
  BUSAN: "busan",
  INCHEON: "incheon",
  DAEGU: "daegu",
  DAEJEON: "daejeon",
  GWANGJU: "gwangju",
  SUWON: "suwon",
  ULSAN: "ulsan",
  CHANGWON: "changwon",
  GOYANG: "goyang",
} as const;

export const PRICE_RANGES = {
  1: "$",
  2: "$$",
  3: "$$$",
  4: "$$$$",
} as const;

export const EMPLOYEE_RANGES = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+",
] as const;

export const SORT_OPTIONS = [
  { value: "relevance", label: "Most Relevant" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
  { value: "alphabetical", label: "Alphabetical" },
] as const;

export const SOCIAL_TYPES = [
  "facebook",
  "instagram",
  "linkedin",
  "youtube",
  "x",
  "kakao",
] as const;
