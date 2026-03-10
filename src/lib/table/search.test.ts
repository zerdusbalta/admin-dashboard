import { searchCustomers } from "@/lib/table/search";

const customers = [
    {
        id: "1",
        name: "John Carter",
        email: "john@example.com",
        company: "Carter Solutions",
        phone: "+1 111 111 1111",
        status: "active" as const,
        createdAt: "2025-01-01",
    },
    {
        id: "2",
        name: "Emily Stone",
        email: "emily@example.com",
        company: "Stone Studio",
        phone: "+1 222 222 2222",
        status: "inactive" as const,
        createdAt: "2025-01-02",
    },
];

describe("searchCustomers", () => {
    it("returns all customers when query is empty", () => {
        const result = searchCustomers(customers, "");

        expect(result).toEqual(customers);
    });

    it("finds a customer by name", () => {
        const result = searchCustomers(customers, "john");

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("John Carter");
    });

    it("finds a customer by email", () => {
        const result = searchCustomers(customers, "emily@example.com");

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("Emily Stone");
    });

    it("finds a customer by company", () => {
        const result = searchCustomers(customers, "stone");

        expect(result).toHaveLength(1);
        expect(result[0].company).toBe("Stone Studio");
    });

    it("matches query case-insensitively", () => {
        const result = searchCustomers(customers, "JOHN");

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("John Carter");
    });

    it("returns an empty array when nothing matches", () => {
        const result = searchCustomers(customers, "not-found");

        expect(result).toEqual([]);
    });
});