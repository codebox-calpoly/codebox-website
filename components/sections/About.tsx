"use client";

import { useRef, useState, useEffect } from "react";
import { Code2, Lightbulb, Rocket, Users } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "../FadeIn";

const VALUES = [
  {
    icon: Code2,
    title: "Real Projects",
    description:
      "Work on production-ready applications that solve real problems for real users.",
  },
  {
    icon: Users,
    title: "Mentorship",
    description:
      "Learn from experienced developers through hands-on collaboration and code reviews.",
  },
  {
    icon: Lightbulb,
    title: "Community",
    description:
      "Build lasting friendships and professional connections with fellow Cal Poly students.",
  },
  {
    icon: Rocket,
    title: "Innovation",
    description:
      "Create products that make a difference on campus and beyond.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Apply",
    description:
      "Submit your application and tell us about your interests and experience level.",
  },
  {
    number: "02",
    title: "Get Matched",
    description:
      "We match you with a project team based on your skills and learning goals.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Work with your team to design, develop, and deploy your project over the academic year.",
  },
  {
    number: "04",
    title: "Showcase",
    description:
      "Present your project at our end-of-spring showcase and add it to your portfolio.",
  },
];

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
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const steps = 40;
    const stepDuration = 1500 / steps;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      const eased = 1 - Math.pow(1 - current / steps, 3);
      setCount(Math.round(target * eased));
      if (current >= steps) {
        clearInterval(timer);
        setCount(target);
      }
    }, stepDuration);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Header — CSS keyframe animations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p
                className="text-accent text-sm tracking-[0.3em] uppercase font-medium animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                About Us
              </p>
              <h1
                className="text-5xl lg:text-6xl text-foreground font-bold leading-tight animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                Builders.
                <br />
                Dreamers.
                <br />
                <span className="text-accent">Doers.</span>
              </h1>
              <p
                className="text-foreground/50 text-lg leading-relaxed max-w-md animate-fade-up"
                style={{ animationDelay: "0.35s" }}
              >
                CodeBox is a student-run software engineering club at Cal Poly.
                We bring together students of all skill levels to collaborate on
                exciting projects, from web apps and mobile apps to AI tools.
              </p>
            </div>
            <div
              className="relative aspect-[4/3] rounded-3xl overflow-hidden animate-scale-in"
              style={{ animationDelay: "0.25s" }}
            >
              <Image
                src="/codebox-1.jpg"
                alt="CodeBox team collaborating"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission text */}
      <section className="py-20 border-t border-foreground/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <p className="text-2xl lg:text-3xl text-foreground/80 leading-relaxed font-light">
              Each year, our members work in teams to design, develop, and deploy
              projects that solve real problems. You&apos;ll gain hands-on
              experience with modern tech stacks, collaborate with talented peers,
              and build a portfolio that stands out.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 border-t border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="mb-16">
            <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-3">
              What We Value
            </p>
            <h2 className="text-4xl lg:text-5xl text-foreground font-bold">
              Core Values
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.1}>
                <div className="group p-6 rounded-2xl border border-foreground/10 hover:border-foreground/20 transition-all duration-300 bg-card hover:-translate-y-1 h-full">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <value.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg text-foreground font-semibold mb-2">
                    {value.title}
                  </h3>
                  <p className="text-foreground/50 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — no cards, hover on numbers */}
      <section className="py-20 border-t border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="mb-16">
            <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-3">
              The Process
            </p>
            <h2 className="text-4xl lg:text-5xl text-foreground font-bold">
              How It Works
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <FadeIn key={step.number} delay={i * 0.15}>
                <div className="group relative">
                  <div className="text-6xl lg:text-7xl font-bold mb-4 text-accent/15 transition-all duration-300 group-hover:text-accent/40 group-hover:scale-110 origin-left">
                    {step.number}
                  </div>
                  <h3 className="text-xl text-foreground font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-foreground/50 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-t border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: 50, suffix: "+", label: "Active Members" },
              { value: 5, suffix: "+", label: "Projects Completed" },
              { value: 1, suffix: "", label: "Years Building" },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
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

      {/* CTA */}
      <section className="py-32 border-t border-foreground/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-5xl lg:text-6xl text-foreground mb-6 font-bold leading-tight">
              Ready to start <span className="text-accent">building?</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-foreground/50 text-lg mb-10 max-w-lg mx-auto">
              Applications are open for the upcoming academic year.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#"
                className="group inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-medium text-sm hover:bg-[#16a057] transition-colors"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
