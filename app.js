import express from "express";

import errorHandler from "./middleware/errorHandler.js";

// Import Routes
import movieRoutes from "./routes/movieRoutes.js";

const app = express();

// Middleware to read JSON request bodies
app.use(express.json());

// API Routes
app.use("/movies", movieRoutes);

// 404 handler (for routes that do not exist)
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Routes not found: ${req.method} ${req.originalUrl}`
    })
})

// Centralized error handler (must be after routes)
app.use(errorHandler);

export default app;
