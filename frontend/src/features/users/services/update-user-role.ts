import { API_BASE_URL, getAuthHeaders } from "@/lib/api";

type UpdateUserRoleInput = {
    id: number;
    role: "admin" | "editor" | "staff";
};

export async function updateUserRole(input: UpdateUserRoleInput) {
    const response = await fetch(`${API_BASE_URL}/auth/users/${input.id}/role`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
        },
        body: JSON.stringify({
            role: input.role,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update user role.");
    }

    return data;
}