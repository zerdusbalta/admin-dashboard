"use client";

import type { Product } from "../types/product.types";

type ProductsTableProps = {
    products: Product[];
    onEditAction: (product: Product) => void;
    onDeleteAction: (product: Product) => void;
};

export default function ProductsTable({
                                          products,
                                          onEditAction,
                                          onDeleteAction,
                                      }: ProductsTableProps) {
    if (products.length === 0) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-500 shadow-sm">
                No products found.
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                    <tr>
                        <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Product
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Category
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Price
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Stock
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Description
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Actions
                        </th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200 bg-white">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 align-top">
                                <p className="text-sm font-semibold text-slate-900">
                                    {product.name}
                                </p>
                                <p className="mt-1 text-xs text-slate-400">
                                    ID: {product.id}
                                </p>
                                <div className="mt-2 space-y-1 text-xs text-slate-500">
                                    <p>Created by user #{product.createdBy}</p>
                                    <p>Updated by user #{product.updatedBy}</p>
                                </div>
                            </td>

                            <td className="whitespace-nowrap px-6 py-4 align-top text-sm text-slate-600">
                                {product.category || "—"}
                            </td>

                            <td className="whitespace-nowrap px-6 py-4 align-top text-sm font-medium text-slate-900">
                                ${product.price.toFixed(2)}
                            </td>

                            <td className="whitespace-nowrap px-6 py-4 align-top">
                                    <span
                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                            product.stock > 10
                                                ? "bg-emerald-100 text-emerald-700"
                                                : product.stock > 0
                                                    ? "bg-amber-100 text-amber-700"
                                                    : "bg-rose-100 text-rose-700"
                                        }`}
                                    >
                                        {product.stock}
                                    </span>
                            </td>

                            <td className="px-6 py-4 align-top text-sm text-slate-600">
                                <div className="max-w-[260px] truncate">
                                    {product.description || "—"}
                                </div>
                            </td>

                            <td className="whitespace-nowrap px-6 py-4 align-top">
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() => onEditAction(product)}
                                        className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-300 bg-white px-3.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => onDeleteAction(product)}
                                        className="inline-flex h-9 items-center justify-center rounded-lg border border-rose-200 bg-white px-3.5 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}