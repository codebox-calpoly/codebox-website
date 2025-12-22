"use client";

import { useState } from "react";
import { ProjectCard } from "../ProjectCard";
import { CTA } from "../CTA";
import { projects } from "../../data/data";

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
                    <h1 className="text-6xl lg:text-7xl mb-8 text-foreground font-bold">
                        Our Work
                    </h1>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-wrap gap-3 mb-12">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-6 py-2 rounded-full transition-all text-sm font-medium ${
                                    activeFilter === filter
                                        ? "bg-accent text-accent-foreground"
                                        : "bg-foreground/10 text-foreground/70 hover:bg-foreground/20 border border-foreground/20"
                                }`}>
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.title}
                                {...project}
                                featured={false}
                            />
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-foreground/60 text-lg">
                                No projects found in this category yet. Check
                                back soon!
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <section className="py-20 bg-background border-t border-foreground/10">
                <CTA />
            </section>
        </div>
    );
}
