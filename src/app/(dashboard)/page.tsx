import StatCard from "@/components/shared/stat-card";
import { mockCustomers } from "@/data/mock-customers";
import { mockInvoices } from "@/data/mock-invoices";
import { mockOrders } from "@/data/mock-orders";

export default function DashboardPage() {
    const totalCustomers = mockCustomers.length;
    const totalOrders = mockOrders.length;
    const totalInvoices = mockInvoices.length;

    const paidInvoicesCount = mockInvoices.filter(
        (invoice) => invoice.status === "paid"
    ).length;

    const recentCustomers = [...mockCustomers].slice(0, 3);
    const recentOrders = [...mockOrders].slice(0, 3);
    const recentInvoices = [...mockInvoices].slice(0, 3);

    return (
        <section className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">
                    Welcome back
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Here is a quick overview of your dashboard activity.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total Customers"
                    value={totalCustomers}
                    description="Active and inactive customer records"
                />
                <StatCard
                    title="Total Orders"
                    value={totalOrders}
                    description="Orders currently stored in the dashboard"
                />
                <StatCard
                    title="Total Invoices"
                    value={totalInvoices}
                    description="All invoice records in the system"
                />
                <StatCard
                    title="Paid Invoices"
                    value={paidInvoicesCount}
                    description="Invoices marked as paid"
                />
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 px-6 py-5">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Recent Customers
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Latest customer entries
                        </p>
                    </div>

                    <div className="divide-y divide-slate-200">
                        {recentCustomers.map((customer) => (
                            <div key={customer.id} className="px-6 py-5">
                                <p className="text-sm font-semibold text-slate-900">
                                    {customer.name}
                                </p>
                                <p className="mt-1 text-sm text-slate-500">{customer.email}</p>
                                <p className="mt-1 text-xs text-slate-400">{customer.company}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 px-6 py-5">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Recent Orders
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">Newest order activity</p>
                    </div>

                    <div className="divide-y divide-slate-200">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="px-6 py-5">
                                <p className="text-sm font-semibold text-slate-900">
                                    {order.orderNumber}
                                </p>
                                <p className="mt-1 text-sm text-slate-500">
                                    {order.customerName}
                                </p>
                                <p className="mt-1 text-xs text-slate-400">
                                    ${order.total} • {order.status}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 px-6 py-5">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Recent Invoices
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Latest invoice records
                        </p>
                    </div>

                    <div className="divide-y divide-slate-200">
                        {recentInvoices.map((invoice) => (
                            <div key={invoice.id} className="px-6 py-5">
                                <p className="text-sm font-semibold text-slate-900">
                                    {invoice.invoiceNumber}
                                </p>
                                <p className="mt-1 text-sm text-slate-500">
                                    {invoice.customerName}
                                </p>
                                <p className="mt-1 text-xs text-slate-400">
                                    ${invoice.amount} • {invoice.status}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}