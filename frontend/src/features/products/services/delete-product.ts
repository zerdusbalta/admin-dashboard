import { API_BASE_URL, getAuthHeaders } from "@/lib/api";

export async function deleteProduct(id: number) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
            ...getAuthHeaders(),
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to delete product.");
    }

    return data;
}