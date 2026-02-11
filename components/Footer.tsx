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

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
];

const SOCIAL_LINKS: { icon: IconDefinition; label: string; href: string }[] = [
  {
    icon: faInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/codeboxorg?igsh=MzRlODBiNWFlZA==",
  },
  {
    icon: faDiscord,
    label: "Discord",
    href: "https://discord.gg/usSg2WfrFs",
  },
  {
    icon: faLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/codeboxorg/posts/?feedView=all",
  },
  {
    icon: faEnvelopeRegular,
    label: "Email",
    href: "mailto:codebox@calpoly.edu",
  },
];

export function Footer() {
  return (
    <footer className="bg-background border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/codebox.png"
                alt="CodeBox"
                width={28}
                height={28}
                className="select-none"
              />
              <span className="text-foreground text-sm font-semibold tracking-wide">
                CodeBox
              </span>
            </Link>
            <p className="text-foreground/40 text-sm max-w-xs leading-relaxed">
              Cal Poly&apos;s premier student-run software engineering club.
              Building real products, shipping real code.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-foreground/30 font-medium mb-4">
              Navigation
            </h4>
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground/50 hover:text-foreground transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-foreground/30 font-medium mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-foreground/5 rounded-full flex items-center justify-center hover:bg-foreground/10 text-foreground/40 hover:text-foreground transition-all"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-foreground/30 text-sm mt-4">
              codebox@calpoly.edu
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-foreground/30 text-xs">
            &copy; {new Date().getFullYear()} CodeBox. All rights reserved.
          </p>
          <p className="text-foreground/20 text-xs">
            Crafted with &hearts; by CodeBox
          </p>
        </div>
      </div>
    </footer>
  );
}
