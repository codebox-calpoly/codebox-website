import { defineConfig } from "drizzle-kit";

// drizzle-kit doesn't read .env.local on its own; the db:migrate, db:push and
// db:studio scripts in package.json load it before running.
export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  // Only manage the app's tables; leave Supabase's auth/storage schemas alone.
  schemaFilter: ["public"],
});
