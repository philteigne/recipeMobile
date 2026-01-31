import { SQL } from "bun";
import { env } from "bun";

// Create the pool instance
export const sql = new SQL({
  hostname: env.PG_HOST,
  port: Number(env.PG_PORT) || 5432,
  username: env.PG_USER,
  password: env.PG_PASSWORD,
  database: env.PG_DATABASE,

  // Pooling configurations
  max: 10, // Max connections in the pool
  idleTimeout: 30, // Max seconds a connection can stay idle
  maxLifetime: 3600, // Max seconds a connection can exist (1 hour)
});
