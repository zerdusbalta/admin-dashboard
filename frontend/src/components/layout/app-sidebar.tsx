"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/", label: "Dashboard" },
    { href: "/customers", label: "Customers" },
    { href: "/orders", label: "Orders" },
    { href: "/invoices", label: "Invoices" },
    { href: "/products", label: "Products" },
    { href: "/users", label: "Users" },
    { href: "/audit-logs", label: "Audit Logs" },
    { href: "/profile", label: "Profile" },
];

export default function AppSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden w-64 border-r border-slate-200 bg-white p-6 md:block">
            <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Admin Panel
                </p>
                <h2 className="mt-2 text-lg font-bold text-slate-900">
                    Admin Dashboard
                </h2>
            </div>

            <nav className="space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                                isActive
                                    ? "bg-slate-900 text-white"
                                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                            }`}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}