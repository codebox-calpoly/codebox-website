"use client";

import { motion } from "framer-motion";
import { Code2, Lightbulb, Rocket, Users } from "lucide-react";
import { CTA } from "../CTA";
import { Stats } from "../Stats";
import Image from "next/image";
import { AnimatedSection } from "../ui/AnimatedSection";

export function About() {
  const values = [
    {
      icon: Code2,
      title: "Real Projects",
      description:
        "Work on production-ready applications that solve real problems for real users, not just classroom exercises.",
    },
    {
      icon: Users,
      title: "Mentorship & Learning",
      description:
        "Learn from experienced developers and grow your skills through hands-on collaboration and code reviews.",
    },
    {
      icon: Lightbulb,
      title: "Community",
      description:
        "Build lasting friendships and professional connections with fellow Cal Poly students who share your passion.",
    },
    {
      icon: Rocket,
      title: "Innovation",
      description:
        "Create products that make a difference on campus and beyond, from idea to deployment.",
    },
  ];

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
            About CodeBox
          </motion.h1>
          <motion.p
            className="text-2xl text-foreground/70 max-w-3xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We&apos;re a student-run software engineering club at Cal Poly
            dedicated to turning ideas into real products.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-background border-t border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection className="space-y-6" direction="left">
              <h2 className="text-4xl lg:text-5xl text-foreground font-bold">
                Builders. Dreamers. Doers.
              </h2>
              <p className="text-foreground/70 text-lg leading-relaxed">
                CodeBox is more than just a club - it&apos;s a community. We
                bring together students of all skill levels, from complete
                beginners to experienced developers, to collaborate on exciting
                projects. Whether it&apos;s web applications, mobile apps, AI
                tools, or something completely new, we turn ideas into reality
                while learning industry best practices.
              </p>
              <p className="text-foreground/70 text-lg leading-relaxed">
                Each year, our members work in teams to design, develop, and
                deploy projects that solve real problems. You&apos;ll gain
                hands-on experience with modern tech stacks, collaborate with
                talented peers, and build a portfolio that stands out.
              </p>
            </AnimatedSection>
            <AnimatedSection
              className="relative aspect-4/3 rounded-3xl overflow-hidden"
              direction="right"
            >
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src="/codebox-1.jpg"
                  width={3000}
                  height={2000}
                  alt="Students collaborating"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background border-t border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="mb-16">
            <h2 className="text-4xl lg:text-5xl text-foreground mb-4 font-bold">
              Our Core Values
            </h2>
            <p className="text-foreground/60 text-lg">
              The principles that guide everything we do at CodeBox
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-foreground/5 rounded-2xl p-8 border border-foreground/10 hover:border-foreground/20 transition-colors group relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <motion.div
                  className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-6 relative z-10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <value.icon className="w-6 h-6 text-accent-foreground" />
                </motion.div>
                <h3 className="text-xl text-foreground mb-3 font-bold relative z-10">
                  {value.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed text-sm relative z-10">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background border-t border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="mb-16">
            <h2 className="text-4xl lg:text-5xl text-foreground mb-4 font-bold">
              How It Works
            </h2>
            <p className="text-foreground/60 text-lg">
              Your journey from application to shipped product
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
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
                  "We'll match you with a project team based on your skills and learning goals.",
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
                  "Present your project at our end-of-spring showcase and scale.",
              },
            ].map((step, index) => (
              <motion.div
                key={step.number}
                className="space-y-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <motion.div
                  className="text-6xl text-accent opacity-50 font-bold"
                  whileHover={{ scale: 1.1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {step.number}
                </motion.div>
                <h3 className="text-2xl text-foreground font-bold">
                  {step.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatedSection className="py-20 bg-background border-t border-foreground/10">
        <Stats />
      </AnimatedSection>

      <AnimatedSection className="py-20 bg-background border-t border-foreground/10">
        <CTA />
      </AnimatedSection>
    </div>
  );
}
