import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client. Uses the service role key, which bypasses row
 * level security, so this must never be imported into a client component.
 *
 * Built lazily so a missing environment variable surfaces as a request-time
 * error rather than breaking the build.
 */
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variable.",
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const RESUME_BUCKET = "resumes";
