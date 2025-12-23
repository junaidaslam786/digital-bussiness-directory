

\## Master Prompt: South Korea Business Digital Directory (Frontend Only)



\### 1) Goal



Build a \*\*frontend-only\*\* web app called \*\*KoreaBiz Directory\*\*:



\* A \*\*business directory for South Korea\*\*

\* Every \*\*enterprise has a dedicated public page\*\*

\* Each enterprise page shows:



&nbsp; \* enterprise details (name, category, location, contact, hours, etc.)

&nbsp; \* description, gallery, services/products

&nbsp; \* branches (if any)

&nbsp; \* \*\*related businesses\*\* (similar category / nearby / same tags)

&nbsp; \* reviews/ratings (mock for now)

\* Must work with \*\*mock data\*\* (JSON) and be ready to connect to an API later.



\### 2) Tech Stack Requirements



\* \*\*Next.js 14+ (App Router)\*\* + TypeScript

\* TailwindCSS

\* Zustand (or Redux Toolkit) for small global state (filters, favorites)

\* React Hook Form + Zod for forms

\* Headless UI / shadcn/ui for components

\* Next/Image for images

\* ESLint + Prettier

\* Use \*\*route segments\*\* and \*\*server components\*\* where useful, but keep it simple.



\### 3) Design Requirements (UI/UX)



\* Clean directory style like Google Business profiles / Yelp style

\* Mobile-first, responsive

\* Fast search and filtering UI

\* SEO-friendly:



&nbsp; \* Enterprise pages must have unique metadata (title/description)

&nbsp; \* Schema-ready structure (JSON-LD placeholder for later)

\* Dark mode support (optional but preferred)



\### 4) Core Pages \& Routes (App Router)



Implement these routes:



\#### Public



1\. `/` Home



&nbsp;  \* Hero search bar (name/category/city)

&nbsp;  \* Featured categories

&nbsp;  \* Featured enterprises

&nbsp;  \* Trending cities/areas (Seoul, Busan, Incheon, Daegu, Daejeon, Gwangju, Suwon, etc.)

2\. `/search`



&nbsp;  \* Search results grid/list

&nbsp;  \* Filters sidebar:



&nbsp;    \* category

&nbsp;    \* city/region

&nbsp;    \* rating

&nbsp;    \* open now

&nbsp;    \* price range

&nbsp;    \* tags (e.g., “Export”, “B2B”, “Manufacturing”)

&nbsp;  \* Sort:



&nbsp;    \* relevance

&nbsp;    \* rating

&nbsp;    \* newest

&nbsp;    \* nearest (mock)

3\. `/categories`



&nbsp;  \* Category listing

4\. `/categories/\[slug]`



&nbsp;  \* category detail + enterprises in that category

5\. `/cities`



&nbsp;  \* Cities list

6\. `/cities/\[slug]`



&nbsp;  \* City page with enterprises, popular categories in that city

7\. `/enterprise/\[slug]` (DEDICATED ENTERPRISE PAGE)

&nbsp;  Must include tabs/sections:



&nbsp;  \* Overview (headline, rating, tags, verified badge)

&nbsp;  \* About (description, founded year, employees range, certifications)

&nbsp;  \* Products/Services

&nbsp;  \* Gallery (images)

&nbsp;  \* Location (address, map placeholder)

&nbsp;  \* Contact (phone, email, website, socials)

&nbsp;  \* Business Hours

&nbsp;  \* Branches (if any)

&nbsp;  \* \*\*Related Businesses\*\* (cards)

&nbsp;  \* Reviews (mock list, ability to add review to local state only)

8\. `/compare`



&nbsp;  \* Compare 2–4 enterprises side-by-side (basic fields + ratings + services)

9\. `/favorites`



&nbsp;  \* Saved enterprises (local storage)

10\. `/claim/\[enterpriseSlug]`



\* Claim business form (frontend only)



\#### Admin (frontend only, no auth in phase 1)



11\. `/admin`



\* Dashboard cards (total enterprises, categories, cities)



12\. `/admin/enterprises`



\* Table list (mock)



13\. `/admin/enterprises/new`



\* Create enterprise form (writes to local state only)



14\. `/admin/enterprises/\[id]/edit`



\* Edit enterprise form (local state)



15\. `/admin/categories`

16\. `/admin/cities`



> Note: Admin is purely UI + local state. No backend.



\### 5) Data Model (Mock JSON)



Create mock data under `src/data/` with these shapes:



\#### Enterprise



\* id (uuid)

\* slug (string)

\* name

\* legalName (optional)

\* shortDescription

\* description (long)

\* categories: `{ id, slug, name }\[]`

\* tags: string\[]

\* ratingAvg (0–5)

\* ratingCount

\* priceRange: 1|2|3|4 (optional)

