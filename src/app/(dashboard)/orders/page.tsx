import { mockOrders } from "@/data/mock-orders";
import OrdersTable from "@/features/orders/components/orders-table";

export default function OrdersPage() {
    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
                <p className="mt-1 text-sm text-slate-500">
                    View and manage your customer orders.
                </p>
            </div>

            <OrdersTable orders={mockOrders} />
        </section>
    );
}