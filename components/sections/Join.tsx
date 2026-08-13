"use client";

import { useRef } from "react";
import {
    Package,
    UserCog,
    PenTool,
    Settings,
    Megaphone,
    ChevronLeft,
    ChevronRight,
    type LucideIcon,
} from "lucide-react";

import { AnimatedSection } from "../ui/AnimatedSection";
import { CTA } from "../CTA";
import { roles, steps } from "@/data/data";

const roleIcons: Record<string, LucideIcon> = {
    "product-manager": Package,
    "tech-lead": UserCog,
    designer: PenTool,
    developer: Settings,
    "marketing-associate": Megaphone,
};

function Positions() {
    const scrollerRef = useRef<HTMLDivElement>(null);

    const scrollBy = (dir: 1 | -1) => {
        scrollerRef.current?.scrollBy({
            left: dir * 480,
            behavior: "smooth",
        });
    };

    return (
        <section className="pt-40 pb-20">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <AnimatedSection className="text-center">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold">
                        Join
                    </h1>
                </AnimatedSection>

                <AnimatedSection className="mt-24 flex items-end justify-between gap-6">
                    <h2 className="text-3xl sm:text-4xl font-extrabold">
                        Our Team Positions
                    </h2>
                    <div className="flex gap-3">
                        <button
                            onClick={() => scrollBy(-1)}
                            aria-label="Scroll positions left"
                            className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-accent hover:text-accent transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scrollBy(1)}
                            aria-label="Scroll positions right"
                            className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-accent hover:text-accent transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </AnimatedSection>
            </div>

            <AnimatedSection delay={0.1} className="mt-10">
                <div
                    ref={scrollerRef}
                    className="flex gap-6 overflow-x-auto scroll-smooth px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {roles.map((role) => {
                        const Icon = roleIcons[role.key];
                        return (
                            <div
                                key={role.key}
                                className="w-[85vw] sm:w-[420px] shrink-0 rounded-3xl border border-white/25 bg-card/60 p-7 transition-colors hover:border-white/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold">
                                        {role.title}
                                    </h3>
                                </div>
                                <p className="mt-5 text-white/75">
                                    {role.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </AnimatedSection>
        </section>
    );
}

function HowItWorks() {
    return (
        <section className="py-20">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <AnimatedSection>
                    <h2 className="text-3xl sm:text-4xl font-extrabold">
                        How it Works
                    </h2>
                    <p className="mt-3 text-lg text-white/60">
                        Your journey from first interest to shipped product!
                    </p>
                </AnimatedSection>

                <div className="mt-12 md:mt-16 flex flex-col gap-12 md:gap-20">
                    {steps.map((step, i) => (
                        <AnimatedSection key={step.number} delay={i * 0.05}>
                            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-12 items-end">
                                <div>
                                    <div className="text-6xl md:text-[7rem] leading-none font-extrabold bg-gradient-to-b from-accent to-accent-dark bg-clip-text text-transparent select-none">
                                        {step.number}
                                    </div>
                                    <div className="mt-2 text-xl md:text-2xl font-extrabold tracking-wide uppercase">
                                        {step.title}
                                    </div>
                                </div>
                                <div className="border-b border-white/25 md:border-white/40 pb-4 md:text-right">
                                    <p className="text-base md:text-lg text-white/80 md:max-w-md md:ml-auto">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function Join() {
    return (
        <div className="bg-background text-foreground">
            <Positions />
            <HowItWorks />
            <CTA />
        </div>
    );
}
