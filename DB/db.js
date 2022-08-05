import pg from "pg";
import * as Process from "process";

/*const db = new pg.Pool({
    user: Process.env.DB_USER||"postgres",
    password: Process.env.DB_PASSWORD || "root",
    host:Process.env.DB_HOST  || "localhost",
    port:5432,
    database:Process.env.DB_USERNAME || "kiber-one"
});*/

const db = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect();

export {db};