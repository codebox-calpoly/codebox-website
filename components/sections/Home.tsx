"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "../../data/data";
import { FadeIn } from "../FadeIn";

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Hero
 *
 *    0ms   mount — hero uses CSS @keyframes (no flash)
 *  100ms   subtitle fades up
 *  200ms   headline stagger
 *  600ms   description
 *  750ms   buttons
 *  300ms   hero image scales in
 *  900ms   rotating badge pops
 *
 * Below-fold: FadeIn (IntersectionObserver + CSS).
 * Parallax: Framer Motion useScroll/useTransform (GPU).
 * ───────────────────────────────────────────────────────── */

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const steps = 40;
    const stepDur = 1500 / steps;
    let cur = 0;
    const timer = setInterval(() => {
      cur++;
      setCount(Math.round(target * (1 - Math.pow(1 - cur / steps, 3))));
      if (cur >= steps) {
        clearInterval(timer);
        setCount(target);
      }
    }, stepDur);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function Home() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });

  // Image 1 (top-right): drifts from right
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const x1 = useTransform(scrollYProgress, [0, 1], [80, -30]);
  const o1 = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0]);

  // Image 2 (left): drifts from left
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -80]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-70, 30]);
  const o2 = useTransform(scrollYProgress, [0, 0.1, 0.75, 1], [0, 1, 1, 0]);

  // Image 3 (bottom-right): drifts up
  const y3 = useTransform(scrollYProgress, [0, 1], [100, -40]);
  const x3 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const o3 = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0]);

  const stats = [
    { value: 50, suffix: "+", label: "Members" },
    { value: 5, suffix: "+", label: "Projects" },
    { value: 1, suffix: "", label: "Year" },
  ];

  const programs = [
    {
      title: "Client Projects",
      description:
        "Work with real companies and organizations to build software that solves their problems.",
      image: "/codebox-groups.jpg",
    },
    {
      title: "AI / ML Projects",
      description:
        "Explore cutting-edge artificial intelligence and machine learning applications.",
      image: "/codebox-4.jpg",
    },
    {
      title: "Internal Products",
      description:
        "Build tools and platforms that serve the Cal Poly community.",
      image: "/codebox-2.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero Section — Two Column ── */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-24">
        {/* SVG decorative lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.04]"
            viewBox="0 0 600 600"
          >
            <line
              x1="0"
              y1="0"
              x2="600"
              y2="600"
              stroke="white"
              strokeWidth="1"
            />
            <line
              x1="100"
              y1="0"
              x2="600"
              y2="500"
              stroke="white"
              strokeWidth="1"
            />
            <line
              x1="200"
              y1="0"
              x2="600"
              y2="400"
              stroke="white"
              strokeWidth="1"
            />
            <circle
              cx="500"
              cy="100"
              r="80"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
            <circle
              cx="500"
              cy="100"
              r="120"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
          </svg>
        </div>

        {/* Gradient orb */}
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text content */}
            <div className="space-y-8">
              <p
                className="text-accent text-sm tracking-[0.3em] uppercase font-medium animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                Cal Poly&apos;s Software Engineering Club
              </p>

              <div className="space-y-2">
                {["The", "Project", "Labratory"].map((line, i) => (
                  <h1
                    key={line}
                    className="text-6xl sm:text-7xl lg:text-8xl text-foreground leading-[0.95] font-bold tracking-tight animate-fade-up"
                    style={{ animationDelay: `${0.2 + i * 0.12}s` }}
                  >
                    {line}
                  </h1>
                ))}
              </div>

              <p
                className="text-foreground/50 text-lg max-w-md leading-relaxed animate-fade-up"
                style={{ animationDelay: "0.6s" }}
              >
                We build real products, ship real code, and gain real
                experience. Join 50+ students turning ideas into software.
              </p>

              <div
                className="flex flex-wrap gap-4 animate-fade-up"
                style={{ animationDelay: "0.75s" }}
              >
                <Link
                  href="#"
                  className="group inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-medium text-sm hover:bg-[#16a057] transition-colors duration-200"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 border border-foreground/20 text-foreground px-8 py-4 rounded-full font-medium text-sm hover:bg-foreground/5 transition-colors duration-200"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>

            {/* Right: Hero image */}
            <div className="relative">
              <div
                className="relative aspect-[4/3] rounded-3xl overflow-hidden animate-scale-in"
                style={{ animationDelay: "0.3s" }}
              >
                <Image
                  src="/codebox-groups.jpg"
                  alt="CodeBox team collaborating"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 640px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Rotating "Apply" badge */}
              <div
                className="absolute -bottom-4 -right-4 lg:bottom-4 lg:-right-6 w-24 h-24 lg:w-28 lg:h-28 animate-pop-in"
                style={{ animationDelay: "0.9s" }}
              >
                <Link href="#" className="block w-full h-full relative">
                  <svg
                    className="w-full h-full animate-spin-slow"
                    viewBox="0 0 100 100"
                  >
                    <defs>
                      <path
                        id="circlePath"
                        d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                    </defs>
                    <text className="text-[11px] fill-white uppercase tracking-[0.3em]">
                      <textPath href="#circlePath">
                        Apply Now &bull; Apply Now &bull;{" "}
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ArrowUpRight className="w-6 h-6 text-white" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="py-16 border-y border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1} className="text-center">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-2">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-foreground/50 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent Projects Carousel ── */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
          <FadeIn className="flex items-end justify-between">
            <div>
              <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-3">
                Our Work
              </p>
              <h2 className="text-4xl lg:text-5xl text-foreground font-bold">
                Recent Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden md:flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors duration-200 text-sm"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>

        {/* Auto-scrolling carousel */}
        <div className="relative">
          <div className="flex gap-6 pl-6 animate-scroll-x hover:[animation-play-state:paused]">
            {[...projects, ...projects].map((project, i) => (
              <div
                key={`${project.title}-${i}`}
                className="flex-shrink-0 w-[350px] group cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center gap-1 text-white text-sm font-medium">
                      Read More
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mb-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-foreground/40 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl text-foreground font-semibold mb-1">
                  {project.title}
                </h3>
                <p className="text-foreground/50 text-sm line-clamp-2">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-8 md:hidden">
          <Link
            href="/projects"
            className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors duration-200 text-sm"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Our Programs ── */}
      <section className="py-24 border-t border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="mb-16">
            <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-3">
              What We Do
            </p>
            <h2 className="text-4xl lg:text-5xl text-foreground font-bold">
              Our Programs
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, i) => (
              <FadeIn key={program.title} delay={i * 0.1}>
                <div className="group relative rounded-2xl overflow-hidden border border-foreground/10 hover:border-foreground/20 bg-card transition-all duration-300 hover:-translate-y-2">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl text-foreground font-semibold mb-2">
                      {program.title}
                    </h3>
                    <p className="text-foreground/50 text-sm leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join Us — Parallax Images ── */}
      <section
        ref={parallaxRef}
        className="py-32 border-t border-foreground/10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn className="space-y-8">
              <h2 className="text-5xl lg:text-6xl text-foreground font-bold leading-tight">
                Where Cal Poly
                <br />
                Students Gain
                <br />
                <span className="text-accent">Experience</span>
              </h2>
              <p className="text-foreground/50 text-lg leading-relaxed max-w-md">
                Join a community of builders who ship real products, learn
                industry tools, and grow together.
              </p>
              <Link
                href="#"
                className="group inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-medium text-sm hover:bg-[#16a057] transition-colors duration-200"
              >
                Join CodeBox
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </FadeIn>

            {/* Parallax image grid — still uses Framer Motion for scroll-linked transforms */}
            <div className="relative h-[500px] hidden lg:block">
              <motion.div
                className="absolute top-0 right-0 w-[240px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl will-change-transform"
                style={{ y: y1, x: x1, opacity: o1 }}
              >
                <Image
                  src="/codebox-1.jpg"
                  alt="CodeBox event"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                className="absolute top-24 left-0 w-[200px] aspect-square rounded-2xl overflow-hidden shadow-2xl will-change-transform"
                style={{ y: y2, x: x2, opacity: o2 }}
              >
                <Image
                  src="/codebox-3.jpg"
                  alt="CodeBox collaboration"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                className="absolute bottom-0 right-16 w-[220px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl will-change-transform"
                style={{ y: y3, x: x3, opacity: o3 }}
              >
                <Image
                  src="/codebox-5.jpg"
                  alt="CodeBox community"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-32 border-t border-foreground/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-5xl lg:text-6xl text-foreground mb-6 font-bold leading-tight">
              Ready to start <span className="text-accent">building?</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-foreground/50 text-lg mb-10 max-w-lg mx-auto">
              Applications are open for the upcoming academic year. Join us and
              start shipping.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#"
                className="group inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-medium text-sm hover:bg-[#16a057] transition-colors duration-200"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <a
                href="https://discord.gg/usSg2WfrFs"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 border border-foreground/20 text-foreground px-8 py-4 rounded-full font-medium text-sm hover:bg-foreground/5 transition-colors duration-200"
              >
                Join Discord
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
