"use client";

import { useMemo, useState } from "react";
import StatusBadge from "@/components/shared/status-badge";
import Pagination from "@/components/shared/pagination";
import SearchInput from "@/components/shared/search-input";
import SortButton from "@/components/shared/sort-button";
import type { Invoice } from "@/features/invoices/types/invoice.types";
import { paginateItems } from "@/lib/table/paginate";
import { searchInvoices } from "@/lib/table/search-invoices";
import { sortInvoices } from "@/lib/table/sort-invoices";
import type { InvoiceSortKey, SortDirection } from "@/types/table.types";
import Link from "next/link";
import EmptyState from "@/components/shared/empty-state";

type InvoicesTableProps = {
    invoices: Invoice[];
};

const PAGE_SIZE = 4;

export default function InvoicesTable({ invoices }: InvoicesTableProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortKey, setSortKey] = useState<InvoiceSortKey>("issuedAt");
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredInvoices = useMemo(() => {
        return searchInvoices(invoices, searchQuery);
    }, [invoices, searchQuery]);

    const sortedInvoices = useMemo(() => {
        return sortInvoices({
            invoices: filteredInvoices,
            sortKey,
            direction: sortDirection,
        });
    }, [filteredInvoices, sortDirection, sortKey]);

    const totalPages = Math.max(1, Math.ceil(sortedInvoices.length / PAGE_SIZE));

    const paginatedInvoices = useMemo(() => {
        return paginateItems(sortedInvoices, currentPage, PAGE_SIZE);
    }, [sortedInvoices, currentPage]);

    function handleSearchChange(value: string) {
        setSearchQuery(value);
        setCurrentPage(1);
    }

    function handleSortChange(nextSortKey: InvoiceSortKey) {
        if (sortKey === nextSortKey) {
            setSortDirection((prevDirection) =>
                prevDirection === "asc" ? "desc" : "asc"
            );
            return;
        }

        setSortKey(nextSortKey);
        setSortDirection("asc");
    }

    function handlePreviousPage() {
        if (currentPage === 1) {
            return;
        }

        setCurrentPage((prevPage) => prevPage - 1);
    }

    function handleNextPage() {
        if (currentPage === totalPages) {
            return;
        }

        setCurrentPage((prevPage) => prevPage + 1);
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">Invoices</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            View and manage invoice records.
                        </p>
                    </div>

                    <div className="w-full lg:max-w-xs">
                        <SearchInput
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search invoices..."
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                    <tr>
                        <th className="whitespace-nowrap px-6 py-3 text-left">
                            <SortButton
                                label="Invoice Number"
                                onClick={() => handleSortChange("invoiceNumber")}
                                isActive={sortKey === "invoiceNumber"}
                                direction={sortDirection}
                            />
                        </th>

                        <th className="whitespace-nowrap px-6 py-3 text-left">
                            <SortButton
                                label="Order Number"
                                onClick={() => handleSortChange("orderNumber")}
                                isActive={sortKey === "orderNumber"}
                                direction={sortDirection}
                            />
                        </th>

                        <th className="whitespace-nowrap px-6 py-3 text-left">
                            <SortButton
                                label="Customer"
                                onClick={() => handleSortChange("customerName")}
                                isActive={sortKey === "customerName"}
                                direction={sortDirection}
                            />
                        </th>

                        <th className="whitespace-nowrap px-6 py-3 text-left">
                            <SortButton
                                label="Amount"
                                onClick={() => handleSortChange("amount")}
                                isActive={sortKey === "amount"}
                                direction={sortDirection}
                            />
                        </th>

                        <th className="whitespace-nowrap px-6 py-3 text-left">
                            <SortButton
                                label="Status"
                                onClick={() => handleSortChange("status")}
                                isActive={sortKey === "status"}
                                direction={sortDirection}
                            />
                        </th>

                        <th className="whitespace-nowrap px-6 py-3 text-left">
                            <SortButton
                                label="Issued At"
                                onClick={() => handleSortChange("issuedAt")}
                                isActive={sortKey === "issuedAt"}
                                direction={sortDirection}
                            />
                        </th>

                        <th className="whitespace-nowrap px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Actions
                        </th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200 bg-white">
                    {paginatedInvoices.length > 0 ? (
                        paginatedInvoices.map((invoice) => (
                            <tr key={invoice.id} className="hover:bg-slate-50">
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                                    {invoice.invoiceNumber}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                    {invoice.orderNumber}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                    {invoice.customerName}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                    ${invoice.amount}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                    <StatusBadge status={invoice.status} />
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                    {invoice.issuedAt}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                    <Link
                                        href={`/invoices/${invoice.id}`}
                                        className="font-medium text-slate-900 transition hover:text-slate-600"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>
                                <EmptyState
                                    title="No invoices found"
                                    description="Try adjusting your search or sorting filters."
                                />
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevious={handlePreviousPage}
                onNext={handleNextPage}
            />
        </div>
    );
}