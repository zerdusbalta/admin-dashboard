type StatCardProps = {
    title: string;
    value: string | number;
    description: string;
};

export default function StatCard({
                                     title,
                                     value,
                                     description,
                                 }: StatCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                {value}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
        </div>
    );
}