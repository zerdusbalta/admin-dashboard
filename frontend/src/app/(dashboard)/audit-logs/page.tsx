import AuditLogsTable from "@/features/audit/components/audit-logs-table";
import { getAuditLogs } from "@/features/audit/services/get-audit-logs";
import type { PaginatedAuditLogsResponse } from "@/features/audit/types/audit-log.types";

type AuditLogsPageProps = {
    searchParams?: Promise<{
        page?: string;
    }>;
};

export default async function AuditLogsPage({
                                                searchParams,
                                            }: AuditLogsPageProps) {
    const resolvedSearchParams = searchParams ? await searchParams : {};
    const rawPage = Number(resolvedSearchParams.page || "1");
    const currentPage = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

    let auditLogsResponse: PaginatedAuditLogsResponse | null = null;
    let hasError = false;

    try {
        auditLogsResponse = await getAuditLogs({
            page: currentPage,
            limit: 10,
        });
    } catch {
        hasError = true;
    }

    return (
        <section className="space-y-6">

            {hasError || !auditLogsResponse ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-5 text-sm text-rose-700 shadow-sm">
                    Could not load audit logs from the backend.
                </div>
            ) : (
                <>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                            <div className="flex flex-col items-center text-center">
                                <p className="text-sm font-medium text-slate-500">Total Logs</p>
                                <p className="mt-3 text-3xl font-bold text-slate-900">
                                    {auditLogsResponse.total}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                            <div className="flex flex-col items-center text-center">
                                <p className="text-sm font-medium text-slate-500">Current Page</p>
                                <p className="mt-3 text-3xl font-bold text-slate-900">
                                    {auditLogsResponse.page}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                            <div className="flex flex-col items-center text-center">
                                <p className="text-sm font-medium text-slate-500">Total Pages</p>
                                <p className="mt-3 text-3xl font-bold text-slate-900">
                                    {auditLogsResponse.totalPages}
                                </p>
                            </div>
                        </div>
                    </div>

                    <AuditLogsTable logs={auditLogsResponse.data} />
                </>
            )}
        </section>
    );
}