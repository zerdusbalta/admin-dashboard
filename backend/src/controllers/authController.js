const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const AppError = require("../utils/AppError");

function login(req, res, next) {
    const { email, password } = req.body;

    db.get(
        `SELECT id, email, password, role FROM users WHERE email = ?`,
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

                const token = jwt.sign(
                    {
                        id: user.id,
                        email: user.email,
                        role: user.role,
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

                db.run(
                    `INSERT INTO users (email, password, role, createdAt) VALUES (?, ?, ?, ?)`,
                    [email, hashedPassword, role, now],
                    function (insertError) {
                        if (insertError) {
                            return next(new AppError("Database error", 500));
                        }

                        return res.status(201).json({
                            message: "User created successfully",
                            user: {
                                id: this.lastID,
                                email,
                                role,
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
    db.all(
        `SELECT id, email, role, createdAt FROM users ORDER BY id ASC`,
        [],
        (error, rows) => {
            if (error) {
                return next(new AppError("Database error", 500));
            }

            return res.json({
                data: rows,
            });
        }
    );
}

function deleteUser(req, res, next) {
    const userIdToDelete = Number(req.params.id);
    const currentUserId = Number(req.user.id);

    if (userIdToDelete === currentUserId) {
        return next(new AppError("You cannot delete your own account", 400));
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

            return res.json({
                message: "User deleted successfully",
            });
        }
    );
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
    deleteUser,
    logout,
};