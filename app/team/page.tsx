import type { Metadata } from "next";

import { Team } from "../../components/sections/Team";

export const metadata: Metadata = {
    title: "Team",
    description:
        "The students leading CodeBox — leadership, tech leads, designers, and developers building together at Cal Poly.",
};

export default function Page() {
    return <Team />;
}
