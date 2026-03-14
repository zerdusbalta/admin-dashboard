"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "../services/create-user";
import type { AuthUser } from "@/features/auth/utils/auth-session";

type UserFormProps = {
    onCloseAction: () => void;
    currentUser: AuthUser | null;
};

export default function UserForm({onCloseAction, currentUser,}: UserFormProps) {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"admin" | "editor" | "staff">("staff");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const allowedRoles =
        currentUser?.role === "admin" && currentUser?.isPrimaryAdmin
            ? ["staff", "editor", "admin"]
            : currentUser?.role === "admin"
                ? ["staff", "editor"]
                : ["staff"];

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            await createUser({
                email: email.trim(),
                password: password.trim(),
                role,
            });

            router.refresh();
            onCloseAction();
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Something went wrong.";

            setError(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">Create User</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Add a new user with a role and password.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onCloseAction}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                    Close
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="user@example.com"
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Role
                        </label>
                        <select
                            value={role}
                            onChange={(event) =>
                                setRole(event.target.value as "admin" | "editor" | "staff")
                            }
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                        >
                            {allowedRoles.map((allowedRole) => (
                                <option key={allowedRole} value={allowedRole}>
                                    {allowedRole.charAt(0).toUpperCase() + allowedRole.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Minimum 6 characters"
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                    />
                </div>

                {error ? (
                    <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                        {error}
                    </div>
                ) : null}

                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex h-10 min-w-[132px] items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Creating..." : "Create User"}
                </button>
            </form>
        </div>
    );
}