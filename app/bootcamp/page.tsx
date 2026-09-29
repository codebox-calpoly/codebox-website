import type { Metadata } from "next";

import { Bootcamp } from "../../components/sections/Bootcamp";

export const metadata: Metadata = {
    title: "Bootcamp Submission",
    description:
        "Submit your CodeBox bootcamp project — share your GitHub repo and deployed link.",
    alternates: { canonical: "/bootcamp" },
};

export default function Page() {
    return <Bootcamp />;
}
