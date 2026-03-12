type StatusBadgeProps = {
    status: string;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
    const normalizedStatus = status.toLowerCase().trim();

    let badgeClassName = "bg-slate-200 text-slate-800";

    if (normalizedStatus === "active" || normalizedStatus === "completed" || normalizedStatus === "paid") {
        badgeClassName = "bg-emerald-100 text-emerald-900";
    }

    if (normalizedStatus === "pending" || normalizedStatus === "unpaid") {
        badgeClassName = "bg-amber-100 text-amber-900";
    }

    if (normalizedStatus === "cancelled" || normalizedStatus === "overdue") {
        badgeClassName = "bg-rose-100 text-rose-900";
    }

    if (normalizedStatus === "inactive") {
        badgeClassName = "bg-slate-200 text-slate-800";
    }

    return (
        <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${badgeClassName}`}
        >
      {normalizedStatus}
    </span>
    );
}