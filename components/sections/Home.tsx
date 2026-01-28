"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ProjectCard } from "../ProjectCard";
import { CTA } from "../CTA";
import { Stats } from "../Stats";
import { projects } from "../../data/data";
import Image from "next/image";
import { BackgroundEffects } from "../ui/BackgroundEffects";
import { AnimatedSection } from "../ui/AnimatedSection";
import { SlideInButton } from "../ui/SlideInButton";

export function Home() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <BackgroundEffects />
        <div className="absolute inset-0 bg-background">
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,var(--accent)_1px,transparent_1px)] bg-[length:50px_50px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 relative z-10">
          <div className="text-center space-y-6">
            <motion.div
              className="text-foreground/50 text-xl tracking-wider mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              codebox
            </motion.div>

            <h1 className="text-7xl lg:text-8xl xl:text-9xl text-foreground leading-[0.9] flex flex-col gap-2 font-extrabold">
              <motion.div
                className="relative inline-block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Build Projects.
              </motion.div>
              <br />
              <motion.div
                className="relative inline-block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Ship Code.
              </motion.div>
              <br />
              <motion.div
                className="relative inline-block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#1bad63] to-[#22c55e]">
                  Make Impact.
                </span>
              </motion.div>
            </h1>

            <motion.p
              className="text-foreground/60 text-base tracking-wide pt-8 font-normal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Cal Poly&apos;s student-run software engineering club
            </motion.p>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 1 },
            y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <ChevronDown className="w-8 h-8 text-foreground/20" />
        </motion.div>
      </section>

      {/* Club Photo Section */}
      <AnimatedSection className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src="/club-photo.jpg"
              alt="Club Photo"
              height={500}
              width={(3030 / 1147) * 500}
            />
          </motion.div>
        </div>
      </AnimatedSection>

      {/* What We Do Section */}
      <section className="py-32 bg-background border-t border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <AnimatedSection
              className="relative h-125 hidden lg:block"
              direction="left"
            >
              <motion.div
                className="absolute top-4 left-28 w-56 h-56 rounded-2xl overflow-hidden shadow-2xl rotate-6"
                whileHover={{ scale: 1.05, rotate: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src="/codebox-groups.jpg"
                  alt="Team collaboration"
                  width={4000}
                  height={3000}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                className="absolute top-38 left-68 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl -rotate-3"
                whileHover={{ scale: 1.05, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src="/codebox-4.jpg"
                  alt="Coding session"
                  width={3000}
                  height={2000}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                className="absolute bottom-4 left-44 w-52 h-52 rounded-2xl overflow-hidden shadow-2xl rotate-3"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Image
                  src="/codebox-2.jpg"
                  alt="Team event"
                  width={1000}
                  height={1500}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatedSection>

            <AnimatedSection className="space-y-6" direction="right">
              <h2 className="text-5xl lg:text-6xl text-foreground font-bold">
                What We Do
              </h2>
              <p className="text-foreground/80 text-xl leading-relaxed">
                CodeBox is a student-run software engineering club at Cal Poly
                dedicated to building real-world products.
              </p>
              <p className="text-foreground/80 text-xl leading-relaxed">
                Members develop their skills by working in teams on projects
                throughout the academic year, gaining hands-on experience with
                modern tech stacks while collaborating with peers.
              </p>
              <SlideInButton
                variant="medium"
                buttonText="Learn More About Us"
                link="/about"
                defaultBackgroundColor="rgba(255,255,255,0.1)"
                hoverBackgroundColor="#ffffff"
                defaultTextColor="#ffffff"
                hoverTextColor="#000000"
                borderColor="rgba(255,255,255,0.2)"
                iconName="ArrowRight"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-32 bg-background border-t border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-5xl lg:text-6xl text-foreground mb-16 font-bold">
              Featured Work
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {featuredProjects.map((project, index) => (
              <AnimatedSection key={project.title} delay={index * 0.15}>
                <ProjectCard featured {...project} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center">
            <SlideInButton
              variant="medium"
              buttonText="View All Projects"
              link="/projects"
              defaultBackgroundColor="transparent"
              hoverBackgroundColor="#ffffff"
              defaultTextColor="#ffffff"
              hoverTextColor="#000000"
              borderColor="rgba(255,255,255,0.3)"
              iconName="ArrowRight"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <AnimatedSection className="py-20 bg-background border-t border-foreground/10">
        <Stats />
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 bg-background border-t border-foreground/10">
        <CTA />
      </AnimatedSection>
    </div>
  );
}
