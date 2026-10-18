import pool from "../config/db.js";

import {
    successResponse,
    errorResponse,
} from "../utils/response.js";

// GET: Fetch all movies
export const getMovies = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM movies ORDER BY id"
        );

        // res.json(result.rows);

        // res.status(200).json({
        //     success: true,
        //     message: "Movies fetched successfully",
        //     data: result.rows,
        // });

        return successResponse(
            res,
            "Movies fetched successfully",
            result.rows
        );
    } catch (error) {
        console.error(error.message);

        // res.status(500).json({
        //     success: false,
        //     message: "Failed to fetch movies",
        // });

        return errorResponse(
            res,
            "Failed to fetch movies",
            500
        );
    }
};

// GET: Fetch movie by ID
export const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM movies WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return errorResponse(
                res,
                "Movie not found",
                404
            );
        }

        return successResponse(
            res,
            "Movie fetched successfully",
            result.rows[0]
        );
    } catch (error) {
        console.error(error.message);

        return errorResponse(
            res,
            "Failed to fetch movies",
            500
        );
    }
};

// POST: Create a new movie
export const createMovie = async (req, res) => {
    try {
        const { title, release_year, genre, watched } = req.body;

        // Validate required field
        if (!title || !title.trim()) {
            return errorResponse(
                res,
                "Movie title is required",
                400
            );
        }

        // Insert movie into PostgreSQL
        const result = await pool.query(
            `INSERT INTO movies
                (title, release_year, genre, watched)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [
                title.trim(),
                release_year ?? null,
                genre ?? null,
                watched ?? false,
            ]
        );

        // Return created movie
        return successResponse(
            res,
            "Movie created successfully",
            result.rows[0],
            201
        );
    } catch (error) {
        console.error("Create movie error:", error.message);

        return errorResponse(
            res,
            "Failed to create movie",
            500
        );
    }
};

// POST: Insert multiple movies
export const createMultipleMovies = async (req, res) => {
    try {
        const movies = req.body;

        // Validate request body
        if (!Array.isArray(movies) || movies.length === 0) {
            return errorResponse(
                res,
                "Request body must be a non-empty array of movies",
                400
            );
        }

        // Validate movie titles
        const invalidMovie = movies.some(
            (movie) =>
                !movie ||
                typeof movie.title !== "string" ||
                !movie.title.trim()
        );

        if (invalidMovie) {
            return errorResponse(
                res,
                "Every movie must have a valid title",
                400
            );
        }

        // Build parameterized INSERT query
        const values = [];
        const placeholders = movies.map((movie, index) => {
            const offset = index * 4;

            values.push(
                movie.title.trim(),
                movie.release_year ?? null,
                movie.genre ?? null,
                movie.watched ?? false
            );

            return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4})`;
        });

        const query = `
            INSERT INTO movies
                (title, release_year, genre, watched)
            VALUES ${placeholders.join(", ")}
            RETURNING *
        `;

        const result = await pool.query(query, values);

        return successResponse(
            res,
            "Movies created successfully",
            result.rows,
            201
        );
    } catch (error) {
        console.error("Bulk insert error:", error.message);

        return errorResponse(
            res,
            "Failed to create movies",
            500
        );
    }
};

// Keep the HTTP status code meaningful:
// - 200 — successful read or update.
// - 201 — resource created.
// - 400 — invalid request data.
// - 404 — movie or route not found.
// - 500 — unexpected server error.