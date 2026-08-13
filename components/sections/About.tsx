"use client";

import Image from "next/image";
import { Code, Users, GraduationCap, type LucideIcon } from "lucide-react";

import { AnimatedSection } from "../ui/AnimatedSection";
import { CountUp } from "../ui/CountUp";
import { CTA } from "../CTA";
import { coreValues } from "@/data/data";

const valueIcons: LucideIcon[] = [Code, Users, GraduationCap];

const stats = [
    { value: 5, suffix: "+", label: ["Projects", "Completed"] },
    { value: 50, suffix: "+", label: ["Members &", "Growing"] },
    { value: 1, suffix: "", label: ["Years", "Building"] },
];

function AboutHero() {
    return (
        <section className="relative pb-24">
            <div className="relative max-w-6xl mx-auto px-6 lg:px-8 pt-40">
                <AnimatedSection className="text-center">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold">
                        About
                    </h1>
                </AnimatedSection>

                <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                    <AnimatedSection>
                        <h2 className="text-3xl sm:text-4xl font-extrabold">
                            Meet CodeBox
                        </h2>
                        <p className="mt-6 text-lg text-white/90">
                            We&rsquo;re a student-run software engineering club
                            at Cal Poly, dedicated to turning ideas into{" "}
                            <span className="underline decoration-white/60 underline-offset-4">
                                real products!
                            </span>
                        </p>
                        <p className="mt-6 text-lg text-white/80">
                            Each year, our members work in teams to design,
                            develop, and deploy projects that solve real
                            problems. You&rsquo;ll gain hands-on experience with
                            modern tech stacks, collaborate with talented peers,
                            and build a portfolio that stands out.
                        </p>
                    </AnimatedSection>

                    <AnimatedSection delay={0.15}>
                        <div className="overflow-hidden rounded-2xl">
                            <Image
                                src="/launch-day.jpg"
                                alt="CodeBox launch day"
                                width={515}
                                height={581}
                                className="w-full h-auto object-cover"
                                priority
                            />
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}

function Stats() {
    return (
        <section className="py-20">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
                    {stats.map((stat, i) => (
                        <AnimatedSection key={stat.label[0]} delay={i * 0.1}>
                            <div className="text-6xl font-extrabold">
                                <CountUp
                                    value={stat.value}
                                    suffix={stat.suffix}
                                />
                            </div>
                            <div className="mt-2 text-sm tracking-widest uppercase text-white/70">
                                {stat.label[0]}
                                <br />
                                {stat.label[1]}
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

function MoreThanAClub() {
    return (
        <section className="py-20">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                    <AnimatedSection>
                        <h2 className="text-3xl sm:text-4xl font-extrabold">
                            More than a Club
                        </h2>
                        <p className="mt-6 text-lg text-white/80">
                            We are a community that brings together students of
                            all skill levels, from complete beginners to
                            experienced developers, to collaborate on exciting,
                            student-led projects. Whether it&rsquo;s web
                            applications, mobile apps, AI tools, or something
                            completely new, we turn ideas into reality while
                            learning industry best practices.
                        </p>
                    </AnimatedSection>

                    <AnimatedSection delay={0.15}>
                        <div className="overflow-hidden rounded-2xl">
                            <Image
                                src="/codebox-3.jpg"
                                alt="CodeBox members collaborating"
                                width={800}
                                height={533}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}

function CoreValues() {
    return (
        <section className="py-20">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <AnimatedSection className="text-center">
                    <h2 className="text-4xl sm:text-5xl font-extrabold">
                        Our Core Values
                    </h2>
                </AnimatedSection>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
                    {coreValues.map((value, i) => {
                        const Icon = valueIcons[i];
                        return (
                            <AnimatedSection key={value.title} delay={i * 0.1}>
                                <div className="relative">
                                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-10 w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-dark border-4 border-background flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="overflow-hidden rounded-2xl">
                                        <Image
                                            src={value.image}
                                            alt={value.title}
                                            width={600}
                                            height={400}
                                            className="w-full aspect-[3/2] object-cover"
                                        />
                                    </div>
                                </div>
                                <h3 className="mt-6 text-lg font-bold tracking-wide uppercase">
                                    {value.title}
                                </h3>
                                <p className="mt-3 text-white/70">
                                    {value.description}
                                </p>
                            </AnimatedSection>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export function About() {
    return (
        <div className="bg-background text-foreground">
            <AboutHero />
            <Stats />
            <MoreThanAClub />
            <CoreValues />
            <CTA />
        </div>
    );
}
