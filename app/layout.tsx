import type { Metadata } from "next";
import { Gabarito } from "next/font/google";

import "./globals.css";

import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

import { ReactLenis } from "@/app/utils/lenis";

const gabarito = Gabarito({
    variable: "--font-gabarito",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: {
        default: "CodeBox — Cal Poly's Software Engineering Club",
        template: "%s | CodeBox",
    },
    description:
        "CodeBox is Cal Poly's student-run software engineering club. We design, build, and ship real web and mobile products every year.",
    metadataBase: new URL("https://codebox.so"),
    applicationName: "CodeBox",
    keywords: [
        "CodeBox",
        "Cal Poly",
        "Cal Poly SLO",
        "software engineering club",
        "computer science club",
        "student projects",
        "web development",
        "mobile development",
    ],
    openGraph: {
        siteName: "CodeBox",
        url: "https://codebox.so",
        images: "/og-image.png",
        title: "CodeBox — Cal Poly's Software Engineering Club",
        description:
            "Cal Poly's student-run software engineering club. Build cool things, gain real experience, grow together.",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "CodeBox — Cal Poly's Software Engineering Club",
        description:
            "Cal Poly's student-run software engineering club. Build cool things, gain real experience, grow together.",
        images: "/og-image.png",
    },
    icons: {
        icon: "/favicon.png",
        apple: "/apple-icon.png",
    },
};

const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CodeBox",
    alternateName: "Cal Poly CodeBox",
    url: "https://codebox.so",
    logo: "https://codebox.so/codebox.png",
    description:
        "CodeBox is Cal Poly's student-run software engineering club. Members design, build, and ship real web and mobile products every year.",
    email: "codebox@calpoly.edu",
    parentOrganization: {
        "@type": "CollegeOrUniversity",
        name: "California Polytechnic State University, San Luis Obispo",
    },
    sameAs: [
        "https://www.instagram.com/codeboxorg",
        "https://www.linkedin.com/company/codeboxorg",
        "https://discord.gg/Hbj66Rcca",
        "https://github.com/codebox-calpoly",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <ReactLenis root>
                <body className={`${gabarito.variable} antialiased`}>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(organizationJsonLd),
                        }}
                    />
                    <div className="min-h-screen flex flex-col bg-background">
                        <Navbar />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                </body>
            </ReactLenis>
        </html>
    );
}
