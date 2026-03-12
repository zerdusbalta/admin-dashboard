import Link from "next/link";

type ProductsPaginationProps = {
    currentPage: number;
    totalPages: number;
};

export default function ProductsPagination({
                                               currentPage,
                                               totalPages,
                                           }: ProductsPaginationProps) {
    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
                Page {currentPage} of {totalPages}
            </p>

            <div className="flex items-center gap-2">
                <Link
                    href={`/products?page=${Math.max(1, currentPage - 1)}`}
                    className={`rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition ${
                        currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "hover:bg-slate-100"
                    }`}
                >
                    Previous
                </Link>

                <Link
                    href={`/products?page=${Math.min(totalPages, currentPage + 1)}`}
                    className={`rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition ${
                        currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "hover:bg-slate-100"
                    }`}
                >
                    Next
                </Link>
            </div>
        </div>
    );
}