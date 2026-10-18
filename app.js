import express from "express";

// Import Routes
import movieRoutes from "./routes/movieRoutes.js";

const app = express();

// Middleware to read JSON request bodies
app.use(express.json());

// API Routes
app.use("/movies", movieRoutes);

// app.get("/hello", (req, res) => {
//     res.json({ message: "Hello Movies World" });
// });

export default app;
