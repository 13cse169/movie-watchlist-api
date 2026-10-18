import express from "express";

import {
    getMovies,
    getMovieById,
    createMovie,
    createMultipleMovies,
} from "../controllers/movieController.js";

const router = express.Router();

// GET: Fetch all movies
router.get("/", getMovies);

// GET: Fetch one movie by ID
router.get("/:id", getMovieById);

// POST: Create a new movie
router.post("/", createMovie);

// POST: Create multiple movies
router.post("/bulk", createMultipleMovies);

// GET: HTTP 200 OK
// POST: HTTP 201 Created
// PUT: HTTP 200 OK
// DELETE: HTTP 200 OK

export default router;