import type { Metadata } from "next";

import { PillButton } from "@/components/ui/PillButton";

export const metadata: Metadata = {
    title: "Page Not Found",
};

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
            <div className="text-center">
                <div className="text-[8rem] sm:text-[11rem] leading-none font-extrabold bg-gradient-to-b from-accent to-accent-dark bg-clip-text text-transparent select-none">
                    404
                </div>
                <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold">
                    Looks like this page shipped without QA.
                </h1>
                <p className="mt-4 text-lg text-white/60">
                    The page you&rsquo;re looking for doesn&rsquo;t exist or has
                    moved.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                    <PillButton href="/" variant="primary" size="lg">
                        Back Home
                    </PillButton>
                    <PillButton href="/events" size="lg">
                        Check Out Our Events
                    </PillButton>
                </div>
            </div>
        </div>
    );
}
