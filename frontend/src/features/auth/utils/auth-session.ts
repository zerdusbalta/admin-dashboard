export const AUTH_COOKIE_NAME = "admin-dashboard-session";

export const PAGE_TITLES: Record<string, { title: string; description: string }> = {
    "/": {
        title: "Dashboard",
        description: "Manage customers, orders and invoices",
    },
    "/customers": {
        title: "Customers",
        description: "View and manage your customer list",
    },
    "/orders": {
        title: "Orders",
        description: "View and manage customer orders",
    },
    "/invoices": {
        title: "Invoices",
        description: "View and manage invoice records",
    },
    "/profile": {
        title: "Profile",
        description: "View your account information and role details",
    },
};

export function setAuthToken(token: string) {
    if (typeof document === "undefined") {
        return;
    }

    document.cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(token)}; path=/; max-age=3600; samesite=lax`;
}

export function getAuthTokenFromBrowser() {
    if (typeof document === "undefined") {
        return null;
    }

    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
        const [name, ...valueParts] = cookie.split("=");

        if (name === AUTH_COOKIE_NAME) {
            return decodeURIComponent(valueParts.join("="));
        }
    }

    return null;
}

export function clearAuthToken() {
    if (typeof document === "undefined") {
        return;
    }

    document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
}