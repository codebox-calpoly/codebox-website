"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Code,
    Smartphone,
    Brain,
    Package,
    UserCog,
    PenTool,
    Settings,
    Megaphone,
    ChevronDown,
    type LucideIcon,
} from "lucide-react";

import { CodeboxHero } from "../CodeboxHero";
import { AnimatedSection } from "../ui/AnimatedSection";
import { PillButton } from "../ui/PillButton";
import { CTA } from "../CTA";
import { projects, services, roles, faqs } from "@/data/data";

const serviceIcons: LucideIcon[] = [Code, Smartphone, Brain];

const roleIcons: Record<string, LucideIcon> = {
    "product-manager": Package,
    "tech-lead": UserCog,
    designer: PenTool,
    developer: Settings,
    "marketing-associate": Megaphone,
};

function Hero() {
    return (
        <section className="relative h-[100svh] min-h-[560px] bg-black">
            <CodeboxHero
                imageSrc="/cb-shader.png"
                width="100%"
                height="100%"
                style={{ background: "#000000" }}
            />
            <div className="absolute inset-x-0 bottom-14 z-10 flex flex-col items-center gap-7 pointer-events-none">
                <p className="text-lg text-white/70">Welcome to CodeBox</p>
                <PillButton
                    href="#what-is-codebox"
                    className="pointer-events-auto bg-black/40 backdrop-blur-sm">
                    Learn More
                </PillButton>
            </div>
        </section>
    );
}

