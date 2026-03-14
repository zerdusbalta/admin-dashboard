import { mockInvoices } from "@/data/mock-invoices";
import InvoicesTable from "@/features/invoices/components/invoices-table";

export default function InvoicesPage() {
    return (
        <section className="space-y-6">
            <InvoicesTable invoices={mockInvoices} />
        </section>
    );
}