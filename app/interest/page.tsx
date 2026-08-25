import type { Metadata } from "next";

import { Interest } from "../../components/sections/Interest";

export const metadata: Metadata = {
    title: "Show Interest",
    description:
        "Interested in CodeBox? Tell us a bit about yourself — no commitment required — and we'll be in touch about joining Cal Poly's software engineering club.",
    alternates: { canonical: "/interest" },
};

export default function Page() {
    return <Interest />;
}
