import { API_BASE_URL } from "@/lib/api";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/features/auth/utils/auth-session";
import type { PaginatedUsersResponse } from "../types/user.types";

export async function getUsers(): Promise<PaginatedUsersResponse> {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    const response = await fetch(`${API_BASE_URL}/auth/users`, {
        cache: "no-store",
        headers: token
            ? {
                Authorization: `Bearer ${token}`,
            }
            : {},
    });

    if (!response.ok) {
        throw new Error("Failed to fetch users.");
    }

    return response.json();
}