"use client";

import type { User } from "../types/user.types";

type UsersTableProps = {
    users: User[];
    onRoleChangeAction: (user: User, role: "admin" | "editor" | "staff") => void;
    onDeleteAction: (user: User) => void;
};

function formatDate(value: string) {
    return new Date(value).toLocaleString();
}

export default function UsersTable({
                                       users,
                                       onRoleChangeAction,
                                       onDeleteAction,
                                   }: UsersTableProps) {
    if (users.length === 0) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-500 shadow-sm">
                No users found.
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                    <tr>
                        <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            User
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Role
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Joined
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Actions
                        </th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200 bg-white">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 align-top">
                                <p className="text-sm font-semibold text-slate-900">
                                    {user.email}
                                </p>
                                <p className="mt-1 text-xs text-slate-400">ID: {user.id}</p>
                            </td>

                            <td className="px-6 py-4 align-top">
                                <select
                                    value={user.role}
                                    onChange={(event) =>
                                        onRoleChangeAction(
                                            user,
                                            event.target.value as "admin" | "editor" | "staff"
                                        )
                                    }
                                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                                >
                                    <option value="staff">Staff</option>
                                    <option value="editor">Editor</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>

                            <td className="whitespace-nowrap px-6 py-4 align-top text-sm text-slate-600">
                                {formatDate(user.createdAt)}
                            </td>

                            <td className="whitespace-nowrap px-6 py-4 align-top">
                                <button
                                    type="button"
                                    onClick={() => onDeleteAction(user)}
                                    className="inline-flex h-9 items-center justify-center rounded-lg border border-rose-200 bg-white px-3.5 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}