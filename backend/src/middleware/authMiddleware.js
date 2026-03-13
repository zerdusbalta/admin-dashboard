const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new AppError("Access token is required", 401));
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return next(new AppError("Invalid or expired token", 401));
    }
}

function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return next(new AppError("User role is required", 403));
        }

        if (!allowedRoles.includes(req.user.role)) {
            return next(new AppError("You do not have permission to perform this action", 403));
        }

        next();
    };
}

module.exports = {
    authenticateToken,
    authorizeRoles,
};