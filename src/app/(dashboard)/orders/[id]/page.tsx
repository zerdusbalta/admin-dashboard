import Link from "next/link";
import { notFound } from "next/navigation";

import EmptyState from "@/components/shared/empty-state";
import SectionHeader from "@/components/shared/section-header";
import StatusBadge from "@/components/shared/status-badge";
import { mockInvoices } from "@/data/mock-invoices";
import { mockOrders } from "@/data/mock-orders";

type OrderDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function OrderDetailPage({
                                                  params,
                                              }: OrderDetailPageProps) {
    const { id } = await params;

    const order = mockOrders.find((item) => item.id === id);

    if (!order) {
        notFound();
    }

    const relatedInvoice = mockInvoices.find(
        (invoice) => invoice.orderNumber === order.orderNumber
    );

    return (
        <section className="space-y-6">
            <SectionHeader
                title="Order Details"
                description="View full order information."
                action={
                    <Link
                        href="/orders"
                        className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                        Back to Orders
                    </Link>
                }
            />

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                        {order.orderNumber}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">{order.customerName}</p>
                </div>

                <div className="grid gap-5 px-6 py-6 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Customer
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-900">
                            {order.customerName}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Total
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-900">
                            ${order.total}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Status
                        </p>
                        <div className="mt-2">
                            <StatusBadge status={order.status} />
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Created At
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-900">
                            {order.createdAt}
                        </p>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-4">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Related Invoice
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Invoice connected to this order.
                    </p>
                </div>

                {relatedInvoice ? (
                    <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-900">
                                {relatedInvoice.invoiceNumber}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                                ${relatedInvoice.amount} • {relatedInvoice.issuedAt}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <StatusBadge status={relatedInvoice.status} />
                            <Link
                                href={`/invoices/${relatedInvoice.id}`}
                                className="text-sm font-medium text-slate-900 transition hover:text-slate-600"
                            >
                                View Invoice
                            </Link>
                        </div>
                    </div>
                ) : (
                    <EmptyState
                        title="No related invoice"
                        description="There is no invoice connected to this order yet."
                    />
                )}
            </div>
        </section>
    );
}