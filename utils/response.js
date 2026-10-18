export const successResponse = (
    res,
    message,
    data = null,
    statusCode = 200
) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

export const errorResponse = (
    res,
    message = "Internal Server Error",
    statusCode = 500
) => {
    return res.status(statusCode).json({
        success: false,
        message,
        data: null,
    });
};

// How these functions work
// - res — the Express response object.
// - message — a readable message for the client.
// - data — the response payload; defaults to null.
// - statusCode — the HTTP status code; defaults to 200 for success and 500 for errors.