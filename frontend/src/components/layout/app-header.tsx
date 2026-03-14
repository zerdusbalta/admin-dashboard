"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import UserAvatar from "@/components/shared/user-avatar";
import {
    AUTH_COOKIE_NAME,
    PAGE_TITLES,
    clearAuthToken,
    getAuthUserFromBrowser,
} from "@/features/auth/utils/auth-session";

export default function AppHeader() {
    const pathname = usePathname();
    const router = useRouter();
    const currentUser = getAuthUserFromBrowser();

    const currentPage = PAGE_TITLES[pathname] ?? {
        title: "Dashboard",
        description: "Manage customers, orders and invoices",
    };

    function handleLogout() {
        document.cookie = `${AUTH_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        clearAuthToken();
        router.push("/login");
        router.refresh();
    }

    const displayName = currentUser?.email ?? "Unknown User";

    return (
        <header className="border-b border-slate-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-base font-semibold text-slate-900">
                        {currentPage.title}
                    </h1>
                    <p className="text-sm text-slate-500">{currentPage.description}</p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/profile"
                        className="hidden rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 sm:inline-flex"
                    >
                        Profile
                    </Link>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-lg border border-slate-900 bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                        Logout
                    </button>

                    <div className="hidden text-right sm:block">
                        <p className="text-sm font-medium text-slate-800">{displayName}</p>
                        <p className="text-xs text-slate-500">
                            {currentUser?.role ?? "Unknown role"}
                        </p>
                    </div>

                    <UserAvatar name={displayName} size="sm" />
                </div>
            </div>
        </header>
    );
}