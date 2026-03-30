import { NextRequest, NextResponse } from "next/server";

/**
 * Next.js Middleware — runs on every matched route before the page renders.
 *
 * Strategy:
 *   - We check for the auth token in localStorage via a cookie fallback.
 *     Since middleware runs server-side and can't access localStorage,
 *     we rely on the presence of the "koreabiz-auth-token" cookie.
 *     The AuthProvider sets this cookie client-side when tokens are stored.
 *   - Protected routes (/dashboard/*, /admin/*) redirect to /login if no token.
 *   - Auth routes (/login, /register) redirect to / if already logged in.
 *
 * NOTE: This is a thin server-side gate. The real auth check (token validity,
 * role enforcement) happens client-side in the layout auth guards, since
 * the middleware can only detect the token's presence, not verify it.
 */

const AUTH_ROUTES = ["/login", "/register"];
const PROTECTED_PREFIXES = ["/dashboard", "/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("koreabiz-auth-token")?.value;

  // If user has a token and tries to visit auth pages → redirect to home
  if (token && AUTH_ROUTES.some((r) => pathname === r)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user has NO token and tries to visit protected pages → redirect to login
  if (
    !token &&
    PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};
