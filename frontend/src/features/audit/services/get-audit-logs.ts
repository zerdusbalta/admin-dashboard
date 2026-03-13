import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/api";
import { AUTH_COOKIE_NAME } from "@/features/auth/utils/auth-session";
import type { PaginatedAuditLogsResponse } from "../types/audit-log.types";

type GetAuditLogsParams = {
    page?: number;
    limit?: number;
};

export async function getAuditLogs({
                                       page = 1,
                                       limit = 10,
                                   }: GetAuditLogsParams = {}): Promise<PaginatedAuditLogsResponse> {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    const response = await fetch(
        `${API_BASE_URL}/auth/audit-logs?page=${page}&limit=${limit}`,
        {
            cache: "no-store",
            headers: token
                ? {
                    Authorization: `Bearer ${token}`,
                }
                : {},
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch audit logs.");
    }

    return response.json();
}