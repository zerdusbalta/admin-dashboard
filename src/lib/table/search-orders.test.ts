import { searchOrders } from "@/lib/table/search-orders";

const orders = [
    {
        id: "1",
        orderNumber: "ORD-1001",
        customerName: "John Carter",
        total: 240,
        status: "completed" as const,
        createdAt: "2025-02-01",
    },
    {
        id: "2",
        orderNumber: "ORD-1002",
        customerName: "Emily Stone",
        total: 120,
        status: "pending" as const,
        createdAt: "2025-02-03",
    },
];

describe("searchOrders", () => {
    it("returns all orders when query is empty", () => {
        expect(searchOrders(orders, "")).toEqual(orders);
    });

    it("finds an order by order number", () => {
        const result = searchOrders(orders, "ORD-1001");

        expect(result).toHaveLength(1);
        expect(result[0].customerName).toBe("John Carter");
    });

    it("finds an order by customer name", () => {
        const result = searchOrders(orders, "emily");

        expect(result).toHaveLength(1);
        expect(result[0].orderNumber).toBe("ORD-1002");
    });

    it("finds an order by status", () => {
        const result = searchOrders(orders, "pending");

        expect(result).toHaveLength(1);
        expect(result[0].customerName).toBe("Emily Stone");
    });

    it("returns an empty array when nothing matches", () => {
        expect(searchOrders(orders, "not-found")).toEqual([]);
    });
});