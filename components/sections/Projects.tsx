"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "../ProjectCard";
import { CTA } from "../CTA";
import { projects } from "../../data/data";
import { AnimatedSection } from "../ui/AnimatedSection";

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All Projects");

  const filters = ["All Projects", "Client", "AI", "Product"];

  const filteredProjects =
    activeFilter === "All Projects"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.h1
            className="text-6xl lg:text-7xl mb-8 text-foreground font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Work
          </motion.h1>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="flex flex-wrap gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {filters.map((filter, index) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full transition-colors text-sm font-medium ${
                  activeFilter === filter
                    ? "bg-accent text-accent-foreground"
                    : "bg-foreground/10 text-foreground/70 hover:bg-foreground/20 border border-foreground/20"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
              </motion.button>
            ))}
          </motion.div>

          <motion.div layout className="grid md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    layout: { duration: 0.3 },
                  }}
                >
                  <ProjectCard {...project} featured={false} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {filteredProjects.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-foreground/60 text-lg">
                  No projects found in this category yet. Check back soon!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <AnimatedSection className="py-20 bg-background border-t border-foreground/10">
        <CTA />
      </AnimatedSection>
    </div>
  );
}
