const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const AppError = require("../utils/AppError");

function login(req, res, next) {
    const { email, password } = req.body;

    db.get(
        `SELECT id, email, password FROM users WHERE email = ?`,
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
                    },
                });
            } catch (compareError) {
                return next(new AppError("Authentication error", 500));
            }
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
    logout,
};