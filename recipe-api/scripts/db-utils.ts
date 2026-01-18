import postgres from "postgres";
import { readFileSync } from "fs";
import { join } from "path";

/**
 * Get database connection configuration from environment variables
 * Bun automatically loads .env files, so process.env is already populated
 */
export function getDbConfig() {
  return {
    host: process.env.PGHOST || "localhost",
    port: parseInt(process.env.PGPORT || "5432"),
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "",
    database: process.env.PGDATABASE || "postgres",
  };
}

/**
 * Create a PostgreSQL connection
 */
export function createConnection(config?: {
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  database?: string;
}) {
  const dbConfig = config || getDbConfig();
  return postgres({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
  });
}

/**
 * Read and execute a SQL file
 */
export async function executeSqlFile(
  sql: postgres.Sql,
  filePath: string
): Promise<void> {
  const fullPath = join(process.cwd(), filePath);
  let sqlContent = readFileSync(fullPath, "utf-8");
  
  // Remove single-line comments
  sqlContent = sqlContent.replace(/--.*$/gm, "");
  
  // Split by "CREATE TABLE" to handle multiple CREATE TABLE statements
  // This works even if statements don't have semicolons
  const parts = sqlContent.split(/(?=CREATE TABLE)/i);
  const statements = parts
    .map((part) => part.trim())
    .filter((part) => part.length > 0);
  
  // Execute each statement separately, ensuring it ends with a semicolon
  for (const statement of statements) {
    const trimmed = statement.trim();
    if (trimmed) {
      const withSemicolon = trimmed.endsWith(";") ? trimmed : trimmed + ";";
      await sql.unsafe(withSemicolon);
    }
  }
}
