import Link from "next/link";
import { notFound } from "next/navigation";

import EmptyState from "@/components/shared/empty-state";
import SectionHeader from "@/components/shared/section-header";
import StatusBadge from "@/components/shared/status-badge";
import { mockCustomers } from "@/data/mock-customers";
import { mockOrders } from "@/data/mock-orders";

type CustomerDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function CustomerDetailPage({
                                                     params,
                                                 }: CustomerDetailPageProps) {
    const { id } = await params;

    const customer = mockCustomers.find((item) => item.id === id);

    if (!customer) {
        notFound();
    }

    const relatedOrders = mockOrders.filter(
        (order) => order.customerName === customer.name
    );

    return (
        <section className="space-y-6">
            <SectionHeader
                title="Customer Details"
                description="View full customer information."
                action={
                    <Link
                        href="/customers"
                        className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                        Back to Customers
                    </Link>
                }
            />

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                        {customer.name}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">{customer.email}</p>
                </div>

                <div className="grid gap-5 px-6 py-6 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Company
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-900">
                            {customer.company}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Phone
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-900">
                            {customer.phone}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Status
                        </p>
                        <div className="mt-2">
                            <StatusBadge status={customer.status} />
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Created At
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-900">
                            {customer.createdAt}
                        </p>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-4">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Related Orders
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Orders connected to this customer.
                    </p>
                </div>

                {relatedOrders.length > 0 ? (
                    <div className="divide-y divide-slate-200">
                        {relatedOrders.map((order) => (
                            <div
                                key={order.id}
                                className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        {order.orderNumber}
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        ${order.total} • {order.createdAt}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <StatusBadge status={order.status} />
                                    <Link
                                        href={`/orders/${order.id}`}
                                        className="text-sm font-medium text-slate-900 transition hover:text-slate-600"
                                    >
                                        View Order
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        title="No related orders"
                        description="There are no orders connected to this customer yet."
                    />
                )}
            </div>
        </section>
    );
}