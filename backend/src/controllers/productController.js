const db = require("../config/db");
const AppError = require("../utils/AppError");
const { writeAuditLog } = require("../utils/auditLogger");

function getAllProducts(req, res, next) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    db.get(`SELECT COUNT(*) AS total FROM products`, (countError, countRow) => {
        if (countError) {
            return next(new AppError("Database error", 500));
        }

        db.all(
            `SELECT * FROM products ORDER BY id DESC LIMIT ? OFFSET ?`,
            [limit, offset],
            (error, rows) => {
                if (error) {
                    return next(new AppError("Database error", 500));
                }

                return res.json({
                    data: rows,
                    page,
                    limit,
                    total: countRow.total,
                    totalPages: Math.ceil(countRow.total / limit),
                });
            }
        );
    });
}

function getProductById(req, res, next) {
    const { id } = req.params;

    db.get(`SELECT * FROM products WHERE id = ?`, [id], (error, row) => {
        if (error) {
            return next(new AppError("Database error", 500));
        }

        if (!row) {
            return next(new AppError("Product not found", 404));
        }

        return res.json(row);
    });
}

function createProduct(req, res, next) {
    const { name, description, price, category, stock } = req.body;
    const userId = Number(req.user.id);
    const now = new Date().toISOString();

    db.run(
        `
            INSERT INTO products (
                name,
                description,
                price,
                category,
                stock,
                createdAt,
                updatedAt,
                createdBy,
                updatedBy
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [name, description, price, category, stock, now, now, userId, userId],
        function (error) {
            if (error) {
                return next(new AppError("Database error", 500));
            }

            writeAuditLog({
                action: "PRODUCT_CREATED",
                entityType: "product",
                entityId: this.lastID,
                performedBy: req.user.id,
                performedByRole: req.user.role,
                details: {
                    name,
                    price,
                    category,
                    stock,
                },
            });

            return res.status(201).json({
                message: "Product created successfully",
                id: this.lastID,
            });
        }
    );
}

function updateProduct(req, res, next) {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;
    const userId = Number(req.user.id);
    const now = new Date().toISOString();

    db.run(
        `
            UPDATE products
            SET name = ?, description = ?, price = ?, category = ?, stock = ?, updatedAt = ?, updatedBy = ?
            WHERE id = ?
        `,
        [name, description, price, category, stock, now, userId, id],
        function (error) {
            if (error) {
                return next(new AppError("Database error", 500));
            }

            if (this.changes === 0) {
                return next(new AppError("Product not found", 404));
            }

            writeAuditLog({
                action: "PRODUCT_UPDATED",
                entityType: "product",
                entityId: Number(id),
                performedBy: req.user.id,
                performedByRole: req.user.role,
                details: {
                    name,
                    price,
                    category,
                    stock,
                },
            });

            return res.json({
                message: "Product updated successfully",
            });
        }
    );
}

function deleteProduct(req, res, next) {
    const { id } = req.params;

    db.get(`SELECT id, name FROM products WHERE id = ?`, [id], (selectError, product) => {
        if (selectError) {
            return next(new AppError("Database error", 500));
        }

        if (!product) {
            return next(new AppError("Product not found", 404));
        }

        db.run(`DELETE FROM products WHERE id = ?`, [id], function (error) {
            if (error) {
                return next(new AppError("Database error", 500));
            }

            if (this.changes === 0) {
                return next(new AppError("Product not found", 404));
            }

            writeAuditLog({
                action: "PRODUCT_DELETED",
                entityType: "product",
                entityId: Number(id),
                performedBy: req.user.id,
                performedByRole: req.user.role,
                details: {
                    name: product.name,
                },
            });

            return res.json({
                message: "Product deleted successfully",
            });
        });
    });
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};