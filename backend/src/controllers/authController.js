const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

function login(req, res) {
    const { email, password } = req.body;

    db.get(
        `SELECT id, email, password FROM users WHERE email = ?`,
        [email],
        async (error, user) => {
            if (error) {
                return res.status(500).json({
                    message: "Database error",
                });
            }

            if (!user) {
                return res.status(401).json({
                    message: "Invalid credentials",
                });
            }

            try {
                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (!isPasswordValid) {
                    return res.status(401).json({
                        message: "Invalid credentials",
                    });
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
                return res.status(500).json({
                    message: "Authentication error",
                });
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