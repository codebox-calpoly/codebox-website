"use client";

import { ChevronDown, Github, Linkedin, ArrowRight } from "lucide-react";
import { leadership, teamYears } from "../../data/data";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "../FadeIn";

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Team Page
 *
 *    0ms   page loads
 *  100ms   title + subtitle animate in
 *  scroll  leadership cards stagger in on viewport (100ms gap)
 *  scroll  year accordions stagger in on viewport
 *  scroll  "Life at CodeBox" photos stagger in
 *  scroll  CTA fades in
 * ───────────────────────────────────────────────────────── */

const TEAM_SECTIONS = [
  { key: "leadership" as const, label: "Leadership" },
  { key: "techLeads" as const, label: "Tech Leads" },
  { key: "productLeads" as const, label: "Product Leads" },
  { key: "developers" as const, label: "Developers" },
  { key: "designers" as const, label: "Designers" },
  { key: "advisors" as const, label: "Advisors" },
];

const LIFE_PHOTOS = [
  {
    src: "/resume-workshop.jpg",
    caption: "Learn",
    description: "Workshops & tech talks",
  },
  {
    src: "/codebox-3.jpg",
    caption: "Build",
    description: "Collaborate on real projects",
  },
  {
    src: "/codebox-5.jpg",
    caption: "Connect",
    description: "Social events & networking",
  },
];

export function Team() {
  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Header */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p
            className="text-accent text-sm tracking-[0.3em] uppercase font-medium mb-4 animate-fade-up"
            style={{ animationDelay: "0s" }}
          >
            Our People
          </p>
          <h1
            className="text-5xl lg:text-6xl text-foreground font-bold mb-6 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Meet the Team
          </h1>
          <p
            className="text-foreground/50 text-lg max-w-xl animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            Led by Cal Poly students, for Cal Poly students. A diverse group of
            builders passionate about creating great products.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 border-t border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl text-foreground font-bold mb-2">
                Leadership
              </h2>
              <p className="text-foreground/40 text-sm">
                The people guiding CodeBox&apos;s vision
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leadership.map((leader, i) => (
              <FadeIn key={leader.name} delay={i * 0.05}>
                <div className="group flex items-center gap-4 p-4 rounded-xl border border-foreground/5 hover:border-foreground/15 bg-card/50 hover:bg-card transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/80 to-accent/40 rounded-full flex items-center justify-center text-white text-lg font-semibold shrink-0">
                    {leader.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm text-foreground font-semibold truncate">
                      {leader.name}
                    </h3>
                    <p className="text-xs text-foreground/40 truncate">
                      {leader.role}
                    </p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    {leader.linkedin !== "#" && (
                      <a
                        href={leader.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-foreground/5 rounded-full flex items-center justify-center hover:bg-foreground/10 text-foreground/30 hover:text-foreground transition-all"
                        aria-label={`${leader.name} LinkedIn`}
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {leader.github !== "#" && (
                      <a
                        href={leader.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-foreground/5 rounded-full flex items-center justify-center hover:bg-foreground/10 text-foreground/30 hover:text-foreground transition-all"
                        aria-label={`${leader.name} GitHub`}
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team by Year */}
      <section className="py-20 border-t border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl text-foreground font-bold mb-2">
                By Year
              </h2>
              <p className="text-foreground/40 text-sm">
                Our talented members making it all happen
              </p>
            </div>
          </FadeIn>

          <div className="space-y-3">
            {teamYears.map((year, index) => (
              <FadeIn key={year.year} delay={index * 0.1}>
                <details
                  className="group rounded-xl border border-foreground/10 hover:border-foreground/15 transition-colors overflow-hidden"
                  open={index === 0}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between p-5 text-foreground bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-colors">
                    <span className="text-lg font-semibold">{year.year}</span>
                    <ChevronDown className="w-4 h-4 text-foreground/40 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="p-5 pt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {TEAM_SECTIONS.map(
                      (section) =>
                        year.sections[section.key].length > 0 && (
                          <div
                            key={section.key}
                            className="rounded-lg bg-foreground/[0.02] p-4"
                          >
                            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-foreground/30 mb-3">
                              {section.label}
                            </h3>
                            <ul className="space-y-1.5">
                              {year.sections[section.key].map((name) => (
                                <li
                                  key={name}
                                  className="text-sm text-foreground/70"
                                >
                                  {name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                    )}
                  </div>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Life at CodeBox */}
      <section className="py-20 border-t border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn className="mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl text-foreground font-bold mb-2">
                Life at CodeBox
              </h2>
              <p className="text-foreground/40 text-sm">
                Beyond code, we&apos;re a community
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {LIFE_PHOTOS.map((item, i) => (
              <FadeIn key={item.caption} delay={i * 0.1}>
                <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-foreground text-xl font-semibold mb-1">
                      {item.caption}
                    </h3>
                    <p className="text-foreground/70 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 border-t border-foreground/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn className="mb-6">
            <h2 className="text-5xl lg:text-6xl text-foreground font-bold leading-tight">
              Join the <span className="text-accent">team</span>
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
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
