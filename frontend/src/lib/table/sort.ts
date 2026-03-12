import type { Customer } from "../../features/customers/types/customer.types";
import type { CustomerSortKey, SortDirection } from "../../types/table.types";

type SortCustomersParams = {
    customers: Customer[];
    sortKey: CustomerSortKey;
    direction: SortDirection;
};

export function sortCustomers({
                                  customers,
                                  sortKey,
                                  direction,
                              }: SortCustomersParams) {
    const sortedCustomers = [...customers].sort((a, b) => {
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

    return sortedCustomers;
}