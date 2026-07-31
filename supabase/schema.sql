-- Schema for the member interest form.
-- Run this once in the Supabase SQL editor (Dashboard > SQL Editor > New query).

create table if not exists public.interest_submissions (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz not null default now(),
    full_name text not null,
    email text not null,
    phone text,
    linkedin_or_github text,
    year_in_school text not null,
    major text not null,
    experience_level text,
    interest_areas text[] not null default '{}',
    why_interested text not null,
    resume_path text,
    heard_about text,
    questions text
);

create index if not exists interest_submissions_created_at_idx
    on public.interest_submissions (created_at desc);

-- Row level security is enabled with no policies attached, which denies all
-- access through the anon/publishable key. Submissions are written by the
-- /api/interest route using the service role key, which bypasses RLS, so no
-- Supabase credentials ever reach the browser.
alter table public.interest_submissions enable row level security;

-- Private bucket for resumes. Files are not publicly readable; generate a
-- signed URL from the dashboard (or the API) to view one.
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do nothing;
