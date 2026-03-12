import {
    AUTH_COOKIE_NAME,
    getAuthTokenFromBrowser,
} from "@/features/auth/utils/auth-session";

export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export { AUTH_COOKIE_NAME };

export function getAuthHeaders(): Record<string, string> {
    const token = getAuthTokenFromBrowser();

    if (!token) {
        return {};
    }

    return {
        Authorization: `Bearer ${token}`,
    };
}