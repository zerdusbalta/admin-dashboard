import type { Invoice } from "@/features/invoices/types/invoice.types";
import type { InvoiceSortKey, SortDirection } from "@/types/table.types";

type SortInvoicesParams = {
    invoices: Invoice[];
    sortKey: InvoiceSortKey;
    direction: SortDirection;
};

export function sortInvoices({
                                 invoices,
                                 sortKey,
                                 direction,
                             }: SortInvoicesParams) {
    return [...invoices].sort((a, b) => {
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