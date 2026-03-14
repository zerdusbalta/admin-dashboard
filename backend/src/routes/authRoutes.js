const express = require("express");
const {
    login,
    createUser,
    changePassword,
    getUsers,
    updateUserRole,
    deleteUser,
    transferPrimaryAdmin,
    getAuditLogs,
    logout,
} = require("../controllers/authController");
const {
    validateLogin,
    validateCreateUser,
    validateChangePassword,
    validateUpdateUserRole,
} = require("../middleware/validationMiddleware");
const {
    authenticateToken,
    authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", validateLogin, login);

router.post(
    "/users",
    authenticateToken,
    authorizeRoles("admin", "editor"),
    validateCreateUser,
    createUser
);

router.put(
    "/change-password",
    authenticateToken,
    validateChangePassword,
    changePassword
);

router.get("/users", authenticateToken, authorizeRoles("admin", "editor", "staff"), getUsers);

router.put(
    "/users/:id/role",
    authenticateToken,
    authorizeRoles("admin", "editor"),
    validateUpdateUserRole,
    updateUserRole
);

router.put(
    "/users/:id/transfer-primary-admin",
    authenticateToken,
    authorizeRoles("admin"),
    transferPrimaryAdmin
);

router.delete(
    "/users/:id",
    authenticateToken,
    authorizeRoles("admin", "editor"),
    deleteUser
);

router.get(
    "/audit-logs",
    authenticateToken,
    authorizeRoles("admin", "editor", "staff"),
    getAuditLogs
);

router.post("/logout", logout);

module.exports = router;