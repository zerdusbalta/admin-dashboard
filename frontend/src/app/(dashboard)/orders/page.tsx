import { mockOrders } from "@/data/mock-orders";
import OrdersTable from "@/features/orders/components/orders-table";

export default function OrdersPage() {
    return (
        <section className="space-y-6">
            <OrdersTable orders={mockOrders} />
        </section>
    );
}