function WhatIsCodeBox() {
    return (
        <section id="what-is-codebox" className="py-24 scroll-mt-24">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <AnimatedSection>
                    <div className="relative w-full overflow-hidden rounded-2xl">
                        <Image
                            src="/club-photo.jpg"
                            alt="CodeBox members group photo"
                            width={2000}
                            height={757}
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>
                </AnimatedSection>

                <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12">
                    <AnimatedSection>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
                            What is CodeBox?
                        </h2>
                        <p className="mt-6 max-w-2xl text-lg text-white/80">
                            CodeBox is an organization at Cal Poly SLO that
                            provides students with{" "}
                            <span className="underline decoration-white/60 underline-offset-4">
                                hands-on experience
                            </span>{" "}
                            in the software and design industry. CodeBox members
                            develop their technical skills by working in diverse
                            teams on projects over the course of the academic
                            year.
                        </p>
                        <div className="mt-10">
                            <PillButton href="/about" showArrow>
                                Learn More
                            </PillButton>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection
                        delay={0.15}
                        className="flex lg:flex-col gap-12 lg:gap-10 lg:text-right">
                        <div>
                            <div className="text-5xl sm:text-6xl font-extrabold">
                                5+
                            </div>
                            <div className="mt-1 text-sm tracking-widest uppercase text-white/70">
                                Projects
                                <br />
                                Released
                            </div>
                        </div>
                        <div>
                            <div className="text-5xl sm:text-6xl font-extrabold">
                                50+
                            </div>
                            <div className="mt-1 text-sm tracking-widest uppercase text-white/70">
                                Members &<br />
                                Growing
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}

function WhatWeDo() {
    return (
        <section className="py-24">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <AnimatedSection>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
                        What We Do
                    </h2>
                    <p className="mt-4 text-lg text-white/60">
                        CodeBox transforms your ideas into fully functioning,
                        real-world products.
                    </p>
                </AnimatedSection>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
                    {services.map((service, i) => {
                        const Icon = serviceIcons[i];
                        return (
                            <AnimatedSection key={service.title} delay={i * 0.1}>
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="mt-6 text-lg font-bold tracking-wide uppercase">
                                    {service.title}
                                </h3>
                                <p className="mt-3 text-white/70">
                                    {service.description}
                                </p>
                            </AnimatedSection>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function RecentProjects() {
    const featured = projects.filter((p) => p.featured);

    return (
        <section className="py-24">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <AnimatedSection className="flex flex-wrap items-end justify-between gap-6">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
                        Recent Projects
                    </h2>
                    <PillButton href="/projects" showArrow>
                        View All Projects
                    </PillButton>
                </AnimatedSection>

                <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {featured.map((project, i) => (
                        <AnimatedSection key={project.title} delay={i * 0.1}>
                            <div className="h-full rounded-3xl bg-card border border-white/10 p-6 sm:p-7 transition-colors hover:border-white/25">
                                <div className="overflow-hidden rounded-2xl">
                                    <Image
                                        src={project.image}
                                        alt={`${project.title} preview`}
                                        width={500}
                                        height={280}
                                        className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                                <h3 className="mt-7 text-xl font-bold tracking-wide uppercase">
                                    {project.title}
                                </h3>
                                <p className="mt-3 text-white/70">
                                    {project.description}
                                </p>
                                <div className="mt-7 flex items-center justify-between">
                                    <span className="rounded-full border border-white/30 px-4 py-1.5 text-sm">
                                        {project.year}
                                    </span>
                                    <PillButton
                                        href={project.link ?? "/projects"}
                                        size="sm"
                                        showArrow>
                                        View Project
                                    </PillButton>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

function GetInvolved() {
    const [openRole, setOpenRole] = useState<string>("developer");

    return (
        <section className="py-24">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <AnimatedSection className="flex flex-wrap items-end justify-between gap-6">
                    <div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
                            Get Involved
                        </h2>
                        <p className="mt-4 text-lg text-white/60">
                            Choose from our team positions!
                        </p>
                    </div>
                    <PillButton href="/join" showArrow>
                        Learn More
                    </PillButton>
                </AnimatedSection>

                <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <AnimatedSection className="order-2 lg:order-1">
                        <div className="overflow-hidden rounded-2xl max-w-md">
                            <Image
                                src="/chalkboard.png"
                                alt="CodeBox launch day chalkboard"
                                width={359}
                                height={453}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </AnimatedSection>

                    <AnimatedSection
                        delay={0.1}
                        className="order-1 lg:order-2 flex flex-col gap-2">
                        {roles.map((role) => {
                            const Icon = roleIcons[role.key];
                            const open = openRole === role.key;
                            return (
                                <div key={role.key}>
                                    <button
                                        onClick={() =>
                                            setOpenRole(open ? "" : role.key)
                                        }
                                        className={`w-full text-left rounded-2xl transition-colors ${
                                            open
                                                ? "border border-white/25 bg-card"
                                                : "hover:bg-white/5"
                                        }`}>
                                        <div className="flex items-center gap-4 px-4 py-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shrink-0">
                                                <Icon className="w-5 h-5 text-white" />
                                            </div>
                                            <span className="text-lg font-bold">
                                                {role.title}
                                            </span>
                                        </div>
                                        <AnimatePresence initial={false}>
                                            {open && (
                                                <motion.div
                                                    initial={{
                                                        height: 0,
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        height: "auto",
                                                        opacity: 1,
                                                    }}
                                                    exit={{
                                                        height: 0,
                                                        opacity: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.25,
                                                    }}
                                                    className="overflow-hidden">
                                                    <p className="px-4 pb-5 pl-[4.5rem] text-white/70">
                                                        {role.description}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </button>
                                </div>
                            );
                        })}
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}

function Faqs() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faqs" className="py-24 scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <AnimatedSection className="text-center">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
                        FAQ&rsquo;s
                    </h2>
                    <p className="mt-4 text-lg text-white/60">
                        Everything you need to know about joining CodeBox and
                        getting started!
                    </p>
                </AnimatedSection>

                <AnimatedSection delay={0.1} className="mt-14">
                    {faqs.map((faq, i) => {
                        const open = openIndex === i;
                        return (
                            <div
                                key={faq.question}
                                className="border-b border-[#353a54]">
                                <button
                                    onClick={() =>
                                        setOpenIndex(open ? null : i)
                                    }
                                    className="flex w-full items-center justify-between gap-4 py-6 text-left">
                                    <span className="text-lg font-medium">
                                        {faq.question}
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
                                            transition={{ duration: 0.25 }}
                                            className="overflow-hidden">
                                            <p className="pb-6 text-white/70">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </AnimatedSection>

                <AnimatedSection delay={0.15} className="mt-16 text-center">
                    <p className="text-lg text-white/60">
                        Still have questions? We&rsquo;d love to help!
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                        <PillButton
                            href="https://discord.gg/Hbj66Rcca"
                            variant="primary"
                            newTab>
                            Join Our Discord
                        </PillButton>
                        <PillButton
                            href="mailto:codebox@calpoly.edu"
                            variant="primary">
                            Email Us
                        </PillButton>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}

export function Home() {
    return (
        <div className="bg-background text-foreground">
            <Hero />
            <WhatIsCodeBox />
            <WhatWeDo />
            <RecentProjects />
            <GetInvolved />
            <Faqs />
            <CTA />
        </div>
    );
}
