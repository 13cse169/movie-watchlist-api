import pg from "pg";

// PostgreSQL connection configuration
const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Check PostgreSQL connection
export const connectDB = async () => {
    try {
        const result = await pool.query("SELECT NOW()");

        console.log("PostgreSQL connected successfully!");
        console.log("Database time:", result.rows[0].now);
    } catch (error) {
        console.error(
            "PostgreSQL connection failed:",
            error.message
        );

        throw error;
    }
};

// Export pool for controllers
export default pool;