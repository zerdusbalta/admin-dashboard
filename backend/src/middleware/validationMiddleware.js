function sendValidationError(res, message) {
    return res.status(400).json({
        message,
    });
}

function normalizeEmail(value) {
    return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function validateLogin(req, res, next) {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
        return sendValidationError(res, "Email and password must be strings");
    }

    const normalizedEmail = normalizeEmail(email);
    const normalizedPassword = password.trim();

    if (!normalizedEmail || !normalizedPassword) {
        return sendValidationError(res, "Email and password are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
        return sendValidationError(res, "Please enter a valid email address");
    }

    req.body.email = normalizedEmail;
    req.body.password = normalizedPassword;

    next();
}

function validateCreateUser(req, res, next) {
    const { email, password, role } = req.body;

    if (
        typeof email !== "string" ||
        typeof password !== "string" ||
        typeof role !== "string"
    ) {
        return sendValidationError(res, "Email, password, and role must be strings");
    }

    const normalizedEmail = normalizeEmail(email);
    const normalizedPassword = password.trim();
    const normalizedRole = role.trim().toLowerCase();

    if (!normalizedEmail || !normalizedPassword || !normalizedRole) {
        return sendValidationError(res, "Email, password, and role are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
        return sendValidationError(res, "Please enter a valid email address");
    }

    if (normalizedPassword.length < 6) {
        return sendValidationError(res, "Password must be at least 6 characters long");
    }

    const allowedRoles = ["admin", "editor"];

    if (!allowedRoles.includes(normalizedRole)) {
        return sendValidationError(res, "Role must be either admin or editor");
    }

    req.body.email = normalizedEmail;
    req.body.password = normalizedPassword;
    req.body.role = normalizedRole;

    next();
}

function validateProduct(req, res, next) {
    const { name, description, price, category, stock } = req.body;

    if (typeof name !== "string" || !name.trim()) {
        return sendValidationError(res, "Product name is required");
    }

    const parsedPrice = Number(price);

    if (!Number.isFinite(parsedPrice)) {
        return sendValidationError(res, "Price must be a valid number");
    }

    if (parsedPrice < 0) {
        return sendValidationError(res, "Price cannot be negative");
    }

    const parsedStock =
        stock === undefined || stock === null || stock === "" ? 0 : Number(stock);

    if (!Number.isInteger(parsedStock)) {
        return sendValidationError(res, "Stock must be a whole number");
    }

    if (parsedStock < 0) {
        return sendValidationError(res, "Stock cannot be negative");
    }

    req.body.name = name.trim();
    req.body.description = typeof description === "string" ? description.trim() : "";
    req.body.category = typeof category === "string" ? category.trim() : "";
    req.body.price = parsedPrice;
    req.body.stock = parsedStock;

    next();
}

function validateProductId(req, res, next) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
        return sendValidationError(res, "Invalid product id");
    }

    req.params.id = String(id);

    next();
}

module.exports = {
    validateLogin,
    validateCreateUser,
    validateProduct,
    validateProductId,
};