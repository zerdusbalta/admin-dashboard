import { searchInvoices } from "./search-invoices";

const invoices = [
    {
        id: "1",
        invoiceNumber: "INV-2001",
        orderNumber: "ORD-1001",
        customerName: "John Carter",
        amount: 240,
        status: "paid" as const,
        issuedAt: "2025-02-02",
    },
    {
        id: "2",
        invoiceNumber: "INV-2002",
        orderNumber: "ORD-1002",
        customerName: "Emily Stone",
        amount: 120,
        status: "unpaid" as const,
        issuedAt: "2025-02-04",
    },
];

describe("searchInvoices", () => {
    it("returns all invoices when query is empty", () => {
        expect(searchInvoices(invoices, "")).toEqual(invoices);
    });

    it("finds an invoice by invoice number", () => {
        const result = searchInvoices(invoices, "INV-2001");

        expect(result).toHaveLength(1);
        expect(result[0].customerName).toBe("John Carter");
    });

    it("finds an invoice by customer name", () => {
        const result = searchInvoices(invoices, "emily");

        expect(result).toHaveLength(1);
        expect(result[0].invoiceNumber).toBe("INV-2002");
    });

    it("finds an invoice by status", () => {
        const result = searchInvoices(invoices, "paid");

        expect(result).toHaveLength(2);
    });

    it("returns an empty array when nothing matches", () => {
        expect(searchInvoices(invoices, "not-found")).toEqual([]);
    });
});