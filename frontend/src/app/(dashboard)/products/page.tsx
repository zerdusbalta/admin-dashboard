import ProductsManager from "../../../features/products/components/products-manager";
import ProductsPagination from "../../../features/products/components/products-pagination";
import { getProducts } from "../../../features/products/services/get-products";
import type { PaginatedProductsResponse } from "../../../features/products/types/product.types";

type ProductsPageProps = {
    searchParams?: Promise<{
        page?: string;
    }>;
};

export default async function ProductsPage({
                                               searchParams,
                                           }: ProductsPageProps) {
    const resolvedSearchParams = searchParams ? await searchParams : {};
    const rawPage = Number(resolvedSearchParams.page || "1");
    const currentPage = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

    let productsResponse: PaginatedProductsResponse | null = null;
    let hasError = false;

    try {
        productsResponse = await getProducts({
            page: currentPage,
            limit: 5,
        });
    } catch {
        hasError = true;
    }

    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Products</h1>
                <p className="mt-1 text-sm text-slate-500">
                    View and manage products from the backend API.
                </p>
            </div>

            {hasError || !productsResponse ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-5 text-sm text-rose-700 shadow-sm">
                    Could not connect to the backend. Make sure the backend server is running on port 4000.
                </div>
            ) : (
                <>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                            <div className="flex flex-col items-center text-center">
                                <p className="text-sm font-medium text-slate-500">Total Products</p>
                                <p className="mt-3 text-3xl font-bold text-slate-900">
                                    {productsResponse.total}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                            <div className="flex flex-col items-center text-center">
                                <p className="text-sm font-medium text-slate-500">Current Page</p>
                                <p className="mt-3 text-3xl font-bold text-slate-900">
                                    {productsResponse.page}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                            <div className="flex flex-col items-center text-center">
                                <p className="text-sm font-medium text-slate-500">Total Pages</p>
                                <p className="mt-3 text-3xl font-bold text-slate-900">
                                    {productsResponse.totalPages}
                                </p>
                            </div>
                        </div>
                    </div>

                    <ProductsManager products={productsResponse.data} />

                    <ProductsPagination
                        currentPage={productsResponse.page}
                        totalPages={productsResponse.totalPages}
                    />
                </>
            )}
        </section>
    );
}