import { API_BASE_URL } from "../../../lib/api";
import type { PaginatedProductsResponse } from "../types/product.types";

type GetProductsParams = {
    page?: number;
    limit?: number;
};

export async function getProducts({
                                      page = 1,
                                      limit = 10,
                                  }: GetProductsParams = {}): Promise<PaginatedProductsResponse> {
    const response = await fetch(
        `${API_BASE_URL}/products?page=${page}&limit=${limit}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch products.");
    }

    return response.json();
}