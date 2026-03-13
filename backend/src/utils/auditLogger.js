const db = require("../config/db");

function writeAuditLog({
                           action,
                           entityType,
                           entityId = null,
                           performedBy = null,
                           performedByRole = null,
                           details = null,
                       }) {
    const createdAt = new Date().toISOString();
    const serializedDetails = details ? JSON.stringify(details) : null;

    db.run(
        `
            INSERT INTO audit_logs (
                action,
                entityType,
                entityId,
                performedBy,
                performedByRole,
                details,
                createdAt
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
            action,
            entityType,
            entityId,
            performedBy,
            performedByRole,
            serializedDetails,
            createdAt,
        ],
        (error) => {
            if (error) {
                console.error("Audit log insert error:", error.message);
            }
        }
    );
}

module.exports = {
    writeAuditLog,
};