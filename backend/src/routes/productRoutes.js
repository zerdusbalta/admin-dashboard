const express = require("express");
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");
const {
    authenticateToken,
    authorizeRoles,
} = require("../middleware/authMiddleware");
const {
    validateProduct,
    validateProductId,
} = require("../middleware/validationMiddleware");

const router = express.Router();

router.use(authenticateToken);

router.get("/", authorizeRoles("admin", "editor"), getAllProducts);
router.get("/:id", authorizeRoles("admin", "editor"), validateProductId, getProductById);
router.post("/", authorizeRoles("admin", "editor"), validateProduct, createProduct);
router.put(
    "/:id",
    authorizeRoles("admin", "editor"),
    validateProductId,
    validateProduct,
    updateProduct
);
router.delete("/:id", authorizeRoles("admin"), validateProductId, deleteProduct);

module.exports = router;