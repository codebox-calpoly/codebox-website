"use client";

import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin } from "lucide-react";
import { CTA } from "../CTA";
import { leadership, teamYears } from "../../data/data";
import Image from "next/image";
import { AnimatedSection } from "../ui/AnimatedSection";

export function Team() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.h1
            className="text-6xl lg:text-7xl text-foreground mb-8 font-bold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Meet the Team
          </motion.h1>
          <motion.p
            className="text-2xl text-foreground/70 max-w-3xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Led by Cal Poly students, for Cal Poly students. We&apos;re a
            diverse group of builders, makers, and innovators passionate about
            creating great products.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-background border-t border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <h2 className="text-4xl lg:text-5xl text-foreground mb-4 font-bold">
              Leadership
            </h2>
            <p className="text-foreground/60 text-lg">
              The people guiding CodeBox&apos;s vision and operations
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                className="bg-foreground/5 rounded-2xl border border-foreground/10 hover:border-foreground/20 transition-colors p-8 group relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-chart-3/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-accent to-chart-3 rounded-full mx-auto mb-6 flex items-center justify-center text-foreground text-2xl font-bold relative z-10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {leader.name.charAt(0)}
                </motion.div>
                <div className="text-center relative z-10">
                  <h3 className="text-xl text-foreground mb-2 font-bold">
                    {leader.name}
                  </h3>
                  <p className="text-accent mb-4 font-semibold">{leader.role}</p>
                  <div className="flex gap-3 justify-center">
                    <motion.a
                      href={leader.linkedin}
                      className="w-9 h-9 bg-foreground/10 rounded-full flex items-center justify-center hover:bg-foreground/20 transition-colors text-foreground/50 hover:text-foreground"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href={leader.github}
                      className="w-9 h-9 bg-foreground/10 rounded-full flex items-center justify-center hover:bg-foreground/20 transition-colors text-foreground/50 hover:text-foreground"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background border-t border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <h2 className="text-4xl lg:text-5xl text-foreground mb-4 font-bold">
              Classes
            </h2>
            <p className="text-foreground/60 text-lg">
              Our talented developers, designers, and engineers making it all
              happen
            </p>
          </AnimatedSection>

          <div className="space-y-4">
            {teamYears.map((year, index) => (
              <motion.details
                key={year.year}
                className="group rounded-2xl border border-foreground/10 bg-foreground/5 p-6 transition-all hover:border-foreground/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-foreground">
                  <span className="text-xl font-semibold">{year.year}</span>
                  <ChevronDown className="w-5 h-5 text-foreground/60 transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-xl border border-foreground/10 bg-background/60 p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
                      Leadership
                    </h3>
                    <ul className="mt-3 space-y-2 text-foreground">
                      {year.sections.leadership.length > 0 ? (
                        year.sections.leadership.map((name) => (
                          <li key={name} className="text-sm font-medium">
                            {name}
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-foreground/50">TBD</li>
                      )}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-foreground/10 bg-background/60 p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
                      Tech Leads
                    </h3>
                    <ul className="mt-3 space-y-2 text-foreground">
                      {year.sections.techLeads.length > 0 ? (
                        year.sections.techLeads.map((name) => (
                          <li key={name} className="text-sm font-medium">
                            {name}
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-foreground/50">TBD</li>
                      )}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-foreground/10 bg-background/60 p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
                      Product Leads
                    </h3>
                    <ul className="mt-3 space-y-2 text-foreground">
                      {year.sections.productLeads.length > 0 ? (
                        year.sections.productLeads.map((name) => (
                          <li key={name} className="text-sm font-medium">
                            {name}
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-foreground/50">TBD</li>
                      )}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-foreground/10 bg-background/60 p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
                      Developers
                    </h3>
                    <ul className="mt-3 space-y-2 text-foreground">
                      {year.sections.developers.length > 0 ? (
                        year.sections.developers.map((name) => (
                          <li key={name} className="text-sm font-medium">
                            {name}
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-foreground/50">TBD</li>
                      )}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-foreground/10 bg-background/60 p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
                      Designers
                    </h3>
                    <ul className="mt-3 space-y-2 text-foreground">
                      {year.sections.designers.length > 0 ? (
                        year.sections.designers.map((name) => (
                          <li key={name} className="text-sm font-medium">
                            {name}
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-foreground/50">TBD</li>
                      )}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-foreground/10 bg-background/60 p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
                      Advisors
                    </h3>
                    <ul className="mt-3 space-y-2 text-foreground">
                      {year.sections.advisors.length > 0 ? (
                        year.sections.advisors.map((name) => (
                          <li key={name} className="text-sm font-medium">
                            {name}
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-foreground/50">TBD</li>
                      )}
                    </ul>
                  </div>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background border-t border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <h2 className="text-4xl lg:text-5xl text-foreground mb-4 font-bold">
              Life at CodeBox
            </h2>
            <p className="text-foreground/60 text-lg">
              Beyond code, we&apos;re a community that learns, builds, and grows
              together.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
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
            ].map((item, index) => (
              <motion.div
                key={item.caption}
                className="group relative aspect-4/3 rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={item.src}
                  alt={item.caption}
                  width={3000}
                  height={2000}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-foreground text-2xl mb-2 font-bold">
                    {item.caption}
                  </h3>
                  <p className="text-foreground/80">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatedSection className="py-20 bg-background border-t border-foreground/10">
        <CTA />
      </AnimatedSection>
    </div>
  );
}
