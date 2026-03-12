import { mockCustomers } from "@/data/mock-customers";
import CustomersTable from "@/features/customers/components/customers-table";

export default function CustomersPage() {
    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
                <p className="mt-1 text-sm text-slate-500">
                    View and manage your customer list.
                </p>
            </div>

            <CustomersTable customers={mockCustomers} />
        </section>
    );
}