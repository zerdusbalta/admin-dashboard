import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import LoginForm from "@/features/auth/components/login-form";
import { AUTH_COOKIE_NAME } from "@/features/auth/utils/auth-session";

export default async function LoginPage() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    if (sessionCookie) {
        redirect("/");
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-semibold text-slate-900">Login</h1>
                <p className="mt-2 text-sm text-slate-600">
                    Sign in to access the admin dashboard.
                </p>

                <LoginForm />
            </div>
        </main>
    );
}