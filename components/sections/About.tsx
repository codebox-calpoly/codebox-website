import { ArrowRight, Code2, Lightbulb, Rocket, Users } from "lucide-react";
import { CTA } from "../CTA";
import { Stats } from "../Stats";
import Image from "next/image";

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
                    <h1 className="text-6xl lg:text-7xl text-foreground mb-8 font-bold">
                        About CodeBox
                    </h1>
                    <p className="text-2xl text-foreground/70 max-w-3xl leading-relaxed">
                        We&apos;re a student-run software engineering club at
                        Cal Poly dedicated to turning ideas into real products.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-background border-t border-foreground/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl lg:text-5xl text-foreground font-bold">
                                Builders. Dreamers. Doers.
                            </h2>
                            <p className="text-foreground/70 text-lg leading-relaxed">
                                CodeBox is more than just a club - it&apos;s a
                                community. We bring together students of all
                                skill levels, from complete beginners to
                                experienced developers, to collaborate on
                                exciting projects. Whether it&apos;s web
                                applications, mobile apps, AI tools, or
                                something completely new, we turn ideas into
                                reality while learning industry best practices.
                            </p>
                            <p className="text-foreground/70 text-lg leading-relaxed">
                                Each year, our members work in teams to design,
                                develop, and deploy projects that solve real
                                problems. You&apos;ll gain hands-on experience
                                with modern tech stacks, collaborate with
                                talented peers, and build a portfolio that
                                stands out.
                            </p>
                        </div>
                        <div className="relative aspect-4/3 rounded-3xl overflow-hidden">
                            <Image
                                src="/codebox-1.jpg"
                                width={3000}
                                height={2000}
                                alt="Students collaborating"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-background border-t border-foreground/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="mb-16">
                        <h2 className="text-4xl lg:text-5xl text-foreground mb-4 font-bold">
                            Our Core Values
                        </h2>
                        <p className="text-foreground/60 text-lg">
                            The principles that guide everything we do at
                            CodeBox
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value) => (
                            <div
                                key={value.title}
                                className="bg-foreground/5 rounded-2xl p-8 border border-foreground/10 hover:border-foreground/20 transition-all group">
                                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <value.icon className="w-6 h-6 text-accent-foreground" />
                                </div>
                                <h3 className="text-xl text-foreground mb-3 font-bold">
                                    {value.title}
                                </h3>
                                <p className="text-foreground/70 leading-relaxed text-sm">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-background border-t border-foreground/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="mb-16">
                        <h2 className="text-4xl lg:text-5xl text-foreground mb-4 font-bold">
                            How It Works
                        </h2>
                        <p className="text-foreground/60 text-lg">
                            Your journey from application to shipped product
                        </p>
                    </div>

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
                        ].map((step) => (
                            <div key={step.number} className="space-y-4">
                                <div className="text-6xl text-accent opacity-50 font-bold">
                                    {step.number}
                                </div>
                                <h3 className="text-2xl text-foreground font-bold">
                                    {step.title}
                                </h3>
                                <p className="text-foreground/70 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
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
