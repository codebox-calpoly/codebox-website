import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PillButtonProps = {
    href: string;
    children: ReactNode;
    variant?: "primary" | "outline";
    size?: "sm" | "md" | "lg";
    showArrow?: boolean;
    className?: string;
    newTab?: boolean;
    onClick?: () => void;
};

const sizeClasses = {
    sm: "px-5 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
};

export function PillButton({
    href,
    children,
    variant = "outline",
    size = "md",
    showArrow = false,
    className,
    newTab = false,
    onClick,
}: PillButtonProps) {
    const classes = cn(
        "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 select-none",
        sizeClasses[size],
        variant === "primary"
            ? "bg-accent text-white hover:bg-[var(--codebox-green-hover)] hover:scale-[1.03]"
            : "border border-white/40 text-white hover:border-accent hover:text-accent",
        className
    );

    const content = (
        <>
            {children}
            {showArrow && (
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                </span>
            )}
        </>
    );

    if (newTab || href.startsWith("http") || href.startsWith("mailto:")) {
        return (
            <a
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={classes}
                onClick={onClick}>
                {content}
            </a>
        );
    }

    return (
        <Link href={href} className={classes} onClick={onClick}>
            {content}
        </Link>
    );
}
