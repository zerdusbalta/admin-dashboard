type SectionHeaderProps = {
    title: string;
    description: string;
    action?: React.ReactNode;
};

export default function SectionHeader({
                                          title,
                                          description,
                                          action,
                                      }: SectionHeaderProps) {
    return (
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                <p className="mt-1 text-sm text-slate-500">{description}</p>
            </div>

            {action ? <div className="sm:self-start">{action}</div> : null}
        </div>
    );
}