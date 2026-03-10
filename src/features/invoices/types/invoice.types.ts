export type InvoiceStatus = "paid" | "unpaid" | "overdue";

export type Invoice = {
    id: string;
    invoiceNumber: string;
    orderNumber: string;
    customerName: string;
    amount: number;
    status: InvoiceStatus;
    issuedAt: string;
};