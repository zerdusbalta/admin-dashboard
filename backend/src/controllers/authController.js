const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const AppError = require("../utils/AppError");
const { canManageRole } = require("../middleware/authMiddleware");
const { writeAuditLog } = require("../utils/auditLogger");

function login(req, res, next) {
    const { email, password } = req.body;

    db.get(
        `SELECT id, email, password, role, isPrimaryAdmin FROM users WHERE email = ?`,
        [email],
        async (error, user) => {
            if (error) {
                return next(new AppError("Database error", 500));
            }

            if (!user) {
                return next(new AppError("Invalid credentials", 401));
            }

            try {
                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (!isPasswordValid) {
                    return next(new AppError("Invalid credentials", 401));
                }

                const isPrimaryAdmin = Boolean(user.isPrimaryAdmin);

                const token = jwt.sign(
                    {
                        id: user.id,
                        email: user.email,
                        role: user.role,
                        isPrimaryAdmin,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1h",
                    }
                );

                return res.json({
                    message: "Login successful",
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        role: user.role,
                        isPrimaryAdmin,
                    },
                });
            } catch (compareError) {
                return next(new AppError("Authentication error", 500));
            }
        }
    );
}

function createUser(req, res, next) {
    const { email, password, role } = req.body;
    const actorRole = req.user?.role || "admin";
    const actorIsPrimaryAdmin = Boolean(req.user?.isPrimaryAdmin);

    if (!canManageRole(actorRole, actorIsPrimaryAdmin, role)) {
        return next(new AppError("You do not have permission to assign this role", 403));
    }

    db.get(
        `SELECT id FROM users WHERE email = ?`,
        [email],
        async (selectError, existingUser) => {
            if (selectError) {
                return next(new AppError("Database error", 500));
            }

            if (existingUser) {
                return next(new AppError("A user with this email already exists", 409));
            }

            try {
                const now = new Date().toISOString();
                const hashedPassword = await bcrypt.hash(password, 10);
                const isPrimaryAdmin = 0;

                db.run(
                    `INSERT INTO users (email, password, role, isPrimaryAdmin, createdAt) VALUES (?, ?, ?, ?, ?)`,
                    [email, hashedPassword, role, isPrimaryAdmin, now],
                    function (insertError) {
                        if (insertError) {
                            return next(new AppError("Database error", 500));
                        }

                        writeAuditLog({
                            action: "USER_CREATED",
                            entityType: "user",
                            entityId: this.lastID,
                            performedBy: req.user?.id || null,
                            performedByRole: req.user?.role || "system",
                            details: {
                                email,
                                role,
                                isPrimaryAdmin: false,
                            },
                        });

                        return res.status(201).json({
                            message: "User created successfully",
                            user: {
                                id: this.lastID,
                                email,
                                role,
                                isPrimaryAdmin: false,
                            },
                        });
                    }
                );
            } catch (hashError) {
                return next(new AppError("Password hashing failed", 500));
            }
        }
    );
}

function changePassword(req, res, next) {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    db.get(
        `SELECT id, password FROM users WHERE id = ?`,
        [userId],
        async (selectError, user) => {
            if (selectError) {
                return next(new AppError("Database error", 500));
            }

            if (!user) {
                return next(new AppError("User not found", 404));
            }

            try {
                const isCurrentPasswordValid = await bcrypt.compare(
                    currentPassword,
                    user.password
                );

                if (!isCurrentPasswordValid) {
                    return next(new AppError("Current password is incorrect", 401));
                }

                const hashedNewPassword = await bcrypt.hash(newPassword, 10);

                db.run(
                    `UPDATE users SET password = ? WHERE id = ?`,
                    [hashedNewPassword, userId],
                    function (updateError) {
                        if (updateError) {
                            return next(new AppError("Database error", 500));
                        }

                        if (this.changes === 0) {
                            return next(new AppError("User not found", 404));
                        }

                        writeAuditLog({
                            action: "PASSWORD_CHANGED",
                            entityType: "user",
                            entityId: userId,
                            performedBy: req.user.id,
                            performedByRole: req.user.role,
                            details: {
                                changedBySelf: true,
                            },
                        });

                        return res.json({
                            message: "Password changed successfully",
                        });
                    }
                );
            } catch (hashError) {
                return next(new AppError("Password update failed", 500));
            }
        }
    );
}

