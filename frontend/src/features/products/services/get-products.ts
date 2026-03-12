import { cookies } from "next/headers";
import { API_BASE_URL, AUTH_COOKIE_NAME } from "@/lib/api";
import type { PaginatedProductsResponse } from "../types/product.types";

type GetProductsParams = {
    page?: number;
    limit?: number;
};

export async function getProducts({
                                      page = 1,
                                      limit = 10,
                                  }: GetProductsParams = {}): Promise<PaginatedProductsResponse> {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    const response = await fetch(
        `${API_BASE_URL}/products?page=${page}&limit=${limit}`,
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
        throw new Error("Failed to fetch products.");
    }

    return response.json();
}