import express from "express";

import {
    getMovies,
    getMovieById,
} from "../controllers/movieController.js";

const router = express.Router();

// GET: Fetch all movies
router.get("/", getMovies);

// GET: Fetch one movie by ID
router.get("/:id", getMovieById);


export default router;