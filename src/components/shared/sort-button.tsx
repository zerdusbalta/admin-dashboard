import type { SortDirection } from "@/types/table.types";

type SortButtonProps = {
    label: string;
    onClick: () => void;
    isActive?: boolean;
    direction?: SortDirection;
};

export default function SortButton({
                                       label,
                                       onClick,
                                       isActive = false,
                                       direction = "asc",
                                   }: SortButtonProps) {
    const indicator = !isActive ? "↕" : direction === "asc" ? "↑" : "↓";

    return (
        <button
            type="button"
            onClick={onClick}
            className={`inline-flex items-center gap-1 whitespace-nowrap text-xs font-semibold uppercase tracking-wide transition ${
                isActive
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-900"
            }`}
        >
            <span>{label}</span>
            <span className="text-[10px] leading-none">{indicator}</span>
        </button>
    );
}