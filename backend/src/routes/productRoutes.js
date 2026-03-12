const express = require("express");
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");
const authenticateToken = require("../middleware/authMiddleware");
const {
    validateProduct,
    validateProductId,
} = require("../middleware/validationMiddleware");

const router = express.Router();

router.use(authenticateToken);

router.get("/", getAllProducts);
router.get("/:id", validateProductId, getProductById);
router.post("/", validateProduct, createProduct);
router.put("/:id", validateProductId, validateProduct, updateProduct);
router.delete("/:id", validateProductId, deleteProduct);

module.exports = router;