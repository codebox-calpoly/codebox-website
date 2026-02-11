"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Scroll-driven animation — continuous interpolation, no state toggles
  const { scrollY } = useScroll();
  const textWidth = useTransform(scrollY, [0, 150], [130, 0]);
  const textX = useTransform(scrollY, [0, 150], [0, -130]);
  const textOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background animate-slide-down">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center text-foreground hover:opacity-80 transition-opacity"
            aria-label="Go to home"
          >
            <Image
              src="/codebox.png"
              alt="CodeBox"
              width={36}
              height={36}
              className="select-none"
            />
            {/* Scroll-driven slide: width collapses + text slides left */}
            <motion.div
              className="overflow-hidden hidden sm:block"
              style={{ width: textWidth }}
            >
              <motion.span
                className="block whitespace-nowrap font-semibold tracking-wide text-lg pl-3"
                style={{ x: textX, opacity: textOpacity }}
              >
                CodeBox
              </motion.span>
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm transition-colors duration-200 ${
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/50 hover:text-foreground"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent"
                    layoutId="nav-underline"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            ))}
            <Link
              href="#"
              className="bg-accent text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#16a057] transition-colors duration-200"
            >
              Apply
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground active:scale-95 transition-transform"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden py-6 border-t border-foreground/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`block py-3 text-sm transition-colors duration-200 ${
                        pathname === item.href
                          ? "text-foreground"
                          : "text-foreground/50"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_ITEMS.length * 0.05 }}
                  className="pt-3"
                >
                  <Link
                    href="#"
                    className="inline-flex bg-accent text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#16a057] transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Apply
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
