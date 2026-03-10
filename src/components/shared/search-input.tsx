type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export default function SearchInput({
                                        value,
                                        onChange,
                                        placeholder = "Search...",
                                    }: SearchInputProps) {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        onChange(event.target.value);
    }

    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400"
        />
    );
}