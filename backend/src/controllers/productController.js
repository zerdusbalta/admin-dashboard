const db = require("../config/db");

function getAllProducts(req, res) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    db.get(`SELECT COUNT(*) AS total FROM products`, (countError, countRow) => {
        if (countError) {
            return res.status(500).json({
                message: "Database error",
            });
        }

        db.all(
            `SELECT * FROM products ORDER BY id DESC LIMIT ? OFFSET ?`,
            [limit, offset],
            (error, rows) => {
                if (error) {
                    return res.status(500).json({
                        message: "Database error",
                    });
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

function getProductById(req, res) {
    const { id } = req.params;

    db.get(`SELECT * FROM products WHERE id = ?`, [id], (error, row) => {
        if (error) {
            return res.status(500).json({
                message: "Database error",
            });
        }

        if (!row) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        return res.json(row);
    });
}

function createProduct(req, res) {
    const { name, description, price, category, stock } = req.body;
    const now = new Date().toISOString();

    db.run(
        `
            INSERT INTO products (name, description, price, category, stock, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [name, description, price, category, stock, now, now],
        function (error) {
            if (error) {
                return res.status(500).json({
                    message: "Database error",
                });
            }

            return res.status(201).json({
                message: "Product created successfully",
                id: this.lastID,
            });
        }
    );
}

function updateProduct(req, res) {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;
    const now = new Date().toISOString();

    db.run(
        `
            UPDATE products
            SET name = ?, description = ?, price = ?, category = ?, stock = ?, updatedAt = ?
            WHERE id = ?
        `,
        [name, description, price, category, stock, now, id],
        function (error) {
            if (error) {
                return res.status(500).json({
                    message: "Database error",
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Product not found",
                });
            }

            return res.json({
                message: "Product updated successfully",
            });
        }
    );
}

function deleteProduct(req, res) {
    const { id } = req.params;

    db.run(`DELETE FROM products WHERE id = ?`, [id], function (error) {
        if (error) {
            return res.status(500).json({
                message: "Database error",
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        return res.json({
            message: "Product deleted successfully",
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