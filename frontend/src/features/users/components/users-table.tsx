"use client";

import type { User } from "../types/user.types";
import type { AuthUser } from "@/features/auth/utils/auth-session";

type UsersTableProps = {
    users: User[];
    currentUser: AuthUser | null;
    onRoleChangeAction: (user: User, role: "admin" | "editor" | "staff") => void;
    onDeleteAction: (user: User) => void;
    onTransferPrimaryAdminAction: (user: User) => void;
};

function formatDate(value: string) {
    return new Date(value).toLocaleString();
}

export default function UsersTable({
                                       users,
                                       currentUser,
                                       onRoleChangeAction,
                                       onDeleteAction,
                                       onTransferPrimaryAdminAction,
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
                    {users.map((user) => {
                        const allowedRoles =
                            currentUser?.role === "admin" && currentUser?.isPrimaryAdmin
                                ? ["staff", "editor", "admin"]
                                : currentUser?.role === "admin"
                                    ? ["staff", "editor"]
                                    : ["staff"];

                        const canShowMakePrimary =
                            currentUser?.role === "admin" &&
                            currentUser?.isPrimaryAdmin === true &&
                            user.role === "admin" &&
                            !user.isPrimaryAdmin;

                        const canDeleteUser =
                            !user.isPrimaryAdmin &&
                            (
                                currentUser?.role === "admin" ||
                                (currentUser?.role === "editor" && user.role === "staff")
                            );

                        return (
                            <tr key={user.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 align-top">
                                    <p className="text-sm font-semibold text-slate-900">
                                        {user.email}
                                    </p>
                                    <div className="mt-1 flex flex-wrap items-center gap-2">
                                        <p className="text-xs text-slate-400">ID: {user.id}</p>
                                        {user.isPrimaryAdmin ? (
                                            <span className="inline-flex rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-700">
                                                    Primary Admin
                                                </span>
                                        ) : null}
                                    </div>
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
                                        disabled={user.isPrimaryAdmin}
                                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {allowedRoles.map((allowedRole) => (
                                            <option key={allowedRole} value={allowedRole}>
                                                {allowedRole.charAt(0).toUpperCase() + allowedRole.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                <td className="whitespace-nowrap px-6 py-4 align-top text-sm text-slate-600">
                                    {formatDate(user.createdAt)}
                                </td>

                                <td className="whitespace-nowrap px-6 py-4 align-top">
                                    <div className="flex flex-wrap gap-2">
                                        {canShowMakePrimary ? (
                                            <button
                                                type="button"
                                                onClick={() => onTransferPrimaryAdminAction(user)}
                                                className="inline-flex h-9 items-center justify-center rounded-lg border border-indigo-200 bg-white px-3.5 text-sm font-medium text-indigo-700 transition hover:bg-indigo-50"
                                            >
                                                Make Primary
                                            </button>
                                        ) : null}

                                        {canDeleteUser ? (
                                            <button
                                                type="button"
                                                onClick={() => onDeleteAction(user)}
                                                disabled={user.isPrimaryAdmin}
                                                className="inline-flex h-9 items-center justify-center rounded-lg border border-rose-200 bg-white px-3.5 text-sm font-medium text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                Delete
                                            </button>
                                        ) : null}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}