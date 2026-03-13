export type AuditLogDetails = Record<string, string | number | boolean | null>;

export type AuditLog = {
    id: number;
    action: string;
    entityType: string;
    entityId: number | null;
    performedBy: number | null;
    performedByRole: string | null;
    performedByEmail: string | null;
    details: AuditLogDetails | null;
    createdAt: string;
};

export type PaginatedAuditLogsResponse = {
    data: AuditLog[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};