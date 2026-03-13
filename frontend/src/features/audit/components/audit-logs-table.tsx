"use client";

import { useState } from "react";
import type { AuditLog } from "../types/audit-log.types";

type AuditLogsTableProps = {
    logs: AuditLog[];
};

function formatAction(action: string) {
    return action
        .toLowerCase()
        .split("_")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

function formatDate(value: string) {
    return new Date(value).toLocaleString();
}

export default function AuditLogsTable({ logs }: AuditLogsTableProps) {
    const [expandedLogId, setExpandedLogId] = useState<number | null>(null);

    if (logs.length === 0) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-500 shadow-sm">
                No audit logs found.
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
                            Action
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Entity
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Actor
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Time
                        </th>
                        <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            More
                        </th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200 bg-white">
                    {logs.map((log) => {
                        const isExpanded = expandedLogId === log.id;

                        return (
                            <FragmentRow
                                key={log.id}
                                log={log}
                                isExpanded={isExpanded}
                                onToggle={() =>
                                    setExpandedLogId((current) =>
                                        current === log.id ? null : log.id
                                    )
                                }
                            />
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

type FragmentRowProps = {
    log: AuditLog;
    isExpanded: boolean;
    onToggle: () => void;
};

function FragmentRow({ log, isExpanded, onToggle }: FragmentRowProps) {
    return (
        <>
            <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 align-top">
                    <p className="text-sm font-semibold text-slate-900">
                        {formatAction(log.action)}
                    </p>
                </td>

                <td className="px-6 py-4 align-top text-sm text-slate-600">
                    <div>
                        <p className="font-medium text-slate-900">{log.entityType}</p>
                        <p className="mt-1 text-xs text-slate-400">
                            {log.entityId ? `Entity #${log.entityId}` : "No entity id"}
                        </p>
                    </div>
                </td>

                <td className="px-6 py-4 align-top text-sm text-slate-600">
                    {log.performedByEmail || "Unknown actor"}
                </td>

                <td className="whitespace-nowrap px-6 py-4 align-top text-sm text-slate-600">
                    {formatDate(log.createdAt)}
                </td>

                <td className="whitespace-nowrap px-6 py-4 align-top">
                    <button
                        type="button"
                        onClick={onToggle}
                        className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-300 bg-white px-3.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        {isExpanded ? "Hide" : "Details"}
                    </button>
                </td>
            </tr>

            {isExpanded ? (
                <tr className="bg-slate-50/70">
                    <td colSpan={5} className="px-6 py-4">
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-xl border border-slate-200 bg-white p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Actor Role
                                </p>
                                <p className="mt-2 text-sm text-slate-700">
                                    {log.performedByRole || "—"}
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-white p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Actor ID
                                </p>
                                <p className="mt-2 text-sm text-slate-700">
                                    {log.performedBy ?? "—"}
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-white p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Entity ID
                                </p>
                                <p className="mt-2 text-sm text-slate-700">
                                    {log.entityId ?? "—"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Details
                            </p>

                            {log.details && Object.keys(log.details).length > 0 ? (
                                <div className="mt-3 space-y-2">
                                    {Object.entries(log.details).map(([key, value]) => (
                                        <div
                                            key={key}
                                            className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-2 text-sm last:border-b-0 last:pb-0"
                                        >
                                            <span className="font-medium capitalize text-slate-600">
                                                {key}
                                            </span>
                                            <span className="text-slate-800">
                                                {String(value)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="mt-3 text-sm text-slate-500">No extra details.</p>
                            )}
                        </div>
                    </td>
                </tr>
            ) : null}
        </>
    );
}