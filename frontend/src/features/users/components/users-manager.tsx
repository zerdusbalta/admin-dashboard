"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UserForm from "./user-form";
import UsersTable from "./users-table";
import { deleteUser } from "../services/delete-user";
import { transferPrimaryAdmin } from "../services/transfer-primary-admin";
import { updateUserRole } from "../services/update-user-role";
import type { User } from "../types/user.types";
import {getAuthUserFromBrowser, type AuthUser,} from "@/features/auth/utils/auth-session";

type UsersManagerProps = {
    users: User[];
};

export default function UsersManager({ users }: UsersManagerProps) {
    const router = useRouter();
    const currentUser: AuthUser | null = getAuthUserFromBrowser();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [actionError, setActionError] = useState("");
    const [actionSuccess, setActionSuccess] = useState("");

    function handleOpenCreate() {
        setShowCreateForm(true);
        setActionError("");
        setActionSuccess("");
    }

    function handleCloseCreate() {
        setShowCreateForm(false);
    }

    async function handleRoleChange(
        user: User,
        nextRole: "admin" | "editor" | "staff"
    ) {
        if (user.role === nextRole) {
            return;
        }

        setActionError("");
        setActionSuccess("");

        try {
            await updateUserRole({
                id: user.id,
                role: nextRole,
            });

            setActionSuccess("User role updated successfully.");
            router.refresh();
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Failed to update user role.";

            setActionError(message);
            router.refresh();
        }
    }

    async function handleTransferPrimaryAdmin(user: User) {
        const confirmed = window.confirm(
            `Transfer primary admin access to "${user.email}"?`
        );

        if (!confirmed) {
            return;
        }

        setActionError("");
        setActionSuccess("");

        try {
            await transferPrimaryAdmin(user.id);
            setActionSuccess("Primary admin access transferred successfully.");
            router.refresh();
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Failed to transfer primary admin access.";

            setActionError(message);
        }
    }

    async function handleDelete(user: User) {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${user.email}"?`
        );

        if (!confirmed) {
            return;
        }

        setActionError("");
        setActionSuccess("");

        try {
            await deleteUser(user.id);
            setActionSuccess("User deleted successfully.");
            router.refresh();
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Failed to delete user.";

            setActionError(message);
        }
    }

    return (
        <div className="space-y-6">
            {actionError ? (
                <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                    {actionError}
                </div>
            ) : null}

            {actionSuccess ? (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    {actionSuccess}
                </div>
            ) : null}

            <div className="flex justify-end">
                {!showCreateForm && currentUser?.role !== "staff" ? (                    <button
                        type="button"
                        onClick={handleOpenCreate}
                        className="inline-flex h-10 items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
                    >
                        Create User
                    </button>
                ) : null}
            </div>

            {showCreateForm ? (
                <UserForm
                    onCloseAction={handleCloseCreate}
                    currentUser={currentUser}
                />
            ) : null}

            <div className="pt-2">
                <UsersTable
                    users={users}
                    currentUser={currentUser}
                    onRoleChangeAction={handleRoleChange}
                    onDeleteAction={handleDelete}
                    onTransferPrimaryAdminAction={handleTransferPrimaryAdmin}
                />
            </div>
        </div>
    );
}