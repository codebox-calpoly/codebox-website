import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    image: string;
    label?: string;
    featured?: boolean;
    bgClass?: string;
}

export function ProjectCard({
    title,
    description,
    tags,
    image,
    featured = false,
    bgClass = "bg-accent",
}: ProjectCardProps) {
    if (featured) {
        return (
            <div className="bg-card rounded-3xl overflow-hidden group border border-foreground/10 hover:border-foreground/20 transition-all">
                <div className="grid md:grid-cols-2 gap-0">
                    <div className="p-10 flex flex-col justify-center">
                        <h3 className="text-4xl mb-4 text-foreground font-bold">
                            {title}
                        </h3>
                        <p className="text-foreground/70 text-lg leading-relaxed mb-6">
                            {description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-foreground/10 text-foreground/80 rounded-full text-xs font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <button className="flex items-center gap-1 text-foreground hover:text-foreground/80 transition-colors text-sm group/btn cursor-pointer">
                            <span className="font-medium">Read More</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform mt-[2px]" />
                        </button>
                    </div>
                    <div className="relative h-[400px] md:h-auto">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`rounded-3xl overflow-hidden group hover:scale-[1.02] transition-all duration-300 shadow-2xl ${bgClass}`}>
            <div className="p-8 min-h-[320px] flex flex-col">
                <div className="flex-1">
                    <h3 className="text-2xl mb-3 text-foreground font-bold">
                        {title}
                    </h3>
                    <p className="text-foreground/90 leading-relaxed mb-4">
                        {description}
                    </p>
                </div>
                <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-background/20 text-foreground rounded-full text-xs font-medium">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <button className="flex items-center gap-1 text-foreground hover:text-foreground/80 transition-colors text-sm group/btn cursor-pointer">
                        <span className="font-medium">Read More</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform mt-[2px]" />
                    </button>
                </div>
            </div>
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover opacity-90"
                />
            </div>
        </div>
    );
}
