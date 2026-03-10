import type { Order } from "@/features/orders/types/order.types";

export const mockOrders: Order[] = [
    {
        id: "ord_001",
        orderNumber: "ORD-1001",
        customerName: "John Carter",
        total: 240,
        status: "completed",
        createdAt: "2025-02-01",
    },
    {
        id: "ord_002",
        orderNumber: "ORD-1002",
        customerName: "Emily Stone",
        total: 120,
        status: "pending",
        createdAt: "2025-02-03",
    },
    {
        id: "ord_003",
        orderNumber: "ORD-1003",
        customerName: "Michael Brown",
        total: 520,
        status: "cancelled",
        createdAt: "2025-02-05",
    },
    {
        id: "ord_004",
        orderNumber: "ORD-1004",
        customerName: "Sophia Turner",
        total: 310,
        status: "completed",
        createdAt: "2025-02-08",
    },
    {
        id: "ord_005",
        orderNumber: "ORD-1005",
        customerName: "Daniel White",
        total: 175,
        status: "pending",
        createdAt: "2025-02-10",
    },
    {
        id: "ord_006",
        orderNumber: "ORD-1006",
        customerName: "Olivia Green",
        total: 890,
        status: "completed",
        createdAt: "2025-02-14",
    },
];