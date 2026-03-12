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
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [actionError, setActionError] = useState("");
    const [actionSuccess, setActionSuccess] = useState("");

    function handleOpenCreate() {
        setSelectedProduct(null);
        setShowCreateForm(true);
        setActionError("");
        setActionSuccess("");
    }

    function handleEdit(product: Product) {
        setSelectedProduct(product);
        setShowCreateForm(true);
        setActionError("");
        setActionSuccess("");
    }

    function handleCloseForm() {
        setSelectedProduct(null);
        setShowCreateForm(false);
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
                setShowCreateForm(false);
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

            <div className="flex justify-end">
                {!showCreateForm ? (
                    <button
                        type="button"
                        onClick={handleOpenCreate}
                        className="inline-flex h-10 items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                        Create Product
                    </button>
                ) : null}
            </div>

            {showCreateForm ? (
                <ProductForm
                    selectedProduct={selectedProduct}
                    onCancelEditAction={handleCloseForm}
                />
            ) : null}

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