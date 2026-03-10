import { sortInvoices } from "@/lib/table/sort-invoices";

const invoices = [
    {
        id: "1",
        invoiceNumber: "INV-2003",
        orderNumber: "ORD-1003",
        customerName: "Michael Brown",
        amount: 520,
        status: "overdue" as const,
        issuedAt: "2025-02-06",
    },
    {
        id: "2",
        invoiceNumber: "INV-2001",
        orderNumber: "ORD-1001",
        customerName: "John Carter",
        amount: 240,
        status: "paid" as const,
        issuedAt: "2025-02-02",
    },
    {
        id: "3",
        invoiceNumber: "INV-2002",
        orderNumber: "ORD-1002",
        customerName: "Emily Stone",
        amount: 120,
        status: "unpaid" as const,
        issuedAt: "2025-02-04",
    },
];

describe("sortInvoices", () => {
    it("sorts invoices by invoice number ascending", () => {
        const result = sortInvoices({
            invoices,
            sortKey: "invoiceNumber",
            direction: "asc",
        });

        expect(result.map((invoice) => invoice.invoiceNumber)).toEqual([
            "INV-2001",
            "INV-2002",
            "INV-2003",
        ]);
    });

    it("sorts invoices by amount descending", () => {
        const result = sortInvoices({
            invoices,
            sortKey: "amount",
            direction: "desc",
        });

        expect(result.map((invoice) => invoice.amount)).toEqual([520, 240, 120]);
    });

    it("sorts invoices by issuedAt ascending", () => {
        const result = sortInvoices({
            invoices,
            sortKey: "issuedAt",
            direction: "asc",
        });

        expect(result.map((invoice) => invoice.issuedAt)).toEqual([
            "2025-02-02",
            "2025-02-04",
            "2025-02-06",
        ]);
    });

    it("does not mutate the original array", () => {
        const originalInvoiceNumbers = invoices.map(
            (invoice) => invoice.invoiceNumber
        );

        sortInvoices({
            invoices,
            sortKey: "invoiceNumber",
            direction: "asc",
        });

        expect(invoices.map((invoice) => invoice.invoiceNumber)).toEqual(
            originalInvoiceNumbers
        );
    });
});