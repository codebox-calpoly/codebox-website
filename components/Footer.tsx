import Link from "next/link";
import Image from "next/image";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDiscord,
    faInstagram,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope as faEnvelopeRegular } from "@fortawesome/free-regular-svg-icons";

export function Footer() {
    const links = [
        { label: "About", href: "/about" },
        { label: "Projects", href: "/projects" },
        { label: "Team", href: "/team" },
    ];

    const socialLinks: { icon: IconDefinition; label: string; href: string }[] =
        [
            { icon: faInstagram, label: "Instagram", href: "#" },
            { icon: faDiscord, label: "Discord", href: "#" },
            { icon: faLinkedin, label: "LinkedIn", href: "#" },
            {
                icon: faEnvelopeRegular,
                label: "Email",
                href: "mailto:codebox@calpoly.edu",
            },
        ];

    return (
        <footer className="bg-background border-t border-foreground/10 text-foreground">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <Image
                            src="/codebox.png"
                            alt="Codebox"
                            width={30}
                            height={30}
                            className="select-none"
                        />
                        <p className="text-foreground/60 max-w-xs text-sm">
                            Made with{" "}
                            <span className="text-foreground">♥️</span> for Cal
                            Poly students <br /> by Cal Poly students.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm uppercase tracking-wider text-foreground/40 font-medium">
                            Quick Links
                        </h4>
                        <div className="flex flex-col gap-3">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-foreground/60 hover:text-foreground transition-colors text-left text-sm">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm uppercase tracking-wider text-foreground/40 font-medium">
                            Connect
                        </h4>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 bg-foreground/10 rounded-full flex items-center justify-center hover:bg-foreground/20 text-foreground/50 transition-all"
                                    aria-label={social.label}>
                                    <FontAwesomeIcon
                                        icon={social.icon}
                                        className="w-4 h-4"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-foreground/10 text-center text-foreground/40 text-sm">
                    <p>© 2025 CodeBox</p>
                </div>
            </div>
        </footer>
    );
}
