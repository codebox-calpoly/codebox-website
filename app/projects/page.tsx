import type { Metadata } from "next";

import { Projects } from "../../components/sections/Projects";

export const metadata: Metadata = {
    title: "Projects",
    description:
        "Web and mobile products ideated, designed, and developed by Cal Poly students — Mustang Maps, Poly Problems, Poly Pages, and more.",
    alternates: { canonical: "/projects" },
};

export default function Page() {
    return <Projects />;
}
