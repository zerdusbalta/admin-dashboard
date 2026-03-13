const bcrypt = require("bcryptjs");
const db = require("../config/db");

function initDb() {
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                                                 id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                 email TEXT NOT NULL UNIQUE,
                                                 password TEXT NOT NULL,
                                                 role TEXT NOT NULL DEFAULT 'admin',
                                                 isPrimaryAdmin INTEGER NOT NULL DEFAULT 0,
                                                 createdAt TEXT NOT NULL
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS products (
                                                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                    name TEXT NOT NULL,
                                                    description TEXT,
                                                    price REAL NOT NULL,
                                                    category TEXT,
                                                    stock INTEGER DEFAULT 0,
                                                    createdAt TEXT NOT NULL,
                                                    updatedAt TEXT NOT NULL,
                                                    createdBy INTEGER NOT NULL,
                                                    updatedBy INTEGER NOT NULL
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS audit_logs (
                                                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                      action TEXT NOT NULL,
                                                      entityType TEXT NOT NULL,
                                                      entityId INTEGER,
                                                      performedBy INTEGER,
                                                      performedByRole TEXT,
                                                      details TEXT,
                                                      createdAt TEXT NOT NULL
            )
        `);

        db.get(`SELECT COUNT(*) AS count FROM users`, async (error, row) => {
            if (error) {
                console.error("Users seed check error:", error.message);
                return;
            }

            if (row.count === 0) {
                try {
                    const now = new Date().toISOString();
                    const hashedPassword = await bcrypt.hash("123456", 10);

                    db.run(
                        `INSERT INTO users (email, password, role, isPrimaryAdmin, createdAt) VALUES (?, ?, ?, ?, ?)`,
                        ["admin@example.com", hashedPassword, "admin", 1, now],
                        (insertError) => {
                            if (insertError) {
                                console.error("User seed insert error:", insertError.message);
                            }
                        }
                    );
                } catch (hashError) {
                    console.error("Password hash error:", hashError.message);
                }
            }
        });

        db.get(`SELECT COUNT(*) AS count FROM products`, (error, row) => {
            if (error) {
                console.error("Products seed check error:", error.message);
                return;
            }

            if (row.count === 0) {
                const now = new Date().toISOString();
                const adminUserId = 1;

                const statement = db.prepare(`
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
                `);

                const products = [
                    ["Keyboard", "Mechanical keyboard", 99.99, "Electronics", 12, now, now, adminUserId, adminUserId],
                    ["Mouse", "Wireless mouse", 49.99, "Electronics", 20, now, now, adminUserId, adminUserId],
                    ["Monitor", "24 inch monitor", 199.99, "Electronics", 8, now, now, adminUserId, adminUserId],
                    ["Desk Lamp", "LED desk lamp", 29.99, "Home", 15, now, now, adminUserId, adminUserId],
                    ["Notebook", "A5 notebook", 9.99, "Office", 50, now, now, adminUserId, adminUserId],
                    ["Chair", "Ergonomic office chair", 249.99, "Furniture", 5, now, now, adminUserId, adminUserId]
                ];

                for (const product of products) {
                    statement.run(product);
                }

                statement.finalize();
            }
        });
    });
}

module.exports = initDb;