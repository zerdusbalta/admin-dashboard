import { API_BASE_URL, getAuthHeaders } from "@/lib/api";

type CreateProductInput = {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
};

export async function createProduct(input: CreateProductInput) {
    const response = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
        },
        body: JSON.stringify(input),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to create product.");
    }

    return data;
}