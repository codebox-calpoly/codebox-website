"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { AnimatedSection } from "../ui/AnimatedSection";
import { PillButton } from "../ui/PillButton";
import { CTA } from "../CTA";
import { projects } from "@/data/data";

const filters = [
    { key: "all", label: "All Projects" },
    { key: "web", label: "Web" },
    { key: "mobile", label: "Mobile" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

export function Projects() {
    const [filter, setFilter] = useState<FilterKey>("all");

    const visible =
        filter === "all"
            ? projects
            : projects.filter((p) => p.category === filter);

    return (
        <div className="bg-background text-foreground">
            <section className="pt-40 pb-24">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <AnimatedSection className="text-center">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold">
                            Our Work
                        </h1>
                        <p className="mt-4 text-lg text-white/60">
                            Ideated, designed, &amp; developed by Cal Poly
                            students.
                        </p>
                    </AnimatedSection>

                    <div className="mt-16 grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-10 items-start">
                        <AnimatedSection className="flex lg:flex-col flex-wrap gap-3">
                            {filters.map((f) => (
                                <button
                                    key={f.key}
                                    onClick={() => setFilter(f.key)}
                                    className={`w-fit rounded-full border px-5 py-2 text-base transition-colors ${
                                        filter === f.key
                                            ? "border-accent text-accent"
                                            : "border-white/40 text-white hover:border-white"
                                    }`}>
                                    {f.label}
                                </button>
                            ))}
                        </AnimatedSection>

                        <div className="flex flex-col gap-8">
                            <AnimatePresence mode="popLayout">
                                {visible.map((project) => (
                                    <motion.div
                                        key={project.title}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}>
                                        <div className="rounded-3xl bg-card border border-white/10 p-6 sm:p-7 transition-colors hover:border-white/25">
                                            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,420px)_1fr] gap-8 items-center">
                                                <div className="overflow-hidden rounded-2xl">
                                                    <Image
                                                        src={project.image}
                                                        alt={`${project.title} preview`}
                                                        width={500}
                                                        height={280}
                                                        className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold">
                                                        {project.title}
                                                    </h3>
                                                    <p className="mt-3 text-white/70">
                                                        {project.description}
                                                    </p>
                                                    <div className="mt-8 flex items-center justify-between gap-4">
                                                        <span className="rounded-full border border-white/30 px-4 py-1.5 text-sm">
                                                            {project.year}
                                                        </span>
                                                        <PillButton
                                                            href={
                                                                project.link ??
                                                                "#"
                                                            }
                                                            size="sm"
                                                            showArrow>
                                                            View Project
                                                        </PillButton>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            <CTA />
        </div>
    );
}
