import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

import { ReactLenis } from "@/app/utils/lenis";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "CodeBox",
    description: "CodeBox - Cal Poly Computer Science Club",
    metadataBase: new URL("https://codebox.calpoly.edu"),
    openGraph: {
        images: "/codeboxlogo2nobg.png",
        title: "CodeBox",
        description: "Cal Poly Computer Science Club",
        type: "website",
    },
    icons: {
        icon: "/favicon.png", // Add favicon
        apple: "/apple-icon.png", // Add Apple touch icon
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <ReactLenis root>
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
