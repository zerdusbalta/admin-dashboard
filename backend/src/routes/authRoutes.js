const express = require("express");
const {
    login,
    createUser,
    changePassword,
    getUsers,
    deleteUser,
    logout,
} = require("../controllers/authController");
const {
    validateLogin,
    validateCreateUser,
    validateChangePassword,
} = require("../middleware/validationMiddleware");
const {
    authenticateToken,
    authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", validateLogin, login);
router.post("/users", validateCreateUser, createUser);
router.put(
    "/change-password",
    authenticateToken,
    validateChangePassword,
    changePassword
);

router.get("/users", authenticateToken, authorizeRoles("admin"), getUsers);
router.delete(
    "/users/:id",
    authenticateToken,
    authorizeRoles("admin"),
    deleteUser
);

router.post("/logout", logout);

module.exports = router;