#!/usr/bin/env bun
/**
 * Database schema build script
 * Applies the schema.sql file to the database
 * 
 * Usage: bun scripts/db-build.ts
 * 
 * Optional env vars:
 *   PGUSER - PostgreSQL user (default: head-chef)
 *   PGHOST - PostgreSQL host (default: localhost)
 *   PGPORT - PostgreSQL port (default: 5432)
 *   PGPASSWORD - Password for PostgreSQL user
 *   PGDATABASE - Database name (default: pantry-staging)
 */

import { createConnection, executeSqlFile } from "./db-utils";

const dbConfig = {
  host: process.env.PGHOST || "localhost",
  port: parseInt(process.env.PGPORT || "5432"),
  user: process.env.PGUSER || "head-chef",
  password: process.env.PGPASSWORD || "",
  database: process.env.PGDATABASE || "pantry-staging",
};

console.log("Applying schema to database...");
console.log(`    Database: ${dbConfig.database}`);
console.log(`    Host: ${dbConfig.host}`);
console.log(`    Port: ${dbConfig.port}`);
console.log(`    User: ${dbConfig.user}`);

const sql = createConnection(dbConfig);

try {
  await executeSqlFile(sql, "sql/schema.sql");
  console.log("Schema applied successfully!");
} catch (error) {
  console.error("Error applying schema:", error);
  await sql.end();
  process.exit(1);
}

await sql.end();
