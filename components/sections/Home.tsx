"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "../ProjectCard";
import { CTA } from "../CTA";
import { Stats } from "../Stats";
import { projects } from "../../data/data";
import Image from "next/image";
import { BackgroundEffects } from "../ui/BackgroundEffects";
import { FloatingElements } from "../ui/FloatingElements";
import { AnimatedSection } from "../ui/AnimatedSection";
import { AnimatedImageStack } from "../ui/AnimatedImageStack";
import { SlideInButton } from "../ui/SlideInButton";

export function Home() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Aurora Background */}
        <BackgroundEffects />

        {/* Floating animated elements */}
        <FloatingElements />

        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none" />

        {/* Hero Content */}
        <div className="w-full flex items-center justify-center relative z-10">
          <div className="text-center space-y-8 flex flex-col items-center">
            <motion.p
              className="text-foreground/30 text-sm tracking-[0.4em] uppercase font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              codebox
            </motion.p>

            <div className="space-y-1">
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-foreground leading-[1] font-bold tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Build Projects.
              </motion.h1>
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-foreground leading-[1] font-bold tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                Ship Code.
              </motion.h1>
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1] font-bold tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1bad63] via-[#22c55e] to-[#4ade80]">
                  Make Impact.
                </span>
              </motion.h1>
            </div>

            <motion.p
              className="text-foreground/40 text-lg max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              Cal Poly&apos;s premier student-run software engineering club
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <SlideInButton
                variant="large"
                buttonText="Apply Now"
                link="#"
                useGradient={true}
                gradientFrom="#1bad63"
                gradientTo="#16a057"
                hoverGradientFrom="#16a057"
                defaultTextColor="#ffffff"
                hoverTextColor="#ffffff"
                iconName="Rocket"
              />
              <SlideInButton
                variant="large"
                buttonText="Learn More"
                link="/about"
                defaultBackgroundColor="transparent"
                hoverBackgroundColor="#ffffff"
                defaultTextColor="#ffffff"
                hoverTextColor="#000000"
                borderColor="rgba(255,255,255,0.2)"
                iconName="ArrowRight"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Club Photo Section */}
      <AnimatedSection className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/club-photo.jpg"
              alt="Club Photo"
              height={500}
              width={(3030 / 1147) * 500}
              className="w-full h-auto"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </AnimatedSection>

      {/* What We Do Section */}
      <section className="py-32 bg-background border-t border-foreground/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="hidden lg:block">
              <AnimatedImageStack
                images={[
                  { src: "/codebox-groups.jpg", alt: "Team collaboration" },
                  { src: "/codebox-4.jpg", alt: "Coding session" },
                  { src: "/codebox-2.jpg", alt: "Team event" },
                ]}
              />
            </div>

            <AnimatedSection className="space-y-8" direction="right">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl text-foreground font-bold tracking-tight">
                What We Do
              </h2>
              <div className="space-y-4">
                <p className="text-foreground/60 text-lg leading-relaxed">
                  CodeBox is a student-run software engineering club at Cal Poly
                  dedicated to building real-world products.
                </p>
                <p className="text-foreground/60 text-lg leading-relaxed">
                  Members develop their skills by working in teams on projects
                  throughout the academic year, gaining hands-on experience with
                  modern tech stacks while collaborating with peers.
                </p>
              </div>
              <SlideInButton
                variant="medium"
                buttonText="Learn More About Us"
                link="/about"
                defaultBackgroundColor="transparent"
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
      <section className="py-32 bg-background border-t border-foreground/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="mb-16">
            <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4">
              Our Projects
            </p>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl text-foreground font-bold tracking-tight">
              Featured Work
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 mb-16 items-stretch">
            {featuredProjects.map((project, index) => (
              <AnimatedSection
                key={project.title}
                delay={index * 0.1}
                className="h-full"
              >
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
              borderColor="rgba(255,255,255,0.2)"
              iconName="ArrowRight"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <AnimatedSection className="py-24 bg-background border-t border-foreground/5">
        <Stats />
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-24 bg-background border-t border-foreground/5">
        <CTA />
      </AnimatedSection>
    </div>
  );
}