\* verified: boolean

\* foundedYear (optional)

\* employeeRange (optional: "1-10", "11-50", etc.)

\* certifications: string\[]

\* contact:



&nbsp; \* phone

&nbsp; \* email

&nbsp; \* website

&nbsp; \* socials: { type: "facebook|instagram|linkedin|youtube|x|kakao", url }\[]

\* address:



&nbsp; \* country: "South Korea"

&nbsp; \* city

&nbsp; \* district (optional)

&nbsp; \* street

&nbsp; \* postalCode

&nbsp; \* lat (optional)

&nbsp; \* lng (optional)

\* hours:



&nbsp; \* mon..sun: { open, close, closed }

\* gallery: { url, alt }\[]

\* services: { name, description, priceFrom? }\[]

\* products: { name, description, sku? }\[]

\* branches: { name, address, contact? }\[]

\* relatedEnterpriseSlugs: string\[] (or computed via category+city)

\* updatedAt



\#### Category



\* id, name, slug, icon (optional)



\#### City



\* id, name, slug, region (e.g., Gyeonggi-do), heroImage



\#### Review (mock)



\* id, enterpriseId, authorName, rating, comment, createdAt



\### 6) Search \& Filter Logic (Frontend Only)



Implement client-side:



\* Full-text search on: name, description, tags, categories, city

\* Filtering:



&nbsp; \* category

&nbsp; \* city

&nbsp; \* rating min

&nbsp; \* open now (based on mock hours and current time)

&nbsp; \* tags multi-select

\* Sorting:



&nbsp; \* rating desc

&nbsp; \* newest (updatedAt desc)

&nbsp; \* alphabetical

\* Pagination (client-side)



\### 7) Components You Must Build



Create reusable components:



\* `Header` (logo, search bar, nav)

\* `Footer`

\* `SearchBar` (autocomplete suggestions from enterprises/categories/cities)

\* `EnterpriseCard`

\* `EnterpriseGrid`

\* `EnterpriseListRow`

\* `CategoryCard`

\* `CityCard`

\* `FilterSidebar`

\* `SortDropdown`

\* `RatingStars`

\* `TagPills`

\* `Breadcrumbs`

\* `GalleryCarousel`

\* `ContactPanel`

\* `BusinessHoursTable`

\* `RelatedBusinesses`

\* `CompareTable`

\* `EmptyState`

\* `SkeletonLoaders`

\* `SEOHead` helper (metadata builder per page)



\### 8) State Management



Use Zustand (preferred) with persistence:



\* favorites store (localStorage)

\* compare store (selected enterprise slugs)

\* search filters store (optional)



\### 9) Forms



Use React Hook Form + Zod:



\* Claim business form

\* Admin create/edit enterprise form

\* Add review form (local only)



\### 10) Project Structure (Required)



Create this exact folder structure:



