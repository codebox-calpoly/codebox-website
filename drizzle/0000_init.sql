-- Baseline matching the tables originally created by supabase/schema.sql.
-- IF NOT EXISTS lets this run safely against a database that already has them.

CREATE TABLE IF NOT EXISTS "bootcamp_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"github_url" text NOT NULL,
	"deployed_url" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bootcamp_submissions" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "interest_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"linkedin_or_github" text,
	"year_in_school" text NOT NULL,
	"major" text NOT NULL,
	"experience_level" text,
	"interest_areas" text[] DEFAULT '{}' NOT NULL,
	"why_interested" text NOT NULL,
	"resume_path" text,
	"heard_about" text,
	"questions" text
);
--> statement-breakpoint
ALTER TABLE "interest_submissions" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "bootcamp_submissions_created_at_idx" ON "bootcamp_submissions" USING btree ("created_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "interest_submissions_created_at_idx" ON "interest_submissions" USING btree ("created_at" DESC NULLS LAST);