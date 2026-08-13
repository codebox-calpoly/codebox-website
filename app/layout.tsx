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
        icon: "/favicon.png",
        apple: "/apple-icon.png",
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
                <body className={`${gabarito.variable} antialiased`}>
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
