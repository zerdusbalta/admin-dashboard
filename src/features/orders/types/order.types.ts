export type OrderStatus = "pending" | "completed" | "cancelled";

export type Order = {
    id: string;
    orderNumber: string;
    customerName: string;
    total: number;
    status: OrderStatus;
    createdAt: string;
};