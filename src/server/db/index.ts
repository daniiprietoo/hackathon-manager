import { createPool, type Pool } from "mysql2/promise";
import { drizzle } from "drizzle-orm/singlestore";

import { env } from "@/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Pool;
  client: Pool | undefined;
};

const conn: Pool =
  globalForDb.client ??
  createPool({
    host: env.SINGLESTORE_HOST,
    user: env.SINGLESTORE_USER,
    password: env.SINGLESTORE_PASSWORD,
    port: parseInt(env.SINGLESTORE_PORT),
    database: env.SINGLESTORE_DB_NAME,
    ssl: {},
    maxIdle: 0,
  });

if (env.NODE_ENV !== "production") globalForDb.conn = conn;

conn.addListener("error", (err) => {
  console.error("Database connection error:", err);
});

export const db = drizzle(conn, { schema });
