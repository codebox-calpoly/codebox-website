"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SlideInButton } from "./ui/SlideInButton";

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { label: "About", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Team", href: "/team" },
    ];

    const applyButtonProps = {
        useGradient: true,
        gradientFrom: "#1bad63",
        gradientTo: "#16a057",
        hoverGradientFrom: "#16a057",
        defaultTextColor: "#ffffff",
        hoverTextColor: "#ffffff",
        iconName: "Rocket" as const,
        link: "/interest",
    };

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 select-none transition-all duration-300 ${
                scrolled || mobileMenuOpen
                    ? "bg-background/75 backdrop-blur-md border-b border-foreground/10"
                    : "bg-transparent border-b border-transparent"
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link
                        href="/"
                        className="text-foreground hover:opacity-80 transition-opacity h-16 flex items-center bg-transparent px-4 -ml-6"
                        aria-label="Go to home">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}>
                            <Image
                                src="/codebox.png"
                                alt="Codebox"
                                width={50}
                                height={50}
                                className="select-none"
                            />
                        </motion.div>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`transition-colors text-sm font-normal relative ${
                                    pathname === item.href
                                        ? "text-foreground"
                                        : "text-foreground/70 hover:text-foreground"
                                }`}>
                                {item.label}
                                {pathname === item.href && (
                                    <motion.div
                                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent"
                                        layoutId="navbar-underline"
                                        transition={{
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 30,
                                        }}
                                    />
                                )}
                            </Link>
                        ))}
                        <SlideInButton
                            variant="small"
                            buttonText="Apply"
                            {...applyButtonProps}
                        />
                    </div>

                    <motion.button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-foreground"
                        aria-label="Toggle menu"
                        whileTap={{ scale: 0.9 }}>
                        {mobileMenuOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                    </motion.button>
                </div>

                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            className="md:hidden py-6 border-t border-foreground/10"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}>
                            <div className="flex flex-col gap-4">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}>
                                        <Link
                                            href={item.href}
                                            className={`text-left py-2 transition-colors text-sm font-normal block ${
                                                pathname === item.href
                                                    ? "text-foreground"
                                                    : "text-foreground/70"
                                            }`}
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }>
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: navItems.length * 0.1,
                                    }}
                                    className="mt-2">
                                    <SlideInButton
                                        variant="medium"
                                        buttonText="Apply"
                                        {...applyButtonProps}
                                        onClick={() =>
                                            setMobileMenuOpen(false)
                                        }
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}
