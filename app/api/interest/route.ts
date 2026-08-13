import { NextResponse } from "next/server";
import { getSupabaseAdmin, RESUME_BUCKET } from "@/lib/supabase";

export const runtime = "nodejs";

// Kept conservative: hosting platforms cap serverless request bodies, and a
// resume has no business being larger than this.
const MAX_RESUME_BYTES = 4 * 1024 * 1024;

const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const REQUIRED_FIELDS = [
  "fullName",
  "email",
  "yearInSchool",
  "major",
  "whyInterested",
] as const;

function readText(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

/** Strips anything that would make an awkward storage object key. */
function safeFileName(name: string): string {
  const cleaned = name
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return cleaned || "resume";
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return badRequest("Could not read the submitted form.");
  }

  const fields = {
    fullName: readText(formData, "fullName"),
    email: readText(formData, "email"),
    phone: readText(formData, "phone"),
    linkedinOrGithub: readText(formData, "linkedinOrGithub"),
    yearInSchool: readText(formData, "yearInSchool"),
    major: readText(formData, "major"),
    experienceLevel: readText(formData, "experienceLevel"),
    whyInterested: readText(formData, "whyInterested"),
    heardAbout: readText(formData, "heardAbout"),
    questions: readText(formData, "questions"),
  };

  const missing = REQUIRED_FIELDS.filter((field) => !fields[field]);
  if (missing.length > 0) {
    return badRequest(`Please fill out every required field.`);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return badRequest("Please enter a valid email address.");
  }

  const interestAreas = formData
    .getAll("interestAreas")
    .filter((area): area is string => typeof area === "string");

  const resume = formData.get("resume");
  const hasResume = resume instanceof File && resume.size > 0;

  if (hasResume) {
    if (resume.size > MAX_RESUME_BYTES) {
      return badRequest("Resume must be smaller than 4 MB.");
    }
    if (resume.type && !ALLOWED_RESUME_TYPES.has(resume.type)) {
      return badRequest("Resume must be a PDF, DOC, or DOCX file.");
    }
  }

  let supabase: ReturnType<typeof getSupabaseAdmin>;
  try {
    supabase = getSupabaseAdmin();
  } catch (error) {
    console.error("Supabase is not configured:", error);
    return NextResponse.json(
      { error: "The form is not configured correctly. Please email us instead." },
      { status: 500 },
    );
  }

  let resumePath: string | null = null;
  if (hasResume) {
    const objectKey = `${crypto.randomUUID()}-${safeFileName(resume.name)}`;
    const { error: uploadError } = await supabase.storage
      .from(RESUME_BUCKET)
      .upload(objectKey, resume, {
        contentType: resume.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      console.error("Resume upload failed:", uploadError);
      return NextResponse.json(
        { error: "We could not upload your resume. Please try again." },
        { status: 502 },
      );
    }

    resumePath = objectKey;
  }

  const { error: insertError } = await supabase
    .from("interest_submissions")
    .insert({
      full_name: fields.fullName,
      email: fields.email,
      phone: fields.phone || null,
      linkedin_or_github: fields.linkedinOrGithub || null,
      year_in_school: fields.yearInSchool,
      major: fields.major,
      experience_level: fields.experienceLevel || null,
      interest_areas: interestAreas,
      why_interested: fields.whyInterested,
      resume_path: resumePath,
      heard_about: fields.heardAbout || null,
      questions: fields.questions || null,
    });

  if (insertError) {
    console.error("Submission insert failed:", insertError);
    // Don't leave an orphaned file behind if the row never landed.
    if (resumePath) {
      await supabase.storage.from(RESUME_BUCKET).remove([resumePath]);
    }
    return NextResponse.json(
      { error: "We could not save your submission. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
