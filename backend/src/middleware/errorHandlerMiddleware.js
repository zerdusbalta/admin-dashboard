function errorHandlerMiddleware(error, req, res, next) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal server error";

    if (statusCode >= 500) {
        console.error("Error:", {
            message: error.message,
            stack: error.stack,
            method: req.method,
            url: req.originalUrl,
        });
    }

    return res.status(statusCode).json({
        message,
    });
}

module.exports = errorHandlerMiddleware;