```

koreabiz-directory/

&nbsp; README.md

&nbsp; package.json

&nbsp; next.config.js

&nbsp; tailwind.config.ts

&nbsp; postcss.config.js

&nbsp; tsconfig.json

&nbsp; .eslintrc.json

&nbsp; .prettierrc



&nbsp; public/

&nbsp;   images/

&nbsp;     placeholders/



&nbsp; src/

&nbsp;   app/

&nbsp;     (public)/

&nbsp;       layout.tsx

&nbsp;       page.tsx                  # Home

&nbsp;       search/

&nbsp;         page.tsx

&nbsp;       categories/

&nbsp;         page.tsx

&nbsp;         \[slug]/

&nbsp;           page.tsx

&nbsp;       cities/

&nbsp;         page.tsx

&nbsp;         \[slug]/

&nbsp;           page.tsx

&nbsp;       enterprise/

&nbsp;         \[slug]/

&nbsp;           page.tsx

&nbsp;       compare/

&nbsp;         page.tsx

&nbsp;       favorites/

&nbsp;         page.tsx

&nbsp;       claim/

&nbsp;         \[enterpriseSlug]/

&nbsp;           page.tsx



&nbsp;     (admin)/

&nbsp;       admin/

&nbsp;         layout.tsx

&nbsp;         page.tsx

&nbsp;         enterprises/

&nbsp;           page.tsx

&nbsp;           new/

&nbsp;             page.tsx

&nbsp;           \[id]/

&nbsp;             edit/

&nbsp;               page.tsx

&nbsp;         categories/

&nbsp;           page.tsx

&nbsp;         cities/

&nbsp;           page.tsx



&nbsp;     api/                         # (optional) mock API routes if needed

&nbsp;       health/

&nbsp;         route.ts



&nbsp;     globals.css



&nbsp;   components/

&nbsp;     layout/

&nbsp;       Header.tsx

&nbsp;       Footer.tsx

&nbsp;       Breadcrumbs.tsx

&nbsp;     search/

&nbsp;       SearchBar.tsx

&nbsp;       FilterSidebar.tsx

&nbsp;       SortDropdown.tsx

&nbsp;     enterprise/

&nbsp;       EnterpriseCard.tsx

&nbsp;       EnterpriseGrid.tsx

&nbsp;       EnterpriseListRow.tsx

&nbsp;       EnterpriseHeader.tsx

&nbsp;       EnterpriseTabs.tsx

&nbsp;       GalleryCarousel.tsx

&nbsp;       ContactPanel.tsx

&nbsp;       BusinessHoursTable.tsx

&nbsp;       RelatedBusinesses.tsx

&nbsp;       ReviewsSection.tsx

&nbsp;     compare/

&nbsp;       CompareTable.tsx

&nbsp;     ui/

&nbsp;       Button.tsx

&nbsp;       Input.tsx

&nbsp;       Select.tsx

&nbsp;       Modal.tsx

&nbsp;       Badge.tsx

&nbsp;       Skeleton.tsx

&nbsp;       EmptyState.tsx

&nbsp;     common/

&nbsp;       RatingStars.tsx

&nbsp;       TagPills.tsx



&nbsp;   data/

&nbsp;     enterprises.mock.ts

&nbsp;     categories.mock.ts

&nbsp;     cities.mock.ts

&nbsp;     reviews.mock.ts



&nbsp;   lib/

&nbsp;     seo.ts

&nbsp;     slug.ts

&nbsp;     format.ts

&nbsp;     search.ts                 # search + filter + sort helpers

&nbsp;     time.ts                   # open-now calculation

&nbsp;     constants.ts



&nbsp;   store/

&nbsp;     favorites.store.ts

&nbsp;     compare.store.ts

&nbsp;     filters.store.ts



&nbsp;   types/

&nbsp;     enterprise.ts

&nbsp;     category.ts

&nbsp;     city.ts

&nbsp;     review.ts

```



\### 11) Acceptance Criteria (Frontend Phase)



\* Home loads in <2s with mock data

\* Search works with filters + sorting

\* Enterprise page is complete and has related businesses section

\* Favorites and compare persist on refresh

\* Admin pages can create/edit enterprise in local state (or in-memory store)

\* Clean UI responsive for mobile/tablet/desktop

\* No backend required; everything runs locally



\### 12) Seed Data Requirements



Provide at least:



\* 40 enterprises across multiple categories

\* 12 categories (Manufacturing, Logistics, IT Services, Restaurants, Clinics, Education, Beauty, Construction, Automotive, Retail, Tourism, Finance)

\* 10 cities

\* 120 reviews (randomly distributed)



\### 13) README Content



Include in README:



\* how to run (npm install, npm run dev)

\* how to change mock data

\* how SEO is handled

\* how to add a new category/city/enterprise

\* future API integration plan (placeholder)



---
Below is the **complete prompt converted into a ready-to-use Markdown (`.md`) file**.
You can **copy-paste this exactly** into a file named, for example:

```
FRONTEND_PROMPT_KOREABIZ_DIRECTORY.md
```

---

````md
# KoreaBiz Directory — Frontend Only Prompt

## 1. Project Goal

Build a **frontend-only business digital directory for South Korea** called **KoreaBiz Directory**.

The platform will:
- List **enterprises across South Korea**
- Provide **dedicated public pages** for every enterprise
- Show enterprise details, services, related businesses, and reviews
- Work entirely with **mock JSON data**
- Be ready for backend/API integration in later phases

This phase is **frontend-only** (no authentication, no backend).

---

## 2. Tech Stack (Mandatory)

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (global state: filters, favorites, compare)
- **React Hook Form + Zod** (forms)
- **shadcn/ui / Headless UI** (UI primitives)
- **Next/Image**
- ESLint + Prettier

---

## 3. UI / UX Requirements

- Clean directory-style UI (Google Business / Yelp inspired)
- Mobile-first & fully responsive
- SEO-friendly pages
- Enterprise pages must have unique metadata
- Dark mode support (preferred)
- Skeleton loaders for better UX

---

## 4. Application Routes (Next.js App Router)

### Public Routes

| Route | Description |
|------|------------|
| `/` | Home page (search, featured categories & businesses) |
| `/search` | Search results with filters & sorting |
| `/categories` | All categories |
| `/categories/[slug]` | Category details + enterprises |
| `/cities` | Cities listing |
| `/cities/[slug]` | City page + enterprises |
| `/enterprise/[slug]` | **Dedicated enterprise page** |
| `/compare` | Compare 2–4 enterprises |
| `/favorites` | Saved enterprises |
| `/claim/[enterpriseSlug]` | Claim business form |

