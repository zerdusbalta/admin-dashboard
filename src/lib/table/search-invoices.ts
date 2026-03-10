import type { Invoice } from "@/features/invoices/types/invoice.types";

export function searchInvoices(invoices: Invoice[], query: string) {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return invoices;
    }

    return invoices.filter((invoice) => {
        return (
            invoice.invoiceNumber.toLowerCase().includes(normalizedQuery) ||
            invoice.orderNumber.toLowerCase().includes(normalizedQuery) ||
            invoice.customerName.toLowerCase().includes(normalizedQuery) ||
            invoice.status.toLowerCase().includes(normalizedQuery) ||
            String(invoice.amount).includes(normalizedQuery) ||
            invoice.issuedAt.toLowerCase().includes(normalizedQuery)
        );
    });
}