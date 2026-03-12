const db = require("../config/db");

function initDb() {
    db.serialize(() => {
        db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
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
        updatedAt TEXT NOT NULL
      )
    `);

        db.get(`SELECT COUNT(*) AS count FROM users`, (error, row) => {
            if (error) {
                console.error("Users seed check error:", error.message);
                return;
            }

            if (row.count === 0) {
                const now = new Date().toISOString();

                db.run(
                    `INSERT INTO users (email, password, createdAt) VALUES (?, ?, ?)`,
                    ["admin@example.com", "123456", now]
                );
            }
        });

        db.get(`SELECT COUNT(*) AS count FROM products`, (error, row) => {
            if (error) {
                console.error("Products seed check error:", error.message);
                return;
            }

            if (row.count === 0) {
                const now = new Date().toISOString();

                const statement = db.prepare(`
          INSERT INTO products (name, description, price, category, stock, createdAt, updatedAt)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

                const products = [
                    ["Keyboard", "Mechanical keyboard", 99.99, "Electronics", 12, now, now],
                    ["Mouse", "Wireless mouse", 49.99, "Electronics", 20, now, now],
                    ["Monitor", "24 inch monitor", 199.99, "Electronics", 8, now, now],
                    ["Desk Lamp", "LED desk lamp", 29.99, "Home", 15, now, now],
                    ["Notebook", "A5 notebook", 9.99, "Office", 50, now, now],
                    ["Chair", "Ergonomic office chair", 249.99, "Furniture", 5, now, now]
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