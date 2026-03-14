import Image from "next/image";

type UserAvatarProps = {
    name: string;
    avatarUrl?: string;
    size?: "sm" | "md" | "lg";
};

const sizeClasses = {
    sm: "h-10 w-10 text-sm",
    md: "h-14 w-14 text-lg",
    lg: "h-20 w-20 text-2xl",
};

export default function UserAvatar({
                                       name,
                                       avatarUrl,
                                       size = "md",
                                   }: UserAvatarProps) {
    const initial = name.trim().charAt(0).toUpperCase() || "?";

    if (avatarUrl) {
        return (
            <div className={`relative overflow-hidden rounded-full ${sizeClasses[size]}`}>
                <Image
                    src={avatarUrl}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="80px"
                />
            </div>
        );
    }

    return (
        <div
            className={`flex items-center justify-center rounded-full bg-slate-900 font-semibold text-white ${sizeClasses[size]}`}
        >
            {initial}
        </div>
    );
}