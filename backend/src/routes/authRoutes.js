const express = require("express");
const {
    login,
    createUser,
    changePassword,
    logout,
} = require("../controllers/authController");
const {
    validateLogin,
    validateCreateUser,
    validateChangePassword,
} = require("../middleware/validationMiddleware");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", validateLogin, login);
router.post("/users", validateCreateUser, createUser);
router.put(
    "/change-password",
    authenticateToken,
    validateChangePassword,
    changePassword
);
router.post("/logout", logout);

module.exports = router;