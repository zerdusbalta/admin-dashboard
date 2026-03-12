const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const requestLogger = require("./middleware/requestLogger");
const { authRateLimiter } = require("./middleware/rateLimitMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
    res.json({ message: "Backend is running" });
});

app.use("/auth/login", authRateLimiter);
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

module.exports = app;