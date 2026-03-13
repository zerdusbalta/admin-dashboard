import { API_BASE_URL, getAuthHeaders } from "@/lib/api";

export async function transferPrimaryAdmin(id: number) {
    const response = await fetch(
        `${API_BASE_URL}/auth/users/${id}/transfer-primary-admin`,
        {
            method: "PUT",
            headers: {
                ...getAuthHeaders(),
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to transfer primary admin access.");
    }

    return data;
}