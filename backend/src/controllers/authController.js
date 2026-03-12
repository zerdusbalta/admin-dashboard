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

    db.get(`SELECT id FROM users WHERE email = ?`, [email], async (selectError, existingUser) => {
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
    logout,
};