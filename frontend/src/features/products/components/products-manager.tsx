"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ProductForm from "./product-form";
import ProductsTable from "./products-table";
import { deleteProduct } from "../services/delete-product";
import type { Product } from "../types/product.types";

type ProductsManagerProps = {
    products: Product[];
};

export default function ProductsManager({
                                            products,
                                        }: ProductsManagerProps) {
    const router = useRouter();

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [actionError, setActionError] = useState("");
    const [actionSuccess, setActionSuccess] = useState("");

    function handleEdit(product: Product) {
        setSelectedProduct(product);
        setActionError("");
        setActionSuccess("");
    }

    function handleCancelEdit() {
        setSelectedProduct(null);
    }

    async function handleDelete(product: Product) {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${product.name}"?`
        );

        if (!confirmed) {
            return;
        }

        setActionError("");
        setActionSuccess("");

        try {
            await deleteProduct(product.id);

            if (selectedProduct?.id === product.id) {
                setSelectedProduct(null);
            }

            setActionSuccess("Product deleted successfully.");
            router.refresh();
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Failed to delete product.";

            setActionError(message);
        }
    }

    return (
        <div className="space-y-6">
            {actionError ? (
                <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                    {actionError}
                </div>
            ) : null}

            {actionSuccess ? (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    {actionSuccess}
                </div>
            ) : null}

            <ProductForm
                selectedProduct={selectedProduct}
                onCancelEditAction={handleCancelEdit}
            />

            <div className="pt-2">
                <ProductsTable
                    products={products}
                    onEditAction={handleEdit}
                    onDeleteAction={handleDelete}
                />
            </div>
        </div>
    );
}