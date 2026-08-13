import Link from "next/link";
import Image from "next/image";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDiscord,
    faInstagram,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

const links = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Team", href: "/team" },
    { label: "Events", href: "/events" },
    { label: "Join", href: "/join" },
    { label: "FAQs", href: "/#faqs" },
];

const socialLinks: { icon: IconDefinition; label: string; href: string }[] = [
    {
        icon: faInstagram,
        label: "Instagram",
        href: "https://www.instagram.com/codeboxorg?igsh=MzRlODBiNWFlZA==",
    },
    { icon: faDiscord, label: "Discord", href: "https://discord.gg/Hbj66Rcca" },
    {
        icon: faLinkedin,
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/codeboxorg/posts/?feedView=all",
    },
    { icon: faEnvelope, label: "Email", href: "mailto:codebox@calpoly.edu" },
];

export function Footer() {
    return (
        <footer className="bg-background border-t border-white/10 text-foreground">
            <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <Image
                            src="/codebox.png"
                            alt="CodeBox"
                            width={64}
                            height={40}
                            className="select-none w-16 h-auto"
                        />
                        <div className="mt-8 flex flex-wrap gap-x-12 gap-y-4">
                            {links.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-base text-white hover:text-accent transition-colors">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <p className="mt-10 text-white/60">
                            Made with <span className="text-accent">💚</span>{" "}
                            for Cal Poly students by Cal Poly students
                        </p>
                    </div>

                    <div className="flex flex-col md:items-end justify-between gap-8">
                        <div>
                            <h4 className="text-xl font-bold md:text-right">
                                Reach out to us!
                            </h4>
                            <div className="mt-5 flex gap-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-black transition-transform duration-300 hover:scale-110">
                                        <FontAwesomeIcon
                                            icon={social.icon}
                                            className="w-5 h-5"
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>
                        <p className="text-white/60 md:text-right">
                            © 2026 Cal Poly CodeBox. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
