# Digital Directory — Frontend Implementation Plan

> **Current State:** UI prototype is visually complete (27 pages, 34 components), all 15 Zustand stores + types are 100% aligned with backend. **Phase 1 (Auth Foundation), Phase 2 (Public Pages), and Phase 3 (Business Owner Dashboard) are COMPLETE.** All public pages and dashboard pages now call real backend APIs with loading states; auth system is fully wired with JWT tokens, middleware protection, and auth-aware header.

> **Goal:** Wire remaining pages to real backend APIs (dashboard, admin), add payment flows, real-time notifications, and validate everything end-to-end.

---

## Phase 1: Auth Foundation ✅ COMPLETE

Everything else (dashboard, admin, API calls) depends on a working auth system.

### ✅ 1.1 — Auth Provider Component
- **File:** `src/components/providers/AuthProvider.tsx`
- **What:** Client component that wraps the app, calls `fetchCurrentUser()` on mount (from `auth.store.ts`), provides loading/hydration state

### ✅ 1.2 — Wire Auth Provider into Root Layout
- **File:** `src/app/layout.tsx`
- **What:** Wrapped `{children}` with `<AuthProvider>`

### ✅ 1.3 — Create Auth Pages (5 pages)
| Page | Route | Store Method | Status |
|------|-------|-------------|--------|
| Login | `/login/page.tsx` | `auth.login()` | ✅ |
| Register | `/register/page.tsx` | `auth.register()` | ✅ |
| Forgot Password | `/forgot-password/page.tsx` | `auth.forgotPassword()` | ✅ |
| Reset Password | `/reset-password/page.tsx` | `auth.resetPassword()` | ✅ |
| Verify Email | `/auth/verify-email/page.tsx` | `auth.verifyEmail()` | ✅ |

### ✅ 1.4 — Next.js Middleware for Route Protection
- **File:** `src/middleware.ts`
- **What:** Checks for auth token cookie; redirects unauthenticated users from `/dashboard/*`, `/admin/*` to `/login`; redirects logged-in users from `/login`, `/register` to `/`

### ✅ 1.5 — Protect Dashboard & Admin Layouts
- **File:** `src/app/dashboard/layout.tsx` — AuthGuard wrapper
- **File:** `src/app/admin/layout.tsx` — AuthGuard with `allowedRoles={["admin", "super_admin"]}`

### ✅ 1.6 — Update Header with Auth State
- **File:** `src/components/layout/Header.tsx`
- **What:** Shows Login/Register buttons when logged out; user dropdown (Dashboard, Admin Panel if admin, Sign out) when logged in

### ✅ 1.7 — Test Auth
- [x] Register a new user → user created with business_owner role
- [x] Verify email via DB token → success
- [x] Login with verified user → JWT token received
- [x] /auth/me → returns authenticated user data
- [x] Forgot password → 200
- [x] Logout → 200, token cleared
- [x] `npx tsc --noEmit` → 0 errors
- [x] `npm run build` → 32 routes compiled

---

## Phase 2: Public Pages — Wire to Real API ✅ COMPLETE

All mock data imports replaced with real Zustand store calls on all public pages.

### ✅ 2.1 — Home Page (`/`)
- **File:** `src/app/page.tsx`
- **Change:** Converted to client component; calls `useBusinessesStore.fetchBusinesses()`, `useCategoriesStore.fetchCategories()`, `useLocationsStore.fetchCities()` in `useEffect`; loading skeletons for all sections

### ✅ 2.2 — Categories List (`/categories`)
- **File:** `src/app/categories/page.tsx`
- **Change:** `useCategoriesStore.fetchCategories()` + `useBusinessesStore.fetchBusinesses()` for counts; loading skeletons

### ✅ 2.3 — Category Detail (`/categories/[slug]`)
- **File:** `src/app/categories/[slug]/page.tsx`
- **Change:** `useCategoriesStore.fetchCategories()` + `useBusinessesStore.fetchBusinesses()`; find category by slug; loading skeleton; notFound handling

### ✅ 2.4 — Cities List (`/cities`)
- **File:** `src/app/cities/page.tsx`
- **Change:** `useLocationsStore.fetchCities()` + `useBusinessesStore.fetchBusinesses()` for counts; loading skeletons

