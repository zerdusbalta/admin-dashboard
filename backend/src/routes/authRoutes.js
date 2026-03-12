const express = require("express");
const { login, createUser, logout } = require("../controllers/authController");
const {
    validateLogin,
    validateCreateUser,
} = require("../middleware/validationMiddleware");

const router = express.Router();

router.post("/login", validateLogin, login);
router.post("/users", validateCreateUser, createUser);
router.post("/logout", logout);

module.exports = router;