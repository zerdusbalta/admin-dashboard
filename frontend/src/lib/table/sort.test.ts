import { sortCustomers } from "./sort";

const customers = [
    {
        id: "1",
        name: "John Carter",
        email: "john@example.com",
        company: "Carter Solutions",
        phone: "+1 111 111 1111",
        status: "active" as const,
        createdAt: "2025-01-03",
    },
    {
        id: "2",
        name: "Emily Stone",
        email: "emily@example.com",
        company: "Stone Studio",
        phone: "+1 222 222 2222",
        status: "inactive" as const,
        createdAt: "2025-01-01",
    },
    {
        id: "3",
        name: "Michael Brown",
        email: "michael@example.com",
        company: "Brown Tech",
        phone: "+1 333 333 3333",
        status: "active" as const,
        createdAt: "2025-01-02",
    },
];

describe("sortCustomers", () => {
    it("sorts customers by name ascending", () => {
        const result = sortCustomers({
            customers,
            sortKey: "name",
            direction: "asc",
        });

        expect(result.map((customer) => customer.name)).toEqual([
            "Emily Stone",
            "John Carter",
            "Michael Brown",
        ]);
    });

    it("sorts customers by name descending", () => {
        const result = sortCustomers({
            customers,
            sortKey: "name",
            direction: "desc",
        });

        expect(result.map((customer) => customer.name)).toEqual([
            "Michael Brown",
            "John Carter",
            "Emily Stone",
        ]);
    });

    it("sorts customers by createdAt ascending", () => {
        const result = sortCustomers({
            customers,
            sortKey: "createdAt",
            direction: "asc",
        });

        expect(result.map((customer) => customer.createdAt)).toEqual([
            "2025-01-01",
            "2025-01-02",
            "2025-01-03",
        ]);
    });

    it("does not mutate the original array", () => {
        const originalNames = customers.map((customer) => customer.name);

        sortCustomers({
            customers,
            sortKey: "name",
            direction: "asc",
        });

        expect(customers.map((customer) => customer.name)).toEqual(originalNames);
    });
});