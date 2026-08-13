import type { Metadata } from "next";

import { Join } from "@/components/sections/Join";

export const metadata: Metadata = {
    title: "Join",
    description:
        "Join CodeBox — explore our team positions and how to get involved.",
};

export default function Page() {
    return <Join />;
}
