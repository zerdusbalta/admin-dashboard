import { mockInvoices } from "@/data/mock-invoices";
import InvoicesTable from "@/features/invoices/components/invoices-table";

export default function InvoicesPage() {
    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Invoices</h1>
                <p className="mt-1 text-sm text-slate-500">
                    View and manage your invoice records.
                </p>
            </div>

            <InvoicesTable invoices={mockInvoices} />
        </section>
    );
}