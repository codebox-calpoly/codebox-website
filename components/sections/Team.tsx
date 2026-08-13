"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, UserPlus } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

import { AnimatedSection } from "../ui/AnimatedSection";
import { CTA } from "../CTA";
import { leadership, teamYears } from "@/data/data";

function initials(name: string) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("");
}

function Leadership() {
    return (
        <section className="pt-40 pb-20">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <AnimatedSection className="text-center">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold">
                        Meet the Team
                    </h1>
                </AnimatedSection>

                <AnimatedSection className="mt-24">
                    <h2 className="text-3xl sm:text-4xl font-extrabold">
                        Leadership
                    </h2>
                    <p className="mt-3 text-lg text-white/60">
                        The people guiding CodeBox&rsquo;s vision &amp;
                        operations!
                    </p>
                </AnimatedSection>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {leadership.map((member, i) => (
                        <AnimatedSection
                            key={member.name}
                            delay={Math.min(i * 0.05, 0.3)}>
                            <div className="rounded-3xl bg-card border border-white/10 p-6 text-center transition-colors hover:border-white/25">
                                <div className="mx-auto w-28 h-28 rounded-full bg-white/90 flex items-center justify-center">
                                    <span className="text-3xl font-extrabold text-black/80">
                                        {initials(member.name)}
                                    </span>
                                </div>
                                <h3 className="mt-5 text-lg font-bold">
                                    {member.name}
                                </h3>
                                <p className="mt-1 text-sm text-white/70">
                                    {member.role}
                                </p>
                                <div className="mt-4 flex justify-center gap-3">
                                    {member.linkedin !== "#" && (
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${member.name} on LinkedIn`}
                                            className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors">
                                            <FontAwesomeIcon
                                                icon={faLinkedin}
                                                className="w-4 h-4"
                                            />
                                        </a>
                                    )}
                                    {member.github !== "#" && (
                                        <a
                                            href={member.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${member.name} on GitHub`}
                                            className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors">
                                            <FontAwesomeIcon
                                                icon={faGithub}
                                                className="w-4 h-4"
                                            />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}

                    <AnimatedSection
                        delay={Math.min(leadership.length * 0.05, 0.35)}>
                        <Link
                            href="/interest"
                            className="group flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-accent/50 bg-card/40 p-6 text-center transition-colors hover:border-accent">
                            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                                <UserPlus className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="mt-5 text-lg font-bold">
                                This Could Be You!
                            </h3>
                            <p className="mt-1 text-sm text-white/70">
                                We&rsquo;re always looking for new leaders
                            </p>
                            <span className="mt-4 inline-flex items-center gap-2 text-accent font-medium">
                                Show Interest
                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </span>
                        </Link>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}

const sectionLabels: { key: keyof (typeof teamYears)[0]["sections"]; label: string }[] =
    [
        { key: "leadership", label: "Leadership" },
        { key: "advisors", label: "Advisors" },
        { key: "techLeads", label: "Tech Leads" },
        { key: "productLeads", label: "Product Managers" },
        { key: "designers", label: "Designers" },
        { key: "developers", label: "Developers" },
    ];

function Classes() {
    const [openYear, setOpenYear] = useState<string | null>(
        teamYears[0]?.year ?? null
    );

    return (
        <section className="py-20">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <AnimatedSection>
                    <h2 className="text-3xl sm:text-4xl font-extrabold">
                        Classes
                    </h2>
                    <p className="mt-3 text-lg text-white/60">
                        Our talented developers, designers, and engineers making
                        it all happen.
                    </p>
                </AnimatedSection>

                <AnimatedSection delay={0.1} className="mt-10">
                    {teamYears.map((year) => {
                        const open = openYear === year.year;
                        return (
                            <div
                                key={year.year}
                                className="border-b border-white/15">
                                <button
                                    onClick={() =>
                                        setOpenYear(open ? null : year.year)
                                    }
                                    className="flex w-full items-center justify-between gap-4 py-6 text-left">
                                    <span className="text-xl font-bold">
                                        {year.year}
                                    </span>
                                    <ChevronDown
                                        className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                                            open ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>
                                <AnimatePresence initial={false}>
                                    {open && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{
                                                height: "auto",
                                                opacity: 1,
                                            }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden">
                                            <div className="pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                                                {sectionLabels.map(
                                                    ({ key, label }) => {
                                                        const names =
                                                            year.sections[key];
                                                        if (!names.length)
                                                            return null;
                                                        return (
                                                            <div key={key}>
                                                                <h4 className="text-sm font-bold tracking-widest uppercase text-accent">
                                                                    {label}
                                                                </h4>
                                                                <ul className="mt-4 space-y-2">
                                                                    {names.map(
                                                                        (
                                                                            name
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    name
                                                                                }
                                                                                className="text-white/80">
                                                                                {
                                                                                    name
                                                                                }
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </AnimatedSection>
            </div>
        </section>
    );
}

const pillars = [
    { title: "Learn", caption: "Workshops & Tech Talks" },
    { title: "Build", caption: "Collaborate on Real Projects" },
    { title: "Connect", caption: "Social Events & Networking" },
];

function JoinUs() {
    return (
        <section className="py-20">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <AnimatedSection>
                    <h2 className="text-3xl sm:text-4xl font-extrabold">
                        Join Us
                    </h2>
                    <p className="mt-3 text-lg text-white/60">
                        Beyond code, CodeBox is a community that grows together!
                    </p>
                </AnimatedSection>

                <AnimatedSection delay={0.1} className="mt-10">
                    <div className="overflow-hidden rounded-2xl">
                        <Image
                            src="/resume-workshop.jpg"
                            alt="CodeBox workshop"
                            width={2000}
                            height={1333}
                            className="w-full max-h-[480px] object-cover"
                        />
                    </div>
                </AnimatedSection>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-10">
                    {pillars.map((pillar, i) => (
                        <AnimatedSection key={pillar.title} delay={i * 0.1}>
                            <h3 className="text-3xl sm:text-4xl font-extrabold uppercase">
                                {pillar.title}
                            </h3>
                            <p className="mt-2 text-lg text-white/70">
                                {pillar.caption}
                            </p>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function Team() {
    return (
        <div className="bg-background text-foreground">
            <Leadership />
            <Classes />
            <JoinUs />
            <CTA />
        </div>
    );
}
