import SectionHeader from "../../../components/shared/section-header";
import { mockProfile } from "../../../data/mock-profile";
import UserAvatar from "../../../components/shared/user-avatar";

export default function ProfilePage() {
    return (
        <section className="space-y-6">
            <SectionHeader
                title="Profile"
                description="View your account information and role details."
            />

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-5">
                    <div className="flex items-center gap-4">
                        <UserAvatar
                            name={mockProfile.fullName}
                            avatarUrl={mockProfile.avatarUrl}
                            size="md"
                        />

                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">
                                {mockProfile.fullName}
                            </h2>
                            <p className="text-sm text-slate-500">{mockProfile.email}</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-5 px-6 py-6 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Role
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-900">
                            {mockProfile.role}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Department
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-900">
                            {mockProfile.department}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            User ID
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-900">
                            {mockProfile.id}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Joined At
                        </p>
                        <p className="mt-2 text-sm font-medium text-slate-900">
                            {mockProfile.joinedAt}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}