### ✅ 2.5 — City Detail (`/cities/[slug]`)
- **File:** `src/app/cities/[slug]/page.tsx`
- **Change:** `useLocationsStore.fetchCities()` + `useBusinessesStore.fetchBusinesses()`; find city by ID; loading skeleton; notFound handling

### ✅ 2.6 — Search (`/search`)
- **File:** `src/app/search/page.tsx`
- **Change:** `useSearchStore.search(params)` for results; `useCategoriesStore` and `useLocationsStore` for filter dropdowns; Suspense wrapper for useSearchParams; loading skeletons

### ✅ 2.7 — Business Detail (`/enterprises/[slug]`)
- **File:** `src/app/enterprises/[slug]/page.tsx`
- **Change:** `useBusinessesStore.fetchBusinessById(id)` + `useReviewsStore.fetchBusinessReviews(id)`; loading skeleton; cleanup on unmount

### ✅ 2.8 — ReviewsSection & RelatedBusinesses Components
- **File:** `src/components/enterprise/ReviewsSection.tsx` — Uses `useReviewsStore.fetchBusinessReviews()`; loading skeleton
- **File:** `src/components/enterprise/RelatedBusinesses.tsx` — Uses `useBusinessesStore` for related businesses

### ✅ 2.9 — Favorites (`/favorites`)
- **File:** `src/app/favorites/page.tsx`
- **Change:** `useBusinessesStore.fetchBusinesses()` + favorites store IDs; loading skeletons

### ✅ 2.10 — Compare (`/compare`)
- **File:** `src/app/compare/page.tsx`
- **Change:** `useBusinessesStore.fetchBusinesses()` + compare store IDs

### ✅ 2.11 — Pricing (`/pricing`)
- **File:** `src/app/pricing/page.tsx`
- **Change:** `useSubscriptionsStore.fetchPlans()` on mount (hardcoded fallback packages for UI richness until backend plans are fully populated)

### ✅ 2.12 — Claim/Register Business (`/claim`)
- **File:** `src/app/claim/page.tsx`
- **Change:** `useBusinessesStore.createBusiness()` on submit; `useCategoriesStore.fetchCategories()` + `useLocationsStore.fetchCountries/fetchCities()` for dropdowns; replaced text city field with country/city selects; error display

### ✅ 2.13 — Test Public Pages
- [x] Home page loads real businesses (9), categories (12), cities (26) from backend
- [x] All public pages return HTTP 200
- [x] Category detail page renders with real slug (`/categories/healthcare`)
- [x] Search page calls backend `/search` endpoint (note: backend search has a SQL bug — independent issue)
- [x] Reviews API returns 20 reviews
- [x] Subscription plans API returns 10 plans
- [x] Countries API returns 10 countries
- [x] `npx tsc --noEmit` → 0 errors
- [x] `npm run build` → 32 routes compiled successfully

---

## Phase 3: Business Owner Dashboard — Wire to Real API ✅ COMPLETE

All dashboard pages now call real backend APIs via Zustand stores. Mock/hardcoded data has been fully replaced.

### ✅ 3.1 — Dashboard Home (`/dashboard`)
- **Change:** `useBusinessesStore.fetchMyBusinesses()` + `useReviewsStore.fetchBusinessReviews()` + `fetchProducts()` for stats
- Real stats: avg rating, product count, review count, business status
- Profile completion computed from real business data fields
- Recent reviews from API with `formatRelativeTime()`
- Loading skeleton while data loads

### ✅ 3.2 — Business Profile Editor (`/dashboard/profile`)
- **Change:** `useBusinessesStore.fetchMyBusinesses()` → populate form → `updateBusiness()` on save
- `useCategoriesStore.fetchCategories()` and `useLocationsStore.fetchCities()` for real dropdowns
- Edit/cancel mode with form state reset
- Sidebar shows real status, last updated, member since dates

### ✅ 3.3 — Services Management (`/dashboard/services`)
- **Change:** `useBusinessesStore.fetchServices(businessId)` → list; `deleteService()` for delete
- Search filter on real data; empty state with CTA
- Loading skeletons

### ✅ 3.4 — Products Management (`/dashboard/products`)
- **Change:** `useBusinessesStore.fetchProducts(businessId)` → list; `deleteProduct()` for delete
- Grid/list view toggle with real product data; SKU display; `formatCurrency()` for prices
- Loading skeletons

### ✅ 3.5 — Products Create (`/dashboard/products/new`)
- **Change:** `useBusinessesStore.createProduct()` on save → redirect to products list
- Form: name, SKU, description, price

