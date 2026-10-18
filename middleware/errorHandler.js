const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.message);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};

// What does this code do?
// - err — the error object.
// - req — the incoming request.
// - res — the response sent to the client.
// - next — passes control to the next middleware if needed.
// - err.statusCode || 500 — uses the specified status code or defaults to 500.

export default errorHandler;