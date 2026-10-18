import pool from "../config/db.js";

// GET: Fetch all movies
export const getMovies = async (req, res) => {
    // try {
    //     const result = await pool.query(
    //         "SELECT * FROM movies ORDER BY id"
    //     );

    //     res.json(result.rows);
    // } catch (error) {
    //     console.error(error.message);

    //     res.status(500).json({
    //         message: "Failed to fetch movies",
    //     });
    // }

    res.json({httpMethod: "GET: getMovies"});
};

// GET: Fetch movie by ID
export const getMovieById = async (req, res) => {
    // try {
    //     const { id } = req.params;

    //     const result = await pool.query(
    //         "SELECT * FROM movies WHERE id = $1",
    //         [id]
    //     );

    //     if (result.rows.length === 0) {
    //         return res.status(404).json({
    //             message: "Movie not found",
    //         });
    //     }

    //     res.json(result.rows[0]);
    // } catch (error) {
    //     console.error(error.message);

    //     res.status(500).json({
    //         message: "Failed to fetch movie",
    //     });
    // }

    const { id } = req.params;

    res.json({httpMethod: `GET: getMoviesById: ${id}`});
};
