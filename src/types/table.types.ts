export type SortDirection = "asc" | "desc";

export type CustomerSortKey =
    | "name"
    | "email"
    | "company"
    | "phone"
    | "status"
    | "createdAt";

export type OrderSortKey =
    | "orderNumber"
    | "customerName"
    | "total"
    | "status"
    | "createdAt";

export type InvoiceSortKey =
    | "invoiceNumber"
    | "orderNumber"
    | "customerName"
    | "amount"
    | "status"
    | "issuedAt";