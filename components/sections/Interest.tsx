"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Upload } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { AnimatedSection } from "../ui/AnimatedSection";

const FORMSPREE_FORM_ID = "mbdnzykq";

type InterestFormFields = {
  fullName: string;
  email: string;
  phone?: string;
  linkedinOrGithub?: string;
  yearInSchool: string;
  major: string;
  experienceLevel?: string;
  interestAreas?: string[];
  whyInterested: string;
  resume?: string;
  heardAbout?: string;
  questions?: string;
};

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
  "w-full rounded-xl bg-input-background border border-border px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring transition-shadow";

const labelClasses = "block text-foreground text-sm font-medium mb-2";

const errorClasses = "text-destructive text-sm mt-1";

export function Interest() {
  const [state, handleSubmit] = useForm<InterestFormFields>(FORMSPREE_FORM_ID);
  const [resumeFileName, setResumeFileName] = useState<string>("");

  const formErrors = state.errors?.getFormErrors() ?? [];

  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
        <motion.div
          className="max-w-xl mx-auto px-6 text-center py-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-4xl text-foreground font-bold mb-4">
            You&apos;re all set!
          </h1>
          <p className="text-foreground/60 text-lg leading-relaxed">
            Thanks for your interest in CodeBox. We&apos;ve received your
            application and will reach out soon with next steps.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.h1
            className="text-5xl lg:text-6xl text-foreground mb-6 font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Interest Form
          </motion.h1>
          <motion.p
            className="text-xl text-foreground/70 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Tell us a bit about yourself and we&apos;ll be in touch about
            joining CodeBox.
          </motion.p>
        </div>
      </section>

      <section className="pb-24 bg-background">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <form
              onSubmit={handleSubmit}
              className="space-y-8 bg-foreground/5 border border-foreground/10 rounded-3xl p-8 lg:p-10"
            >
              {/* Contact info */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className={labelClasses}>
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className={inputClasses}
                    placeholder="Jane Doe"
                  />
                  <ValidationError
                    prefix="Full Name"
                    field="fullName"
                    errors={state.errors}
                    className={errorClasses}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={inputClasses}
                    placeholder="jane@calpoly.edu"
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className={errorClasses}
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
                    Year in School *
                  </label>
                  <select
                    id="yearInSchool"
                    name="yearInSchool"
                    required
                    defaultValue=""
                    className={inputClasses}
                  >
                    <option value="" disabled>
                      Select your year
                    </option>
                    {YEAR_OPTIONS.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <ValidationError
                    prefix="Year in School"
                    field="yearInSchool"
                    errors={state.errors}
                    className={errorClasses}
                  />
                </div>
                <div>
                  <label htmlFor="major" className={labelClasses}>
                    Major *
                  </label>
                  <input
                    id="major"
                    name="major"
                    type="text"
                    required
                    className={inputClasses}
                    placeholder="Computer Science"
                  />
                  <ValidationError
                    prefix="Major"
                    field="major"
                    errors={state.errors}
                    className={errorClasses}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="experienceLevel" className={labelClasses}>
                  Programming Experience
                </label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  defaultValue=""
                  className={inputClasses}
                >
                  <option value="" disabled>
                    Select your experience level
                  </option>
                  {EXPERIENCE_OPTIONS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Interest areas */}
              <div>
                <span className={labelClasses}>Areas of Interest</span>
                <div className="grid sm:grid-cols-2 gap-3">
                  {INTEREST_AREAS.map((area) => (
                    <label
                      key={area}
                      className="flex items-center gap-3 rounded-xl bg-input-background border border-border px-4 py-3 cursor-pointer hover:border-foreground/30 transition-colors"
                    >
                      <input
                        type="checkbox"
                        name="interestAreas"
                        value={area}
                        className="w-4 h-4 accent-accent"
                      />
                      <span className="text-foreground/80 text-sm">
                        {area}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Why interested */}
              <div>
                <label htmlFor="whyInterested" className={labelClasses}>
                  Why do you want to join CodeBox? *
                </label>
                <textarea
                  id="whyInterested"
                  name="whyInterested"
                  required
                  rows={4}
                  className={inputClasses}
                  placeholder="Tell us what draws you to the club and what you're hoping to get out of it..."
                />
                <ValidationError
                  prefix="This field"
                  field="whyInterested"
                  errors={state.errors}
                  className={errorClasses}
                />
              </div>

              {/* Resume upload */}
              <div>
                <label htmlFor="resume" className={labelClasses}>
                  Resume (optional)
                </label>
                <label
                  htmlFor="resume"
                  className="flex items-center gap-3 rounded-xl bg-input-background border border-dashed border-border px-4 py-4 cursor-pointer hover:border-foreground/30 transition-colors"
                >
                  <Upload className="w-5 h-5 text-foreground/50 shrink-0" />
                  <span className="text-foreground/60 text-sm truncate">
                    {resumeFileName || "PDF, DOC, or DOCX — click to upload"}
                  </span>
                </label>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) =>
                    setResumeFileName(e.target.files?.[0]?.name ?? "")
                  }
                />
                <ValidationError
                  prefix="Resume"
                  field="resume"
                  errors={state.errors}
                  className={errorClasses}
                />
              </div>

              {/* How did you hear */}
              <div>
                <label htmlFor="heardAbout" className={labelClasses}>
                  How did you hear about CodeBox?
                </label>
                <select
                  id="heardAbout"
                  name="heardAbout"
                  defaultValue=""
                  className={inputClasses}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {HEARD_ABOUT_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
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
                  className={inputClasses}
                  placeholder="Anything else you'd like us to know?"
                />
              </div>

              {formErrors.length > 0 && (
                <p className={errorClasses}>
                  {formErrors.map((error) => error.message).join(" ")}
                </p>
              )}

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-accent hover:bg-[#16a057] text-accent-foreground font-semibold py-4 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {state.submitting && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
                {state.submitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
