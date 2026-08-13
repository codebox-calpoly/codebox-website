import type { Metadata } from "next";

import { Events } from "@/components/sections/Events";

export const metadata: Metadata = {
    title: "Events",
    description:
        "Upcoming CodeBox events — club chats, fairs, and interest meetings.",
};

export default function Page() {
    return <Events />;
}
