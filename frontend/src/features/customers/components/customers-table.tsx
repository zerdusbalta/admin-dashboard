"use client";

import { useMemo, useState } from "react";
import StatusBadge from "@/components/shared/status-badge";
import Link from "next/link";

import Pagination from "@/components/shared/pagination";
import SearchInput from "@/components/shared/search-input";
import SortButton from "@/components/shared/sort-button";
import type { Customer } from "@/features/customers/types/customer.types";
import { paginateItems } from "@/lib/table/paginate";
import { searchCustomers } from "@/lib/table/search";
import { sortCustomers } from "@/lib/table/sort";
import type { CustomerSortKey, SortDirection } from "@/types/table.types";
import EmptyState from "@/components/shared/empty-state";

type CustomersTableProps = {
    customers: Customer[];
};

const PAGE_SIZE = 4;

export default function CustomersTable({
                                           customers,
                                       }: CustomersTableProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortKey, setSortKey] = useState<CustomerSortKey>("createdAt");
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredCustomers = useMemo(() => {
        return searchCustomers(customers, searchQuery);
    }, [customers, searchQuery]);

    const sortedCustomers = useMemo(() => {
        return sortCustomers({
            customers: filteredCustomers,
            sortKey,
            direction: sortDirection,
        });
    }, [filteredCustomers, sortDirection, sortKey]);

    const totalPages = Math.max(1, Math.ceil(sortedCustomers.length / PAGE_SIZE));

    const paginatedCustomers = useMemo(() => {
        return paginateItems(sortedCustomers, currentPage, PAGE_SIZE);
    }, [sortedCustomers, currentPage]);

    function handleSearchChange(value: string) {
        setSearchQuery(value);
        setCurrentPage(1);
    }

    function handleSortChange(nextSortKey: CustomerSortKey) {
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
            <div className="border-b border-slate-200 px-6 py-3">
                    <div className="w-full lg:max-w-xs">
                        <SearchInput
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search customers..."
                        />
                    </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                    <tr>
                        <th className="whitespace-nowrap px-6 py-3 text-left">
                            <SortButton
                                label="Name"
                                onClick={() => handleSortChange("name")}
                                isActive={sortKey === "name"}
                                direction={sortDirection}
                            />
                        </th>

                        <th className="whitespace-nowrap px-6 py-3 text-left">
                            <SortButton
                                label="Email"
                                onClick={() => handleSortChange("email")}
                                isActive={sortKey === "email"}
                                direction={sortDirection}
                            />
                        </th>

                        <th className="whitespace-nowrap px-6 py-3 text-left">
                            <SortButton
                                label="Company"
                                onClick={() => handleSortChange("company")}
                                isActive={sortKey === "company"}
                                direction={sortDirection}
                            />
                        </th>

                        <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Phone
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
                                label="Created At"
                                onClick={() => handleSortChange("createdAt")}
                                isActive={sortKey === "createdAt"}
                                direction={sortDirection}
                            />
                        </th>

                        <th className="whitespace-nowrap px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Actions
                        </th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200 bg-white">
                    {paginatedCustomers.length > 0 ? (
                        paginatedCustomers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-slate-50">
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                                    {customer.name}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                    {customer.email}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                    {customer.company}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                    {customer.phone}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                    <StatusBadge status={customer.status} />
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                    {customer.createdAt}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                    <Link
                                        href={`/customers/${customer.id}`}
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
                                    title="No customers found"
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