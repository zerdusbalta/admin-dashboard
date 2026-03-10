"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    AUTH_COOKIE_NAME,
    MOCK_USER,
} from "@/features/auth/utils/auth-session";
import { validateLogin } from "@/features/auth/utils/validate-login";

export default function LoginForm() {
    const router = useRouter();

    const [email, setEmail] = useState(MOCK_USER.email);
    const [password, setPassword] = useState(MOCK_USER.password);
    const [error, setError] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const result = validateLogin({ email, password });

        if (!result.isValid) {
            setError(result.error);
            return;
        }

        document.cookie = `${AUTH_COOKIE_NAME}=true; path=/`;
        router.push("/");
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                    placeholder="admin@example.com"
                />
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                    placeholder="Enter your password"
                />
            </div>

            {error ? (
                <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                    {error}
                </div>
            ) : null}

            <button
                type="submit"
                className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
                Sign In
            </button>

            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
                Demo credentials are enabled for mock authentication testing.
            </div>
        </form>
    );
}