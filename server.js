import "dotenv/config";

import app from "./app.js";
import { connectDB } from "./config/db.js";

// Start the server
const PORT = process.env.PORT || 5001;

const startServer = async () => {
    try {
        // Connect to PostgreSQL first
        await connectDB();

        // Start Express only after DB connection succeeds
        app.listen(PORT, () => {
            console.log(`Server running on PORT ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();