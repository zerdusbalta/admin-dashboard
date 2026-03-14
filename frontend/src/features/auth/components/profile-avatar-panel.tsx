"use client";

import { ChangeEvent, useEffect, useState, useSyncExternalStore } from "react";
import UserAvatar from "@/components/shared/user-avatar";

type ProfileAvatarPanelProps = {
    email: string;
};

function getAvatarStorageKey(email: string) {
    return `admin-dashboard-avatar:${email.toLowerCase()}`;
}

function subscribeToAvatarChanges(callback: () => void) {
    const handleAvatarUpdated = () => callback();
    const handleStorage = () => callback();

    window.addEventListener("avatar-updated", handleAvatarUpdated);
    window.addEventListener("storage", handleStorage);

    return () => {
        window.removeEventListener("avatar-updated", handleAvatarUpdated);
        window.removeEventListener("storage", handleStorage);
    };
}

export default function ProfileAvatarPanel({
                                               email,
                                           }: ProfileAvatarPanelProps) {
    const avatarUrl = useSyncExternalStore(
        subscribeToAvatarChanges,
        () => {
            if (typeof window === "undefined" || !email) {
                return "";
            }

            return localStorage.getItem(getAvatarStorageKey(email)) || "";
        },
        () => ""
    );

    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (!successMessage) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setSuccessMessage("");
        }, 2500);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [successMessage]);

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            const result = typeof reader.result === "string" ? reader.result : "";

            if (!result) {
                return;
            }

            localStorage.setItem(getAvatarStorageKey(email), result);
            window.dispatchEvent(new Event("avatar-updated"));
            setSuccessMessage("Profile photo updated successfully.");
        };

        reader.readAsDataURL(file);
        event.target.value = "";
    }

    function handleRemoveAvatar() {
        localStorage.removeItem(getAvatarStorageKey(email));
        window.dispatchEvent(new Event("avatar-updated"));
        setSuccessMessage("Profile photo removed successfully.");
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-4">
                <UserAvatar
                    name={email}
                    avatarUrl={avatarUrl || undefined}
                    size="md"
                />

                <div className="flex flex-wrap gap-2">
                    <label className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800">
                        Upload Photo
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>

                    {avatarUrl ? (
                        <button
                            type="button"
                            onClick={handleRemoveAvatar}
                            className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                            Remove Photo
                        </button>
                    ) : null}
                </div>
            </div>

            {successMessage ? (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                    {successMessage}
                </div>
            ) : null}
        </div>
    );
}