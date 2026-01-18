#!/usr/bin/env bun
/**
 * Database seed script
 * Applies the seed.sql file to populate the database with initial data
 * 
 * Usage: bun scripts/db-seed.ts
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

console.log("Seeding database...");
console.log(`    Database: ${dbConfig.database}`);
console.log(`    Host: ${dbConfig.host}`);
console.log(`    Port: ${dbConfig.port}`);
console.log(`    User: ${dbConfig.user}`);

const sql = createConnection(dbConfig);

try {
  await executeSqlFile(sql, "sql/seed.sql");
  console.log("Database seeded successfully!");
} catch (error) {
  console.error("Error seeding database:", error);
  await sql.end();
  process.exit(1);
}

await sql.end();
