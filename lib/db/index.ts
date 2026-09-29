import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export type Database = PostgresJsDatabase<typeof schema>;

// Reuse one client across hot reloads in dev and across requests on a warm
// serverless instance, rather than opening a new pool every time.
const globalForDb = globalThis as unknown as { db?: Database };

/**
 * Server-only Drizzle client connected to the Supabase Postgres database.
 * The connection string carries full database credentials, so this must
 * never be imported into a client component.
 *
 * Built lazily so a missing environment variable surfaces as a request-time
 * error rather than breaking the build.
 */
export function getDb(): Database {
  if (globalForDb.db) return globalForDb.db;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("Missing DATABASE_URL environment variable.");
  }

  // Supabase's transaction pooler (port 6543) doesn't support prepared
  // statements, so they're disabled to work with either pooler mode.
  const client = postgres(url, { prepare: false, max: 1 });
  globalForDb.db = drizzle(client, { schema });
  return globalForDb.db;
}

export * from "./schema";
