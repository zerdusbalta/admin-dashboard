import UsersManager from "@/features/users/components/users-manager";
import { getUsers } from "@/features/users/services/get-users";
import type { PaginatedUsersResponse } from "@/features/users/types/user.types";

export default async function UsersPage() {
    let usersResponse: PaginatedUsersResponse | null = null;
    let hasError = false;

    try {
        usersResponse = await getUsers();
    } catch {
        hasError = true;
    }

    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Users</h1>
                <p className="mt-1 text-sm text-slate-500">
                    View, create, update, and remove dashboard users.
                </p>
            </div>

            {hasError || !usersResponse ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-5 text-sm text-rose-700 shadow-sm">
                    Could not load users from the backend.
                </div>
            ) : (
                <>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                            <div className="flex flex-col items-center text-center">
                                <p className="text-sm font-medium text-slate-500">Total Users</p>
                                <p className="mt-3 text-3xl font-bold text-slate-900">
                                    {usersResponse.data.length}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                            <div className="flex flex-col items-center text-center">
                                <p className="text-sm font-medium text-slate-500">Admins</p>
                                <p className="mt-3 text-3xl font-bold text-slate-900">
                                    {
                                        usersResponse.data.filter((user) => user.role === "admin")
                                            .length
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                            <div className="flex flex-col items-center text-center">
                                <p className="text-sm font-medium text-slate-500">
                                    Editors / Staff
                                </p>
                                <p className="mt-3 text-3xl font-bold text-slate-900">
                                    {
                                        usersResponse.data.filter(
                                            (user) =>
                                                user.role === "editor" ||
                                                user.role === "staff"
                                        ).length
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    <UsersManager users={usersResponse.data} />
                </>
            )}
        </section>
    );
}