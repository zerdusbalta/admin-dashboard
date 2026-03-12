import type { Order } from "../../features/orders/types/order.types";

export function searchOrders(orders: Order[], query: string) {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return orders;
    }

    return orders.filter((order) => {
        return (
            order.orderNumber.toLowerCase().includes(normalizedQuery) ||
            order.customerName.toLowerCase().includes(normalizedQuery) ||
            order.status.toLowerCase().includes(normalizedQuery) ||
            String(order.total).includes(normalizedQuery) ||
            order.createdAt.toLowerCase().includes(normalizedQuery)
        );
    });
}