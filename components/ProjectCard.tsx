"use client";

import { motion } from "framer-motion";
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
      <motion.div
        className="bg-card rounded-3xl overflow-hidden group border border-foreground/10 hover:border-foreground/20 transition-colors relative"
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none" />

        <div className="grid md:grid-cols-2 gap-0 relative z-10">
          <div className="p-10 flex flex-col justify-center">
            <h3 className="text-4xl mb-4 text-foreground font-bold">{title}</h3>
            <p className="text-foreground/70 text-lg leading-relaxed mb-6">
              {description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-foreground/10 text-foreground/80 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button className="flex items-center gap-1 text-foreground hover:text-accent transition-colors text-sm group/btn cursor-pointer">
              <span className="font-medium">Read More</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform mt-[2px]" />
            </button>
          </div>
          <div className="relative h-[400px] md:h-auto overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`rounded-3xl overflow-hidden group shadow-2xl relative ${bgClass}`}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="p-8 min-h-[320px] flex flex-col relative z-10">
        <div className="flex-1">
          <h3 className="text-2xl mb-3 text-foreground font-bold">{title}</h3>
          <p className="text-foreground/90 leading-relaxed mb-4">
            {description}
          </p>
        </div>
        <div>
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-background/20 text-foreground rounded-full text-xs font-medium"
              >
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
          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
        />
      </div>
    </motion.div>
  );
}
