const express = require("express");
const { login, logout } = require("../controllers/authController");
const { validateLogin } = require("../middleware/validationMiddleware");

const router = express.Router();

router.post("/login", validateLogin, login);
router.post("/logout", logout);

module.exports = router;