import { API_BASE_URL, getAuthHeaders } from "@/lib/api";

type UpdateProductInput = {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
};

export async function updateProduct(input: UpdateProductInput) {
    const response = await fetch(`${API_BASE_URL}/products/${input.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
        },
        body: JSON.stringify({
            name: input.name,
            description: input.description,
            price: input.price,
            category: input.category,
            stock: input.stock,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update product.");
    }

    return data;
}