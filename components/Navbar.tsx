"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { label: "About", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Team", href: "/team" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10 select-none">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link
                        href="/"
                        className="text-foreground hover:opacity-80 transition-opacity h-16 flex items-center bg-transparent px-4 -ml-6"
                        aria-label="Go to home">
                        <Image
                            src="/codebox.png"
                            alt="Codebox"
                            width={50}
                            height={50}
                            className="select-none"
                        />
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`transition-colors text-sm font-normal ${
                                    pathname === item.href
                                        ? "text-foreground"
                                        : "text-foreground/70 hover:text-foreground"
                                }`}>
                                {item.label}
                            </Link>
                        ))}
                        <button
                            onClick={() => window.open("#", "_blank")}
                            className="px-5 py-2 bg-accent text-accent-foreground rounded-full hover:bg-[var(--codebox-green-hover)] transition-all text-sm font-normal cursor-pointer">
                            Apply
                        </button>
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-foreground"
                        aria-label="Toggle menu">
                        {mobileMenuOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden py-6 border-t border-foreground/10">
                        <div className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`text-left py-2 transition-colors text-sm font-normal ${
                                        pathname === item.href
                                            ? "text-foreground"
                                            : "text-foreground/70"
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}>
                                    {item.label}
                                </Link>
                            ))}
                            <button
                                onClick={() => window.open("#", "_blank")}
                                className="px-5 py-2 bg-accent text-accent-foreground rounded-full hover:bg-[var(--codebox-green-hover)] transition-all text-center text-sm mt-2 font-normal">
                                Apply
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
