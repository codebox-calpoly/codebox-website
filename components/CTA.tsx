import { AnimatedSection } from "./ui/AnimatedSection";
import { PillButton } from "./ui/PillButton";

export function CTA() {
    return (
        <section className="py-24">
            <AnimatedSection className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                    Have a Cool Idea? Ready to Build?
                </h2>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                    <PillButton href="mailto:codebox@calpoly.edu" size="lg">
                        Submit an Idea
                    </PillButton>
                    <PillButton href="/interest" size="lg">
                        I&rsquo;m Interested
                    </PillButton>
                </div>
            </AnimatedSection>
        </section>
    );
}
