
import { SQL } from "bun";

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is required");
}

const db = new SQL(process.env.DATABASE_URL!, {
    ssl: true,
    max: 5,
    idleTimeout: 30,
});

export default db;
