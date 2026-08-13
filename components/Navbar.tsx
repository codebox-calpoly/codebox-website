"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { SlideInButton } from "./ui/SlideInButton";

const navItems = [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Team", href: "/team" },
    { label: "Events", href: "/events" },
    { label: "Join", href: "/join" },
];

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50 select-none px-4 pt-4 sm:px-6"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}>
            <nav className="max-w-5xl mx-auto rounded-[2.5rem] border border-white/15 bg-black/60 backdrop-blur-md">
                <div className="flex items-center justify-between h-16 pl-6 pr-3 sm:pl-8 sm:pr-4">
                    <Link
                        href="/"
                        aria-label="Go to home"
                        className="flex items-center hover:opacity-80 transition-opacity">
                        <Image
                            src="/codebox.png"
                            alt="CodeBox"
                            width={46}
                            height={28}
                            className="select-none w-[46px] h-auto"
                        />
                    </Link>

                    <div className="hidden md:flex items-center gap-10">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-base font-medium transition-colors ${
                                    pathname === item.href
                                        ? "text-accent"
                                        : "text-white hover:text-accent"
                                }`}>
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:block">
                        <SlideInButton
                            link="/interest"
                            variant="small"
                            buttonText={
                                <span className="uppercase tracking-wide font-bold">
                                    I&rsquo;m Interested
                                </span>
                            }
                            defaultBackgroundColor="#1a9b4a"
                            hoverBackgroundColor="#005e2f"
                            defaultTextColor="#ffffff"
                            hoverTextColor="#ffffff"
                            iconName="Rocket"
                        />
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-white"
                        aria-label="Toggle menu">
                        {mobileMenuOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                    </button>
                </div>

                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            className="md:hidden overflow-hidden border-t border-white/10"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}>
                            <div className="flex flex-col gap-1 px-6 py-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`py-2 text-base font-medium ${
                                            pathname === item.href
                                                ? "text-accent"
                                                : "text-white/80"
                                        }`}>
                                        {item.label}
                                    </Link>
                                ))}
                                <SlideInButton
                                    link="/interest"
                                    variant="small"
                                    buttonText={
                                        <span className="uppercase tracking-wide font-bold">
                                            I&rsquo;m Interested
                                        </span>
                                    }
                                    defaultBackgroundColor="#1a9b4a"
                                    hoverBackgroundColor="#005e2f"
                                    defaultTextColor="#ffffff"
                                    hoverTextColor="#ffffff"
                                    iconName="Rocket"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="mt-2 mb-2 w-fit"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    );
}
