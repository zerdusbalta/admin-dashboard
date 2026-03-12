import Link from "next/link";
import { notFound } from "next/navigation";

import EmptyState from "../../../../components/shared/empty-state";
import SectionHeader from "../../../../components/shared/section-header";
import StatusBadge from "../../../../components/shared/status-badge";
import { mockCustomers } from "../../../../data/mock-customers";
import { mockInvoices } from "../../../../data/mock-invoices";
import { mockOrders } from "../../../../data/mock-orders";

type InvoiceDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function InvoiceDetailPage({
                                                    params,
                                                }: InvoiceDetailPageProps) {
    const { id } = await params;

    const invoice = mockInvoices.find((item) => item.id === id);

    if (!invoice) {
        notFound();
    }

    const relatedOrder = mockOrders.find(
        (order) => order.orderNumber === invoice.orderNumber
    );

    const relatedCustomer = mockCustomers.find(
        (customer) => customer.name === invoice.customerName
    );

    return (
        <section className="space-y-6">
            <SectionHeader
                title="Invoice Details"
                description="View full invoice information."
                action={
                    <Link
                        href="/invoices"
                        className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                        Back to Invoices
                    </Link>
                }
            />

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                        {invoice.invoiceNumber}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">{invoice.customerName}</p>
                </div>

                <div className="grid gap-5 px-6 py-6 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Order Number
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-900">
                            {invoice.orderNumber}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Amount
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-900">
                            ${invoice.amount}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Status
                        </p>
                        <div className="mt-2">
                            <StatusBadge status={invoice.status} />
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Issued At
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-900">
                            {invoice.issuedAt}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 px-0 lg:grid-cols-2">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Related Order
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Order connected to this invoice.
                        </p>
                    </div>

                    {relatedOrder ? (
                        <div className="px-6 py-5">
                            <p className="text-sm font-semibold text-slate-900">
                                {relatedOrder.orderNumber}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                                {relatedOrder.customerName}
                            </p>
                            <div className="mt-3 flex items-center gap-3">
                                <StatusBadge status={relatedOrder.status} />
                                <Link
                                    href={`/orders/${relatedOrder.id}`}
                                    className="text-sm font-medium text-slate-900 transition hover:text-slate-600"
                                >
                                    View Order
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <EmptyState
                            title="No related order"
                            description="There is no order connected to this invoice."
                        />
                    )}
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Related Customer
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Customer connected to this invoice.
                        </p>
                    </div>

                    {relatedCustomer ? (
                        <div className="px-6 py-4">
                            <p className="text-sm font-semibold text-slate-900">
                                {relatedCustomer.name}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                                {relatedCustomer.email}
                            </p>
                            <div className="mt-3 flex items-center gap-3">
                                <StatusBadge status={relatedCustomer.status} />
                                <Link
                                    href={`/customers/${relatedCustomer.id}`}
                                    className="text-sm font-medium text-slate-900 transition hover:text-slate-600"
                                >
                                    View Customer
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <EmptyState
                            title="No related customer"
                            description="There is no customer connected to this invoice."
                        />
                    )}
                </div>
            </div>
        </section>
    );
}