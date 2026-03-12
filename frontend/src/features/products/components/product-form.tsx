"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createProduct } from "../services/create-product";
import { updateProduct } from "../services/update-product";
import type { Product } from "../types/product.types";

type ProductFormProps = {
    selectedProduct: Product | null;
    onCancelEditAction: () => void;
};

export default function ProductForm({
                                        selectedProduct,
                                        onCancelEditAction,
                                    }: ProductFormProps) {
    const router = useRouter();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const isEditMode = selectedProduct !== null;

    useEffect(() => {
        if (selectedProduct) {
            setName(selectedProduct.name);
            setDescription(selectedProduct.description || "");
            setPrice(String(selectedProduct.price));
            setCategory(selectedProduct.category || "");
            setStock(String(selectedProduct.stock));
            setError("");
            setSuccess("");
            return;
        }

        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setStock("");
        setError("");
        setSuccess("");
    }, [selectedProduct]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!name.trim() || !price.trim()) {
            setError("Name and price are required.");
            return;
        }

        setLoading(true);

        try {
            if (isEditMode && selectedProduct) {
                await updateProduct({
                    id: selectedProduct.id,
                    name: name.trim(),
                    description: description.trim(),
                    price: Number(price),
                    category: category.trim(),
                    stock: Number(stock || 0),
                });

                router.refresh();
                onCancelEditAction();
                return;
            }

            await createProduct({
                name: name.trim(),
                description: description.trim(),
                price: Number(price),
                category: category.trim(),
                stock: Number(stock || 0),
            });

            router.refresh();
            onCancelEditAction();
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Something went wrong.";

            setError(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        {isEditMode ? "Edit Product" : "Create Product"}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        {isEditMode
                            ? "Update the selected product."
                            : "Add a new product to the backend database."}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onCancelEditAction}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                    {isEditMode ? "Cancel Edit" : "Close"}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Product name"
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Category
                        </label>
                        <input
                            type="text"
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                            placeholder="Category"
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Price
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                            placeholder="0.00"
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Stock
                        </label>
                        <input
                            type="number"
                            value={stock}
                            onChange={(event) => setStock(event.target.value)}
                            placeholder="0"
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Product description"
                        rows={4}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                    />
                </div>

                {error ? (
                    <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                        {error}
                    </div>
                ) : null}

                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex h-10 min-w-[132px] items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading
                        ? isEditMode
                            ? "Updating..."
                            : "Creating..."
                        : isEditMode
                            ? "Update Product"
                            : "Create Product"}
                </button>
            </form>
        </div>
    );
}