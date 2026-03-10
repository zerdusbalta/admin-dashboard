import { NextRequest, NextResponse } from "next/server";

import { AUTH_COOKIE_NAME } from "@/features/auth/utils/auth-session";

const protectedRoutes = ["/", "/customers", "/orders", "/invoices", "/profile"];
const authRoutes = ["/login"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const authCookie = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const isAuthenticated = authCookie === "true";

    const isProtectedRoute = protectedRoutes.includes(pathname);
    const isAuthRoute = authRoutes.includes(pathname);

    if (!isAuthenticated && isProtectedRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isAuthenticated && isAuthRoute) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login", "/customers", "/orders", "/invoices", "/profile"],
};