### Admin (UI Only)

| Route | Description |
|------|------------|
| `/admin` | Admin dashboard |
| `/admin/enterprises` | Enterprises table |
| `/admin/enterprises/new` | Create enterprise |
| `/admin/enterprises/[id]/edit` | Edit enterprise |
| `/admin/categories` | Manage categories |
| `/admin/cities` | Manage cities |

> Admin pages only update **local state / mock data**

---

## 5. Enterprise Page Sections (Critical)

Each enterprise page must include:

- Overview (name, rating, tags, verified badge)
- About (description, founded year, employees)
- Products / Services
- Gallery (images)
- Location (address + map placeholder)
- Contact info
- Business hours
- Branches
- **Related businesses**
- Reviews (mock, local-only add)

---

## 6. Data Models (Mock JSON)

### Enterprise

```ts
{
  id: string;
  slug: string;
  name: string;
  legalName?: string;
  shortDescription: string;
  description: string;
  categories: { id; slug; name }[];
  tags: string[];
  ratingAvg: number;
  ratingCount: number;
  priceRange?: 1 | 2 | 3 | 4;
  verified: boolean;
  foundedYear?: number;
  employeeRange?: string;
  certifications: string[];
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    socials?: { type; url }[];
  };
  address: {
    country: "South Korea";
    city: string;
    district?: string;
    street: string;
    postalCode?: string;
    lat?: number;
    lng?: number;
  };
  hours: {
    mon..sun: { open; close; closed };
  };
  gallery: { url; alt }[];
  services: { name; description; priceFrom? }[];
  products: { name; description; sku? }[];
  branches?: { name; address; contact? }[];
  relatedEnterpriseSlugs?: string[];
  updatedAt: string;
}
````

### Category

```ts
{
  id: string;
  name: string;
  slug: string;
  icon?: string;
}
```

### City

```ts
{
  id: string;
  name: string;
  slug: string;
  region: string;
  heroImage?: string;
}
```

### Review

```ts
{
  id: string;
  enterpriseId: string;
  authorName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
```

---

## 7. Search, Filter & Sort (Client-Side)

### Search

* Name
* Description
* Tags
* Categories
* City

### Filters

* Category
* City
* Minimum rating
* Open now (based on hours)
* Tags (multi-select)

### Sorting

* Rating (desc)
* Newest
* Alphabetical

### Pagination

* Client-side pagination

---

## 8. Required Components

### Layout

* Header
* Footer
* Breadcrumbs

### Search & Listing

* SearchBar (autocomplete)
* FilterSidebar
* SortDropdown
* EnterpriseCard
* EnterpriseGrid
* EnterpriseListRow

### Enterprise

* EnterpriseHeader
* EnterpriseTabs
* GalleryCarousel
* ContactPanel
* BusinessHoursTable
* RelatedBusinesses
* ReviewsSection

### Compare

* CompareTable

### UI

* Button
* Input
* Select
* Modal
* Badge
* Skeleton
* EmptyState

### Common

* RatingStars
* TagPills

---

## 9. State Management (Zustand)

Stores:

* `favorites.store.ts` (persisted)
* `compare.store.ts`
* `filters.store.ts`

---

## 10. Forms

Use **React Hook Form + Zod**:

* Claim business
* Admin create/edit enterprise
* Add review (local only)

---

## 11. Project Structure (Mandatory)

```
koreabiz-directory/
├─ public/
│  └─ images/
├─ src/
│  ├─ app/
│  │  ├─ (public)/
│  │  ├─ (admin)/
│  │  └─ globals.css
│  ├─ components/
│  ├─ data/
│  ├─ lib/
│  ├─ store/
│  └─ types/
├─ tailwind.config.ts
├─ tsconfig.json
├─ next.config.js
└─ README.md
```

---

## 12. Seed Data Requirements

* 40+ enterprises
* 12 categories
* 10 cities
* 120 reviews

---

## 13. Acceptance Criteria

* Fully functional without backend
* Search, filters, favorites, compare working
* Enterprise pages complete
* Admin UI works with local state
* Responsive design
* Clean, readable, scalable code

---

## 14. README Must Include

* Setup instructions
* Mock data usage
* SEO handling
* How to add enterprises/categories
* Future API integration plan

---

## 15. Future-Ready Notes

* API layer can replace mock data
* Elasticsearch / Meilisearch ready
* Auth & subscriptions can be added later
* Multi-language support (KR / EN) planned

---

**End of Prompt**

```

---

### ✅ What you can do next
If you want, I can:
- Generate the **actual Next.js starter code** matching this prompt  
- Create **wireframes per page**
- Generate **mock data scripts**
- Convert this into a **Notion / PRD document**

Just tell me your next move 🚀
```





