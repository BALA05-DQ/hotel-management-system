import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
 const db = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
db.on("error", (error) => {
    console.log("Unexpected PostgreSQL pool error:", error.message);
});
export default db;