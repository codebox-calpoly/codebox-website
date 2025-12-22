import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ProjectCard } from "../ProjectCard";
import { CTA } from "../CTA";
import { Stats } from "../Stats";
import { projects } from "../../data/data";
import Image from "next/image";

export function Home() {
    const featuredProjects = projects.filter((project) => project.featured);

    return (
        <div className="min-h-screen bg-background">
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-background">
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,var(--accent)_1px,transparent_1px)] bg-size-[50px_50px]" />
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 relative z-10">
                    <div className="text-center space-y-6">
                        <div className="text-foreground/50 text-xl tracking-wider mb-8">
                            codebox
                        </div>

                        <h1 className="text-7xl lg:text-8xl xl:text-9xl text-foreground leading-[0.9] flex flex-col gap-2 font-extrabold">
                            <div className="relative inline-block">
                                Build Projects.
                            </div>
                            <br />
                            <div className="relative inline-block">
                                Ship Code.
                            </div>
                            <br />
                            <div className="relative inline-block">
                                <span className="text-accent">
                                    Make Impact.
                                </span>
                            </div>
                        </h1>

                        <p className="text-foreground/60 text-base tracking-wide pt-8 font-normal">
                            Cal Poly&apos;s student-run software engineering
                            club
                        </p>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <ChevronDown className="w-8 h-8 text-foreground/20" />
                </div>
            </section>

            <section className="py-20 bg-background">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="relative rounded-3xl overflow-hidden">
                        <Image
                            src="/club-photo.jpg"
                            alt="Club Photo"
                            height={500}
                            width={(3030 / 1147) * 500}
                        />
                    </div>
                </div>
            </section>

            <section className="py-32 bg-background border-t border-foreground/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="relative h-125 hidden lg:block">
                            <div className="absolute top-4 left-28 w-56 h-56 rounded-2xl overflow-hidden shadow-2xl rotate-6">
                                <Image
                                    src="/codebox-groups.jpg"
                                    alt="Team collaboration"
                                    width={4000}
                                    height={3000}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute top-38 left-68 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl -rotate-3">
                                <Image
                                    src="/codebox-4.jpg"
                                    alt="Coding session"
                                    width={3000}
                                    height={2000}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute bottom-4 left-44 w-52 h-52 rounded-2xl overflow-hidden shadow-2xl rotate-3">
                                <Image
                                    src="/codebox-2.jpg"
                                    alt="Team event"
                                    width={1000}
                                    height={1500}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-5xl lg:text-6xl text-foreground font-bold">
                                What We Do
                            </h2>
                            <p className="text-foreground/80 text-xl leading-relaxed">
                                CodeBox is a student-run software engineering
                                club at Cal Poly dedicated to building
                                real-world products.
                            </p>
                            <p className="text-foreground/80 text-xl leading-relaxed">
                                Members develop their skills by working in teams
                                on projects throughout the academic year,
                                gaining hands-on experience with modern tech
                                stacks while collaborating with peers.
                            </p>
                            <Link
                                href="/about"
                                className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-foreground/10 text-foreground rounded-full hover:bg-foreground/20 transition-all border border-foreground/20 font-medium">
                                Learn More About Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-32 bg-background border-t border-foreground/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <h2 className="text-5xl lg:text-6xl text-foreground mb-16 font-bold">
                        Featured Work
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                        {featuredProjects.map((project) => (
                            <ProjectCard
                                featured
                                key={project.title}
                                {...project}
                            />
                        ))}
                    </div>

                    <div className="text-center">
                        <Link
                            href="/projects"
                            className="px-8 py-4 border border-foreground/30 text-foreground rounded-full hover:bg-foreground/10 transition-all font-medium">
                            View All Projects
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-background border-t border-foreground/10">
                <Stats />
            </section>

            <section className="py-20 bg-background border-t border-foreground/10">
                <CTA />
            </section>
        </div>
    );
}