function getUsers(req, res, next) {
    if (req.user.role === "admin") {
        return db.all(
            `SELECT id, email, role, isPrimaryAdmin, createdAt FROM users ORDER BY id ASC`,
            [],
            (error, rows) => {
                if (error) {
                    return next(new AppError("Database error", 500));
                }

                return res.json({
                    data: rows.map((row) => ({
                        ...row,
                        isPrimaryAdmin: Boolean(row.isPrimaryAdmin),
                    })),
                });
            }
        );
    }

    if (req.user.role === "editor") {
        return db.all(
            `SELECT id, email, role, isPrimaryAdmin, createdAt FROM users WHERE role = ? ORDER BY id ASC`,
            ["staff"],
            (error, rows) => {
                if (error) {
                    return next(new AppError("Database error", 500));
                }

                return res.json({
                    data: rows.map((row) => ({
                        ...row,
                        isPrimaryAdmin: Boolean(row.isPrimaryAdmin),
                    })),
                });
            }
        );
    }

    return next(new AppError("You do not have permission to perform this action", 403));
}

function updateUserRole(req, res, next) {
    const userIdToUpdate = Number(req.params.id);
    const currentUserId = Number(req.user.id);
    const actorRole = req.user.role;
    const actorIsPrimaryAdmin = Boolean(req.user.isPrimaryAdmin);
    const { role } = req.body;

    if (userIdToUpdate === currentUserId) {
        return next(new AppError("You cannot change your own role", 400));
    }

    db.get(
        `SELECT id, role, isPrimaryAdmin FROM users WHERE id = ?`,
        [userIdToUpdate],
        (selectError, targetUser) => {
            if (selectError) {
                return next(new AppError("Database error", 500));
            }

            if (!targetUser) {
                return next(new AppError("User not found", 404));
            }

            if (targetUser.isPrimaryAdmin) {
                return next(new AppError("Primary admin role cannot be changed here", 403));
            }

            if (
                !canManageRole(actorRole, actorIsPrimaryAdmin, targetUser.role) ||
                !canManageRole(actorRole, actorIsPrimaryAdmin, role)
            ) {
                return next(new AppError("You do not have permission to change this role", 403));
            }

            db.run(
                `UPDATE users SET role = ? WHERE id = ?`,
                [role, userIdToUpdate],
                function (error) {
                    if (error) {
                        return next(new AppError("Database error", 500));
                    }

                    if (this.changes === 0) {
                        return next(new AppError("User not found", 404));
                    }

                    writeAuditLog({
                        action: "USER_ROLE_UPDATED",
                        entityType: "user",
                        entityId: userIdToUpdate,
                        performedBy: req.user.id,
                        performedByRole: req.user.role,
                        details: {
                            previousRole: targetUser.role,
                            newRole: role,
                        },
                    });

                    return res.json({
                        message: "User role updated successfully",
                    });
                }
            );
        }
    );
}

function deleteUser(req, res, next) {
    const userIdToDelete = Number(req.params.id);
    const currentUserId = Number(req.user.id);
    const actorRole = req.user.role;
    const actorIsPrimaryAdmin = Boolean(req.user.isPrimaryAdmin);

    if (userIdToDelete === currentUserId) {
        return next(new AppError("You cannot delete your own account", 400));
    }

    db.get(
        `SELECT id, email, role, isPrimaryAdmin FROM users WHERE id = ?`,
        [userIdToDelete],
        (selectError, targetUser) => {
            if (selectError) {
                return next(new AppError("Database error", 500));
            }

            if (!targetUser) {
                return next(new AppError("User not found", 404));
            }

            if (targetUser.isPrimaryAdmin) {
                return next(new AppError("Primary admin cannot be deleted here", 403));
            }

            if (!canManageRole(actorRole, actorIsPrimaryAdmin, targetUser.role)) {
                return next(new AppError("You do not have permission to delete this user", 403));
            }

            db.run(
                `DELETE FROM users WHERE id = ?`,
                [userIdToDelete],
                function (error) {
                    if (error) {
                        return next(new AppError("Database error", 500));
                    }

                    if (this.changes === 0) {
                        return next(new AppError("User not found", 404));
                    }

                    writeAuditLog({
                        action: "USER_DELETED",
                        entityType: "user",
                        entityId: userIdToDelete,
                        performedBy: req.user.id,
                        performedByRole: req.user.role,
                        details: {
                            email: targetUser.email,
                            deletedRole: targetUser.role,
                            deletedPrimaryAdmin: Boolean(targetUser.isPrimaryAdmin),
                        },
                    });

                    return res.json({
                        message: "User deleted successfully",
                    });
                }
            );
        }
    );
}

