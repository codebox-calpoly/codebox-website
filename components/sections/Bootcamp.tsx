"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { AnimatedSection } from "../ui/AnimatedSection";

const inputClasses =
  "w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3.5 text-foreground placeholder:text-white/35 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/25 transition";

const labelClasses = "block text-foreground font-medium mb-2.5";

type Status = "idle" | "submitting" | "success" | "error";

export function Bootcamp() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;

    try {
      const response = await fetch("/api/bootcamp", {
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
            Submitted!
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Thanks for turning in your bootcamp project. We&apos;ll take a
            look and follow up soon.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <section className="relative pt-40 pb-14">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl text-foreground font-extrabold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Bootcamp Submission
          </motion.h1>
          <motion.p
            className="mt-5 text-lg text-white/60"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Share your repo and your live deployment.
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
                    autoComplete="name"
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
                    autoComplete="email"
                    className={inputClasses}
                    placeholder="jane@calpoly.edu"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="githubUrl" className={labelClasses}>
                  GitHub Repo <span className="text-accent">*</span>
                </label>
                <input
                  id="githubUrl"
                  name="githubUrl"
                  type="url"
                  required
                  className={inputClasses}
                  placeholder="https://github.com/janedoe/my-project"
                />
              </div>

              <div>
                <label htmlFor="deployedUrl" className={labelClasses}>
                  Deployed Project{" "}
                  <span className="text-white/40 font-normal">(optional)</span>
                </label>
                <input
                  id="deployedUrl"
                  name="deployedUrl"
                  type="url"
                  className={inputClasses}
                  placeholder="https://my-project.vercel.app"
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
                {status === "submitting" ? "Submitting..." : "Submit Project"}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
