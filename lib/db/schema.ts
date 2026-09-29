import { sql } from "drizzle-orm";
import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Both tables have row level security enabled with no policies attached, which
// denies all access through the anon/publishable key. Rows are written by the
// API routes over a direct Postgres connection, so no database credentials
// ever reach the browser.

export const interestSubmissions = pgTable(
  "interest_submissions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    fullName: text("full_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    linkedinOrGithub: text("linkedin_or_github"),
    yearInSchool: text("year_in_school").notNull(),
    major: text("major").notNull(),
    experienceLevel: text("experience_level"),
    interestAreas: text("interest_areas")
      .array()
      .notNull()
      .default(sql`'{}'`),
    whyInterested: text("why_interested").notNull(),
    // Object key in the private "resumes" Supabase Storage bucket.
    resumePath: text("resume_path"),
    heardAbout: text("heard_about"),
    questions: text("questions"),
  },
  (table) => [
    index("interest_submissions_created_at_idx").on(table.createdAt.desc()),
  ],
).enableRLS();

export const bootcampSubmissions = pgTable(
  "bootcamp_submissions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    fullName: text("full_name").notNull(),
    email: text("email").notNull(),
    githubUrl: text("github_url").notNull(),
    deployedUrl: text("deployed_url").notNull(),
  },
  (table) => [
    index("bootcamp_submissions_created_at_idx").on(table.createdAt.desc()),
  ],
).enableRLS();

export type NewInterestSubmission = typeof interestSubmissions.$inferInsert;
export type NewBootcampSubmission = typeof bootcampSubmissions.$inferInsert;