function transferPrimaryAdmin(req, res, next) {
    const targetUserId = Number(req.params.id);
    const currentUserId = Number(req.user.id);

    if (req.user.role !== "admin" || !req.user.isPrimaryAdmin) {
        return next(new AppError("Only the primary admin can transfer primary admin access", 403));
    }

    if (targetUserId === currentUserId) {
        return next(new AppError("You already have primary admin access", 400));
    }

    db.get(
        `SELECT id, email, role, isPrimaryAdmin FROM users WHERE id = ?`,
        [targetUserId],
        (selectError, targetUser) => {
            if (selectError) {
                return next(new AppError("Database error", 500));
            }

            if (!targetUser) {
                return next(new AppError("User not found", 404));
            }

            if (targetUser.role !== "admin") {
                return next(new AppError("Primary admin access can only be transferred to an admin user", 400));
            }

            if (targetUser.isPrimaryAdmin) {
                return next(new AppError("This user is already the primary admin", 400));
            }

            db.serialize(() => {
                db.run(
                    `UPDATE users SET isPrimaryAdmin = 0 WHERE id = ?`,
                    [currentUserId],
                    (removeError) => {
                        if (removeError) {
                            return next(new AppError("Database error", 500));
                        }

                        db.run(
                            `UPDATE users SET isPrimaryAdmin = 1 WHERE id = ?`,
                            [targetUserId],
                            function (assignError) {
                                if (assignError) {
                                    return next(new AppError("Database error", 500));
                                }

                                if (this.changes === 0) {
                                    return next(new AppError("User not found", 404));
                                }

                                writeAuditLog({
                                    action: "PRIMARY_ADMIN_TRANSFERRED",
                                    entityType: "user",
                                    entityId: targetUserId,
                                    performedBy: req.user.id,
                                    performedByRole: req.user.role,
                                    details: {
                                        previousPrimaryAdminId: currentUserId,
                                        newPrimaryAdminId: targetUserId,
                                        newPrimaryAdminEmail: targetUser.email,
                                    },
                                });

                                return res.json({
                                    message: "Primary admin access transferred successfully",
                                });
                            }
                        );
                    }
                );
            });
        }
    );
}

function getAuditLogs(req, res, next) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const isEditor = req.user.role === "editor";

    const countQuery = isEditor
        ? `SELECT COUNT(*) AS total FROM audit_logs WHERE performedByRole = ?`
        : `SELECT COUNT(*) AS total FROM audit_logs`;

    const countParams = isEditor ? ["staff"] : [];

    db.get(countQuery, countParams, (countError, countRow) => {
        if (countError) {
            return next(new AppError("Database error", 500));
        }

        const logsQuery = isEditor
            ? `
                SELECT
                    audit_logs.*,
                    users.email AS performedByEmail
                FROM audit_logs
                LEFT JOIN users ON users.id = audit_logs.performedBy
                WHERE audit_logs.performedByRole = ?
                ORDER BY audit_logs.id DESC
                LIMIT ? OFFSET ?
            `
            : `
                SELECT
                    audit_logs.*,
                    users.email AS performedByEmail
                FROM audit_logs
                LEFT JOIN users ON users.id = audit_logs.performedBy
                ORDER BY audit_logs.id DESC
                LIMIT ? OFFSET ?
            `;

        const logsParams = isEditor
            ? ["staff", limit, offset]
            : [limit, offset];

        db.all(logsQuery, logsParams, (error, rows) => {
            if (error) {
                return next(new AppError("Database error", 500));
            }

            const parsedRows = rows.map((row) => ({
                ...row,
                details: row.details ? JSON.parse(row.details) : null,
            }));

            return res.json({
                data: parsedRows,
                page,
                limit,
                total: countRow.total,
                totalPages: Math.ceil(countRow.total / limit),
            });
        });
    });
}

function logout(req, res) {
    return res.json({
        message: "Logout successful",
    });
}

module.exports = {
    login,
    createUser,
    changePassword,
    getUsers,
    updateUserRole,
    deleteUser,
    transferPrimaryAdmin,
    getAuditLogs,
    logout,
};