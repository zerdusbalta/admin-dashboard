"use client";

import { useState } from "react";
import ChangePasswordForm from "./change-password-form";

export default function ChangePasswordPanel() {
    const [isOpen, setIsOpen] = useState(false);

    function handleToggle() {
        setIsOpen((current) => !current);
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleToggle}
                    className="inline-flex h-10 items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                    {isOpen ? "Hide Change Password" : "Change Password"}
                </button>
            </div>

            {isOpen ? <ChangePasswordForm /> : null}
        </div>
    );
}