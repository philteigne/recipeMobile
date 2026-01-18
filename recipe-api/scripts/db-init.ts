#!/usr/bin/env bun
/**
 * Database initialization script
 * Creates the database, role, and extensions
 * 
 * Usage: bun scripts/db-init.ts
 * 
 * Required env vars:
 *   BOOTSTRAP_DB_PASS - Password for the head-chef role
 * 
 * Optional env vars:
 *   PGUSER - PostgreSQL superuser (default: postgres)
 *   PGHOST - PostgreSQL host (default: localhost)
 *   PGPORT - PostgreSQL port (default: 5432)
 *   PGPASSWORD - Password for PostgreSQL superuser
 */

import { createConnection, getDbConfig } from "./db-utils";

const PG_PASSWORD = process.env.PG_PASSWORD;
if (!PG_PASSWORD) {
  console.error("❌ Missing required env var: PG_PASSWORD");
  console.error("   Put it in .env or set it in your environment");
  process.exit(1);
}

const dbConfig = getDbConfig();
const superuserConfig = {
  host: dbConfig.host,
  port: dbConfig.port,
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "",
  database: "postgres", // Connect to postgres database to create new database
};

console.log("Running database initialization...");
console.log(`    Host: ${superuserConfig.host}`);
console.log(`    Port: ${superuserConfig.port}`);
console.log(`    User: ${superuserConfig.user}`);

const sql = createConnection(superuserConfig);

try {
  // 1) Create owner role if it doesn't exist
  console.log("    Creating role 'head-chef'...");
  // Escape single quotes in password for SQL (double them)
  const escapedPassword = PG_PASSWORD.replace(/'/g, "''");
  await sql.unsafe(`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'head-chef') THEN
        CREATE ROLE "head-chef" WITH LOGIN PASSWORD '${escapedPassword}';
      END IF;
    END
    $$;
  `);

  // 2) Create database if it doesn't exist
  console.log("    Creating database 'pantry-staging'...");
  const dbExists = await sql`
    SELECT 1 FROM pg_database WHERE datname = 'pantry-staging'
  `;
  
  if (dbExists.length === 0) {
    await sql`CREATE DATABASE "pantry-staging" OWNER "head-chef"`;
  } else {
    console.log("    Database 'pantry-staging' already exists");
  }

  // 3) Connect to the new database and configure
  await sql.end();
  const dbSql = createConnection({
    host: superuserConfig.host,
    port: superuserConfig.port,
    user: superuserConfig.user,
    password: superuserConfig.password,
    database: "pantry-staging",
  });

  console.log("    Enabling UUID extension...");
  await dbSql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  console.log("    Setting default privileges...");
  await dbSql`ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO "head-chef"`;
  await dbSql`ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO "head-chef"`;
  await dbSql`ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO "head-chef"`;

  await dbSql.end();
  
  console.log("Database initialization completed successfully!");
} catch (error) {
  console.error("Error during database initialization:", error);
  await sql.end();
  process.exit(1);
}
