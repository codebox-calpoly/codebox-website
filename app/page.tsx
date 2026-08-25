import type { Metadata } from "next";

import { Home } from "../components/sections/Home";
import { faqs } from "@/data/data";

export const metadata: Metadata = {
    alternates: { canonical: "/" },
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
        },
    })),
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqJsonLd),
                }}
            />
            <Home />
        </>
    );
}
