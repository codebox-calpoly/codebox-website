"use client";

export function CTA() {
    return (
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-5xl lg:text-6xl text-foreground mb-10 font-bold leading-tight">
                Ready to start
                <br />
                building?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={() => window.open("#", "_blank")}
                    className="px-8 py-4 bg-accent text-accent-foreground rounded-full hover:bg-[var(--codebox-green-hover)] transition-all font-medium cursor-pointer">
                    Apply Now
                </button>
                <button
                    onClick={() => window.open("https://discord.gg/usSg2WfrFs", "_blank")}
                    className="px-8 py-4 border border-foreground/30 text-foreground rounded-full hover:bg-foreground/10 transition-all font-medium cursor-pointer">
                    Join Discord
                </button>
            </div>
        </div>
    );
}
