import type { Order } from "@/features/orders/types/order.types";
import type { OrderSortKey, SortDirection } from "@/types/table.types";

type SortOrdersParams = {
    orders: Order[];
    sortKey: OrderSortKey;
    direction: SortDirection;
};

export function sortOrders({
                               orders,
                               sortKey,
                               direction,
                           }: SortOrdersParams) {
    return [...orders].sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];

        if (aValue < bValue) {
            return direction === "asc" ? -1 : 1;
        }

        if (aValue > bValue) {
            return direction === "asc" ? 1 : -1;
        }

        return 0;
    });
}