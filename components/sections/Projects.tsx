"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "../../data/data";
import Link from "next/link";
import { FadeIn } from "../FadeIn";

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Projects Page
 *
 *    0ms   page loads
 *  100ms   title fades in
 *  200ms   filter pills animate in (staggered 50ms)
 *  400ms   project cards animate in (staggered 100ms)
 *  click   filter change — cards exit/enter with layout animation
 * ───────────────────────────────────────────────────────── */

const FILTERS = ["All", "Client", "AI"];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Header */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p
            className="text-accent text-sm tracking-[0.3em] uppercase font-medium mb-4 animate-fade-up"
            style={{ animationDelay: "0s" }}
          >
            Our Work
          </p>
          <h1
            className="text-5xl lg:text-6xl text-foreground font-bold mb-6 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Projects
          </h1>
          <p
            className="text-foreground/50 text-lg max-w-xl animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            Real products built by real students. From client work to AI
            experiments, here&apos;s what we&apos;ve been shipping.
          </p>

          {/* Filters */}
          <div
            className="flex gap-2 mt-10 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  activeFilter === filter
                    ? "bg-accent text-white"
                    : "bg-foreground/5 text-foreground/60 hover:bg-foreground/10 border border-foreground/10"
                }`}
              >
                {filter === "All" ? "All Projects" : filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div layout className="grid md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group cursor-pointer"
                >
                  <div className="rounded-2xl overflow-hidden border border-foreground/10 hover:border-foreground/20 transition-all bg-card">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-6">
                      <div className="flex gap-2 mb-3">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-foreground/40 uppercase tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl text-foreground font-semibold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-foreground/50 text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>
                      <span className="inline-flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {filteredProjects.length === 0 && (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-foreground/40 text-lg">
                  No projects in this category yet.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 border-t border-foreground/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn className="mb-6">
            <h2 className="text-5xl lg:text-6xl text-foreground font-bold leading-tight">
              Want to work on a <span className="text-accent">project?</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#"
                className="group inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-medium text-sm hover:bg-[#16a057] transition-colors"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://discord.gg/usSg2WfrFs"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 border border-foreground/20 text-foreground px-8 py-4 rounded-full font-medium text-sm hover:bg-foreground/5 transition-colors"
              >
                Join Discord
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
