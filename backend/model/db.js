import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { pool }=pg;
const db = new pg.Pool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT || 5432,
});
db.connect ()
.then(()=>{
    console.log("PostgreSQL connected successfully");
})
.catch((error)=>{
    console.log("Database connection error:",error.message);
});

export default db;