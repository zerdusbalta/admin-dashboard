import { mockCustomers } from "@/data/mock-customers";
import CustomersTable from "@/features/customers/components/customers-table";

export default function CustomersPage() {
    return (
        <section className="space-y-6">
            <CustomersTable customers={mockCustomers} />
        </section>
    );
}