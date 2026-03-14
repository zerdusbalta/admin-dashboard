export const AUTH_COOKIE_NAME = "admin-dashboard-session";
export const AUTH_USER_COOKIE_NAME = "admin-dashboard-user";

export type AuthUser = {
    id: number;
    email: string;
    role: "admin" | "editor" | "staff";
    isPrimaryAdmin?: boolean;
};

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
    "/products": {
        title: "Products",
        description: "View and manage products from the backend API.",
    },
    "/profile": {
        title: "Profile",
        description: "View your account information and role details",
    },
    "/audit-logs": {
        title: "Audit Logs",
        description: "Review recent activity across products and users",
    },
    "/users": {
        title: "Users",
        description: "View, create, update, and remove dashboard users",
    },
};

export function setAuthSession(token: string, user: AuthUser) {
    if (typeof document === "undefined") {
        return;
    }

    document.cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(token)}; path=/; max-age=3600; samesite=lax`;
    document.cookie = `${AUTH_USER_COOKIE_NAME}=${encodeURIComponent(
        JSON.stringify(user)
    )}; path=/; max-age=3600; samesite=lax`;
}

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

export function getAuthUserFromBrowser(): AuthUser | null {
    if (typeof document === "undefined") {
        return null;
    }

    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
        const [name, ...valueParts] = cookie.split("=");

        if (name === AUTH_USER_COOKIE_NAME) {
            try {
                return JSON.parse(decodeURIComponent(valueParts.join("="))) as AuthUser;
            } catch {
                return null;
            }
        }
    }

    return null;
}

export function clearAuthToken() {
    if (typeof document === "undefined") {
        return;
    }

    document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
    document.cookie = `${AUTH_USER_COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
}