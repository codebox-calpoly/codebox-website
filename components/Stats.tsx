export function Stats() {
    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div>
                    <div className="text-6xl mb-3 text-accent font-extrabold">
                        50+
                    </div>
                    <div className="text-foreground/60 text-lg">
                        Active Members
                    </div>
                </div>
                <div>
                    <div className="text-6xl mb-3 text-accent font-extrabold">
                        5+
                    </div>
                    <div className="text-foreground/60 text-lg">
                        Projects Completed
                    </div>
                </div>
                <div>
                    <div className="text-6xl mb-3 text-accent font-extrabold">
                        1
                    </div>
                    <div className="text-foreground/60 text-lg">
                        Years Building
                    </div>
                </div>
            </div>
        </div>
    );
}
