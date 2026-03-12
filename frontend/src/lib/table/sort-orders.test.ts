import { sortOrders } from "./sort-orders";

const orders = [
    {
        id: "1",
        orderNumber: "ORD-1003",
        customerName: "Michael Brown",
        total: 520,
        status: "cancelled" as const,
        createdAt: "2025-02-05",
    },
    {
        id: "2",
        orderNumber: "ORD-1001",
        customerName: "John Carter",
        total: 240,
        status: "completed" as const,
        createdAt: "2025-02-01",
    },
    {
        id: "3",
        orderNumber: "ORD-1002",
        customerName: "Emily Stone",
        total: 120,
        status: "pending" as const,
        createdAt: "2025-02-03",
    },
];

describe("sortOrders", () => {
    it("sorts orders by order number ascending", () => {
        const result = sortOrders({
            orders,
            sortKey: "orderNumber",
            direction: "asc",
        });

        expect(result.map((order) => order.orderNumber)).toEqual([
            "ORD-1001",
            "ORD-1002",
            "ORD-1003",
        ]);
    });

    it("sorts orders by total descending", () => {
        const result = sortOrders({
            orders,
            sortKey: "total",
            direction: "desc",
        });

        expect(result.map((order) => order.total)).toEqual([520, 240, 120]);
    });

    it("sorts orders by createdAt ascending", () => {
        const result = sortOrders({
            orders,
            sortKey: "createdAt",
            direction: "asc",
        });

        expect(result.map((order) => order.createdAt)).toEqual([
            "2025-02-01",
            "2025-02-03",
            "2025-02-05",
        ]);
    });

    it("does not mutate the original array", () => {
        const originalOrderNumbers = orders.map((order) => order.orderNumber);

        sortOrders({
            orders,
            sortKey: "orderNumber",
            direction: "asc",
        });

        expect(orders.map((order) => order.orderNumber)).toEqual(
            originalOrderNumbers
        );
    });
});