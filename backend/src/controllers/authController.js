const db = require("../config/db");

function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required",
        });
    }

    db.get(
        `SELECT id, email, password FROM users WHERE email = ?`,
        [email],
        (error, user) => {
            if (error) {
                return res.status(500).json({
                    message: "Database error",
                });
            }

            if (!user || user.password !== password) {
                return res.status(401).json({
                    message: "Invalid credentials",
                });
            }

            return res.json({
                message: "Login successful",
                user: {
                    id: user.id,
                    email: user.email,
                },
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
    logout,
};