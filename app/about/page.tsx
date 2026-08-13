import type { Metadata } from "next";

import { About } from "../../components/sections/About";

export const metadata: Metadata = {
    title: "About",
    description:
        "Meet CodeBox — Cal Poly's student-run software engineering club, turning student ideas into real products every year.",
};

export default function Page() {
    return <About />;
}