### ✅ 3.6 — Gallery/Media Management (`/dashboard/gallery`)
- **Change:** `useBusinessesStore.fetchMedia(businessId)` → display; `uploadMedia()`, `deleteMedia()`
- File upload via hidden input + ref; multi-file upload; real image display
- Loading skeleton; empty state

### ✅ 3.7 — Reviews View (`/dashboard/reviews`)
- **Change:** `useReviewsStore.fetchBusinessReviews(businessId)` → display
- Stats: total reviews, avg rating from real data
- Uses `review.authorName` and `formatRelativeTime(review.createdAt)`
- Loading skeleton; empty state

### ✅ 3.8 — Analytics (`/dashboard/analytics`)
- **Change:** Computed from real reviews + products + services data
- Stats: avg rating, total reviews, products count, services count
- Rating distribution bar chart from real review data

### ✅ 3.9 — Settings (`/dashboard/settings`)
- **Change:** `useBusinessesStore.updateBusiness()` for display name; `activateBusiness()`/`deactivateBusiness()` for visibility toggle
- `useAuthStore.changePassword()` for password change
- Loading skeleton

### ✅ 3.10 — Branches (`/dashboard/branches`) — NEW PAGE
- **Change:** `useBusinessesStore.fetchBranches(businessId)` → list; `createBranch()`, `deleteBranch()`
- Inline add form with city dropdown from `useLocationsStore.fetchCities()`
- Shows address, city, phone, operating hours

### ✅ 3.11 — Services Create (`/dashboard/services/new`) — NEW PAGE
- **Change:** `useBusinessesStore.createService()` on save → redirect to services list
- Form: title, description, price

### ✅ 3.12 — Test Dashboard
- [x] `npx tsc --noEmit` → 0 errors
- [x] `npm run build` → 34 routes compiled (2 new: branches, services/new)
- [x] All pages use real API stores, no hardcoded mock data remaining

---

## Phase 4: Admin Panel — Wire to Real API

### 4.1 — Admin Dashboard (`/admin`)
- **Change to:** `useAdminStore.fetchDashboard()` + `useAdminStore.fetchRecentActivity()`
- Render real stats, recent activity feed

### 4.2 — Admin Businesses (`/admin/businesses`)
- **Change to:** `useAdminStore.fetchBusinesses()` with filters; approve/reject/suspend/reinstate actions

### 4.3 — Admin Categories (`/admin/categories`)
- **Change to:** `useCategoriesStore.fetchCategories()` + CRUD (`createCategory()`, `updateCategory()`, `deleteCategory()`)

### 4.4 — Admin Cities (`/admin/cities`)
- **Change to:** `useLocationsStore.fetchCities()` + CRUD

### 4.5 — Admin Reviews (`/admin/reviews`)
- **Change to:** `useAdminStore.fetchReviews()` + `deleteReview()`

### 4.6 — Admin Analytics (`/admin/analytics`)
- **Change to:** `useAdminStore.fetchRevenueAnalytics()` + `useAdminStore.fetchDashboard()`

### 4.7 — Create Missing Admin Pages
| Page | Route | Store Methods |
|------|-------|--------------|
| Users | `/admin/users/page.tsx` | `useAdminStore.fetchUsers()`, `deactivateUser()`, `reinstateUser()`, `deleteUser()`, `resetUserPassword()` |
| Plans | `/admin/plans/page.tsx` | `useAdminStore.fetchPlans()`, `createPlan()`, `updatePlan()`, `deletePlan()` |
| Payments | `/admin/payments/page.tsx` | `useAdminStore.fetchPayments()` with filters |
| Subscriptions | `/admin/subscriptions/page.tsx` | `useAdminStore.fetchSubscriptions()` with filters |
| Audit Logs | `/admin/audit-logs/page.tsx` | `useAdminStore.fetchAuditLogs()` with filters |
| Notifications | `/admin/notifications/page.tsx` | `useAdminStore.broadcastNotification()`, `fetchNotificationLogs()`, `retryFailedNotifications()` |
| Roles | `/admin/roles/page.tsx` | `useRolesStore.fetchRoles()`, CRUD + assign permissions |
| Permissions | `/admin/permissions/page.tsx` | `useRolesStore.fetchPermissions()`, CRUD |
| Countries | `/admin/countries/page.tsx` | `useLocationsStore.fetchCountries()`, CRUD |

