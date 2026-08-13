"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronDown, Loader2, Upload } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { AnimatedSection } from "../ui/AnimatedSection";

const DISCORD_INVITE_URL = "https://discord.gg/Hbj66Rcca";

const MAX_RESUME_BYTES = 4 * 1024 * 1024;

const YEAR_OPTIONS = [
  "Freshman",
  "Sophomore",
  "Junior",
  "Senior",
  "Graduate Student",
  "Other",
];

const EXPERIENCE_OPTIONS = [
  "Beginner - little to no coding experience",
  "Intermediate - comfortable with a language or two",
  "Advanced - built full projects before",
];

const INTEREST_AREAS = [
  "Web Development",
  "Mobile Development",
  "AI / Machine Learning",
  "Backend / Infrastructure",
  "UI / UX Design",
  "Product / Project Management",
];

const HEARD_ABOUT_OPTIONS = [
  "Club Fair",
  "Friend / Word of Mouth",
  "Class Announcement",
  "Social Media",
  "Other",
];

const inputClasses =
  "w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3.5 text-foreground placeholder:text-white/35 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/25 transition";

const labelClasses = "block text-foreground font-medium mb-2.5";

type Status = "idle" | "submitting" | "success" | "error";

function SelectField({
  id,
  name,
  required,
  placeholder,
  options,
}: {
  id: string;
  name: string;
  required?: boolean;
  placeholder: string;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
        className={`${inputClasses} appearance-none pr-10 [&:invalid]:text-white/35`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="text-foreground">
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
    </div>
  );
}

export function Interest() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.size > MAX_RESUME_BYTES) {
      setErrorMessage("Resume must be smaller than 4 MB.");
      setStatus("error");
      e.target.value = "";
      setResumeFileName("");
      return;
    }

    setResumeFileName(file?.name ?? "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;

    try {
      const response = await fetch("/api/interest", {
        method: "POST",
        body: new FormData(form),
      });

      if (response.ok) {
        setStatus("success");
        return;
      }

      const body = await response.json().catch(() => null);
      setErrorMessage(
        body?.error ?? "Something went wrong. Please try again.",
      );
      setStatus("error");
    } catch {
      setErrorMessage(
        "We could not reach the server. Check your connection and try again.",
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          className="max-w-xl mx-auto px-6 text-center py-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl text-foreground font-extrabold mb-4">
            You&apos;re all set!
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Thanks for your interest in CodeBox. We&apos;ve received your
            info and will reach out soon with next steps.
          </p>
          <p className="mt-6 text-white/60 text-lg leading-relaxed">
            In the meantime, come hang out with us on Discord — that&apos;s
            where everything happens!
          </p>
          <a
            href={DISCORD_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-3.5 text-lg font-bold text-white transition-all duration-300 hover:bg-[var(--codebox-green-hover)] hover:scale-[1.03]"
          >
            <FontAwesomeIcon icon={faDiscord} className="w-5 h-5" />
            Join the Discord
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(26,155,74,0.28), transparent 60%)",
        }}
      />

      <section className="relative pt-40 pb-14">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl text-foreground font-extrabold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Interested?
          </motion.h1>
          <motion.p
            className="mt-5 text-lg text-white/60"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            No commitment — just tell us a bit about yourself and we&apos;ll
            be in touch about joining CodeBox.
          </motion.p>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <form
              onSubmit={handleSubmit}
              className="space-y-8 bg-card border border-white/10 rounded-3xl p-7 sm:p-10 lg:p-12"
            >
              {/* Contact info */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className={labelClasses}>
                    Full Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className={inputClasses}
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={inputClasses}
                    placeholder="jane@calpoly.edu"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className={labelClasses}>
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={inputClasses}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="linkedinOrGithub" className={labelClasses}>
                    LinkedIn / GitHub / Portfolio
                  </label>
                  <input
                    id="linkedinOrGithub"
                    name="linkedinOrGithub"
                    type="url"
                    className={inputClasses}
                    placeholder="https://github.com/janedoe"
                  />
                </div>
              </div>

              {/* Academic info */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="yearInSchool" className={labelClasses}>
                    Year in School <span className="text-accent">*</span>
                  </label>
                  <SelectField
                    id="yearInSchool"
                    name="yearInSchool"
                    required
                    placeholder="Select your year"
                    options={YEAR_OPTIONS}
                  />
                </div>
                <div>
                  <label htmlFor="major" className={labelClasses}>
                    Major <span className="text-accent">*</span>
                  </label>
                  <input
                    id="major"
                    name="major"
                    type="text"
                    required
                    className={inputClasses}
                    placeholder="Computer Science"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="experienceLevel" className={labelClasses}>
                  Programming Experience
                </label>
                <SelectField
                  id="experienceLevel"
                  name="experienceLevel"
                  placeholder="Select your experience level"
                  options={EXPERIENCE_OPTIONS}
                />
              </div>

              {/* Interest areas */}
              <div>
                <span className={labelClasses}>Areas of Interest</span>
                <div className="grid sm:grid-cols-2 gap-3">
                  {INTEREST_AREAS.map((area) => (
                    <label
                      key={area}
                      className="flex items-center gap-3 rounded-xl bg-black/40 border border-white/10 px-4 py-3.5 cursor-pointer transition-colors hover:border-white/30 has-[:checked]:border-accent has-[:checked]:bg-accent/10"
                    >
                      <input
                        type="checkbox"
                        name="interestAreas"
                        value={area}
                        className="w-4 h-4 accent-[#1a9b4a] shrink-0"
                      />
                      <span className="text-white/80 text-sm">{area}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Why interested */}
              <div>
                <label htmlFor="whyInterested" className={labelClasses}>
                  Why do you want to join CodeBox?{" "}
                  <span className="text-accent">*</span>
                </label>
                <textarea
                  id="whyInterested"
                  name="whyInterested"
                  required
                  rows={4}
                  className={`${inputClasses} resize-y`}
                  placeholder="Tell us what draws you to the club and what you're hoping to get out of it..."
                />
              </div>

              {/* Resume upload */}
              <div>
                <label htmlFor="resume" className={labelClasses}>
                  Resume{" "}
                  <span className="text-white/40 font-normal">(optional)</span>
                </label>
                <label
                  htmlFor="resume"
                  className={`flex items-center gap-3 rounded-xl bg-black/40 border border-dashed px-4 py-4 cursor-pointer transition-colors ${
                    resumeFileName
                      ? "border-accent/60"
                      : "border-white/15 hover:border-accent/50"
                  }`}
                >
                  <Upload
                    className={`w-5 h-5 shrink-0 ${
                      resumeFileName ? "text-accent" : "text-white/50"
                    }`}
                  />
                  <span
                    className={`text-sm truncate ${
                      resumeFileName ? "text-accent" : "text-white/50"
                    }`}
                  >
                    {resumeFileName ||
                      "PDF, DOC, or DOCX (max 4 MB) — click to upload"}
                  </span>
                </label>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleResumeChange}
                />
              </div>

              {/* How did you hear */}
              <div>
                <label htmlFor="heardAbout" className={labelClasses}>
                  How did you hear about CodeBox?
                </label>
                <SelectField
                  id="heardAbout"
                  name="heardAbout"
                  placeholder="Select an option"
                  options={HEARD_ABOUT_OPTIONS}
                />
              </div>

              {/* Questions */}
              <div>
                <label htmlFor="questions" className={labelClasses}>
                  Questions or comments
                </label>
                <textarea
                  id="questions"
                  name="questions"
                  rows={3}
                  className={`${inputClasses} resize-y`}
                  placeholder="Anything else you'd like us to know?"
                />
              </div>

              {status === "error" && errorMessage && (
                <p className="text-destructive text-sm">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-accent hover:bg-[var(--codebox-green-hover)] text-white font-bold tracking-wide uppercase py-4 transition-all duration-300 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {status === "submitting" && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
                {status === "submitting"
                  ? "Submitting..."
                  : "Submit Interest Form"}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
