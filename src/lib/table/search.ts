import type { Customer } from "@/features/customers/types/customer.types";

export function searchCustomers(customers: Customer[], query: string) {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return customers;
    }

    return customers.filter((customer) => {
        return (
            customer.name.toLowerCase().includes(normalizedQuery) ||
            customer.email.toLowerCase().includes(normalizedQuery) ||
            customer.company.toLowerCase().includes(normalizedQuery) ||
            customer.phone.toLowerCase().includes(normalizedQuery) ||
            customer.status.toLowerCase().includes(normalizedQuery)
        );
    });
}