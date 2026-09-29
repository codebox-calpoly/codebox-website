import { NextResponse } from "next/server";
import { bootcampSubmissions, getDb, type Database } from "@/lib/db";

export const runtime = "nodejs";

const REQUIRED_FIELDS = [
  "fullName",
  "email",
  "githubUrl",
  "deployedUrl",
] as const;

function readText(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function isHttpUrl(value: string): boolean {
  try {
    const { protocol } = new URL(value);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
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
    githubUrl: readText(formData, "githubUrl"),
    deployedUrl: readText(formData, "deployedUrl"),
  };

  const missing = REQUIRED_FIELDS.filter((field) => !fields[field]);
  if (missing.length > 0) {
    return badRequest("Please fill out every required field.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return badRequest("Please enter a valid email address.");
  }

  if (!isHttpUrl(fields.githubUrl) || !isHttpUrl(fields.deployedUrl)) {
    return badRequest("Please enter valid links starting with https://.");
  }

  let db: Database;
  try {
    db = getDb();
  } catch (error) {
    console.error("Database is not configured:", error);
    return NextResponse.json(
      { error: "The form is not configured correctly. Please email us instead." },
      { status: 500 },
    );
  }

  try {
    await db.insert(bootcampSubmissions).values({
      fullName: fields.fullName,
      email: fields.email,
      githubUrl: fields.githubUrl,
      deployedUrl: fields.deployedUrl,
    });
  } catch (insertError) {
    console.error("Bootcamp submission insert failed:", insertError);
    return NextResponse.json(
      { error: "We could not save your submission. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
