export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    createdAt: string;
    updatedAt: string;
};

export type PaginatedProductsResponse = {
    data: Product[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};