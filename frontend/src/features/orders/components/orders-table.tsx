"use client";

import { useMemo, useState } from "react";
import StatusBadge from "@/components/shared/status-badge";
import Pagination from "@/components/shared/pagination";
import SearchInput from "@/components/shared/search-input";
import SortButton from "@/components/shared/sort-button";
import type { Order } from "@/features/orders/types/order.types";
import { paginateItems } from "@/lib/table/paginate";
import { searchOrders } from "@/lib/table/search-orders";
import { sortOrders } from "@/lib/table/sort-orders";
import type { OrderSortKey, SortDirection } from "@/types/table.types";
import Link from "next/link";
import EmptyState from "@/components/shared/empty-state";

type OrdersTableProps = {
    orders: Order[];
};

const PAGE_SIZE = 4;

export default function OrdersTable({ orders }: OrdersTableProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortKey, setSortKey] = useState<OrderSortKey>("createdAt");
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredOrders = useMemo(() => {
        return searchOrders(orders, searchQuery);
    }, [orders, searchQuery]);

    const sortedOrders = useMemo(() => {
        return sortOrders({
            orders: filteredOrders,
            sortKey,
            direction: sortDirection,
        });
    }, [filteredOrders, sortDirection, sortKey]);

    const totalPages = Math.max(1, Math.ceil(sortedOrders.length / PAGE_SIZE));

    const paginatedOrders = useMemo(() => {
        return paginateItems(sortedOrders, currentPage, PAGE_SIZE);
    }, [sortedOrders, currentPage]);

    function handleSearchChange(value: string) {
        setSearchQuery(value);
        setCurrentPage(1);
    }

    function handleSortChange(nextSortKey: OrderSortKey) {
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
                            placeholder="Search orders..."
                        />
                    </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                    <tr>
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
                                label="Total"
                                onClick={() => handleSortChange("total")}
                                isActive={sortKey === "total"}
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
                    {paginatedOrders.length > 0 ? (
                        paginatedOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-slate-50">
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                                    {order.orderNumber}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                    {order.customerName}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                    ${order.total.toFixed(2)}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                    <StatusBadge status={order.status} />
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                    {order.createdAt}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                    <Link
                                        href={`/orders/${order.id}`}
                                        className="font-medium text-slate-900 transition hover:text-slate-600"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>
                                <EmptyState
                                    title="No orders found"
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