### 4.8 — Admin Settings (`/admin/settings`)
- Wire to any system settings or keep as admin profile management

### 4.9 — Test Admin Panel
- [ ] Dashboard shows real stats from backend
- [ ] Business moderation flow works (list → approve → reject → suspend → reinstate)
- [ ] User management works (list → deactivate → reinstate → delete → reset password)
- [ ] Plans CRUD works
- [ ] Category / city / country CRUD works
- [ ] Review moderation works
- [ ] Audit log browsing works
- [ ] Revenue analytics display real data
- [ ] Notification broadcast works
- [ ] Roles & permissions management works

---

## Phase 5: Subscription & Payment Flow

### 5.1 — Checkout Flow
- **Page:** `/checkout/page.tsx` (new)
- **What:** Select plan → `useSubscriptionsStore.createCheckout()` → redirect to Stripe
- **Callbacks:** `/checkout/success/page.tsx`, `/checkout/cancel/page.tsx`

### 5.2 — Stripe Webhook (Backend already handles it)
- Frontend just needs to poll/refresh subscription status after redirect back

### 5.3 — Test Payments
- [ ] Checkout creates Stripe session and redirects
- [ ] Success page shows confirmation
- [ ] Subscription appears in owner dashboard
- [ ] Admin can view payment/subscription data

---

## Phase 6: Real-Time Notifications

### 6.1 — Wire Notification Bell
- **Component:** Add notification bell to Header
- **Store:** `useNotificationsStore.connect()` on login, `disconnect()` on logout
- **Display:** Dropdown with real-time notifications, unread count badge

### 6.2 — Test Notifications
- [ ] WebSocket connects on login
- [ ] Admin broadcast reaches connected users
- [ ] Notification bell updates in real-time
- [ ] Mark as read works

---

## Phase 7: Polish & Final Testing

### 7.1 — Error Handling
- Add toast/notification system for API errors and success messages
- Handle 401 redirects gracefully (already in api.ts token refresh)
- Handle network errors with retry UI

### 7.2 — Loading States
- Ensure every page shows loading skeletons (existing Skeleton component) while fetching
- Disabled states on buttons during form submissions

### 7.3 — Form Validation
- Client-side validation matching backend DTOs
- Display backend validation errors (field-level)

### 7.4 — SEO & Metadata
- Add proper `<title>` and meta tags to each page
- Dynamic metadata for business detail pages

### 7.5 — Responsive Testing
- Verify all pages work on mobile/tablet/desktop
- Test admin sidebar collapse behavior

### 7.6 — End-to-End Test Checklist
- [ ] **Visitor flow:** Home → Browse categories → Browse cities → Search → View business detail → Read reviews
- [ ] **Register flow:** Register → Verify email → Login → See dashboard
- [ ] **Owner flow:** Login → Claim business → Edit profile → Add services/products → Upload media → Manage hours/branches/socials → View reviews → Subscribe to plan → View payment history
- [ ] **Admin flow:** Login as admin → Dashboard stats → Moderate businesses → Manage users → CRUD categories/cities/countries → CRUD plans → Review management → View audit logs → Revenue analytics → Broadcast notifications → Manage roles/permissions
- [ ] **Payment flow:** Owner selects plan → Stripe checkout → Redirect back → Subscription active
- [ ] **Auth edge cases:** Token expiry + refresh → Logout → Access denied pages → Forgot/reset password

---

## Implementation Priority Order

```
Phase 1 (Auth)        → MUST do first, everything depends on it
Phase 2 (Public)      → Highest user-facing value
Phase 3 (Dashboard)   → Business owner core functionality
Phase 4 (Admin)       → Platform management
Phase 5 (Payments)    → Revenue feature
Phase 6 (Realtime)    → Nice-to-have polish
Phase 7 (Polish)      → Production readiness
```

## File Count Estimate

| Phase | New Files | Files to Modify | 
|-------|-----------|----------------|
| Phase 1 — Auth | ~7 | ~4 |
| Phase 2 — Public Pages | 0 | ~13 |
| Phase 3 — Dashboard | ~9 | ~8 |
| Phase 4 — Admin | ~9 | ~8 |
| Phase 5 — Payments | ~3 | ~1 |
| Phase 6 — Notifications | ~1 | ~1 |
| Phase 7 — Polish | ~2 | ~10+ |
| **Total** | **~31** | **~45+** |
