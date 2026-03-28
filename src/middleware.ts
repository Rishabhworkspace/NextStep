import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  const isAuthenticated = !!session;

  // Public routes that don't require authentication
  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/skill-gap/quiz");

  // Protected routes require authentication
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Prevent authenticated users from visiting login/signup (but allow onboarding)
  if (isAuthenticated && (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/signup"))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Onboarding gate: if authenticated + NOT on onboarding page + NOT an API route,
  // check if profile exists. If not → force onboarding.
  if (
    isAuthenticated &&
    !pathname.startsWith("/auth/onboarding") &&
    !pathname.startsWith("/api") &&
    pathname !== "/"
  ) {
    try {
      const { data } = await betterFetch<{ exists: boolean }>(
        "/api/profile/check",
        {
          baseURL: request.nextUrl.origin,
          headers: {
            cookie: request.headers.get("cookie") || "",
          },
        },
      );

      if (data && !data.exists) {
        return NextResponse.redirect(new URL("/auth/onboarding", request.url));
      }
    } catch {
      // If the check fails, let them through rather than blocking
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
