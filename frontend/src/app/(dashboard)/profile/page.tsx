import { cookies } from "next/headers";
import SectionHeader from "@/components/shared/section-header";
import ChangePasswordPanel from "@/features/auth/components/change-password-panel";
import ProfileAvatarPanel from "@/features/auth/components/profile-avatar-panel";
import {
    AUTH_USER_COOKIE_NAME,
    type AuthUser,
} from "@/features/auth/utils/auth-session";

export default async function ProfilePage() {
    const cookieStore = await cookies();
    const rawUser = cookieStore.get(AUTH_USER_COOKIE_NAME)?.value;

    let currentUser: AuthUser | null = null;

    if (rawUser) {
        try {
            currentUser = JSON.parse(decodeURIComponent(rawUser)) as AuthUser;
        } catch {
            currentUser = null;
        }
    }

    const email = currentUser?.email ?? "Unknown User";
    const role = currentUser?.role ?? "Unknown role";
    const userId = currentUser?.id ?? "—";
    const primaryAdminText = currentUser?.isPrimaryAdmin ? "Yes" : "No";

    return (
        <section className="space-y-6">
            <SectionHeader
                title="Profile"
                description="View your account information and role details."
            />

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <ProfileAvatarPanel email={email} />

                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">
                                    {email}
                                </h2>
                                <p className="text-sm text-slate-500">{role}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-5 px-6 py-6 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Role
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-900">
                            {role}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Primary Admin
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-900">
                            {primaryAdminText}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            User ID
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-900">
                            {userId}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Email
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-900">
                            {email}
                        </p>
                    </div>
                </div>
            </div>

            <ChangePasswordPanel />
        </section>
    );
}