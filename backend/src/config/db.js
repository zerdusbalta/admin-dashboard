const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.join(__dirname, "../database/app.db");

const db = new sqlite3.Database(dbPath, (error) => {
    if (error) {
        console.error("Database connection error:", error.message);
    } else {
        console.log("Connected to SQLite database");
    }
});

module.exports = db;