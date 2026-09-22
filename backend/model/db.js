import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
    const db = new pg.Pool({
connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
          }
});
db.connect()
       .then(() => {
 console.log("PostgreSQL connected successfully");
    })
.catch((error) => {
            console.log("Database connection error:", error.message);
    });
export default db;
