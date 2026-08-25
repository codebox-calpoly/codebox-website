import type { Metadata } from "next";

import { Events } from "@/components/sections/Events";
import { events } from "@/data/data";

export const metadata: Metadata = {
    title: "Events",
    description:
        "Upcoming CodeBox events — club chats, fairs, and interest meetings.",
    alternates: { canonical: "/events" },
};

/** "3:30 PM" → "15:30:00" */
function to24Hour(time: string): string | null {
    const match = time.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM)/i);
    if (!match) return null;
    let hours = parseInt(match[1], 10) % 12;
    if (match[3].toUpperCase() === "PM") hours += 12;
    const minutes = match[2] ?? "00";
    return `${String(hours).padStart(2, "0")}:${minutes}:00`;
}

// Cal Poly is Pacific time; current events fall within PDT (UTC-7).
const TZ_OFFSET = "-07:00";

const eventsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: events.map((event, i) => {
        const [startRaw, endRaw] = event.time.split(/[–-]/);
        const startTime = to24Hour(startRaw ?? "");
        const endTime = endRaw ? to24Hour(endRaw) : null;

        return {
            "@type": "ListItem",
            position: i + 1,
            item: {
                "@type": "Event",
                name: event.name,
                startDate: startTime
                    ? `${event.date}T${startTime}${TZ_OFFSET}`
                    : event.date,
                ...(endTime && {
                    endDate: `${event.date}T${endTime}${TZ_OFFSET}`,
                }),
                eventAttendanceMode:
                    "https://schema.org/OfflineEventAttendanceMode",
                eventStatus: "https://schema.org/EventScheduled",
                location: {
                    "@type": "Place",
                    name: "California Polytechnic State University",
                    address: {
                        "@type": "PostalAddress",
                        addressLocality: "San Luis Obispo",
                        addressRegion: "CA",
                        addressCountry: "US",
                    },
                },
                organizer: {
                    "@type": "Organization",
                    name: "CodeBox",
                    url: "https://codebox.so",
                },
                ...(event.presenters && {
                    performer: event.presenters.map((name) => ({
                        "@type": "Person",
                        name,
                    })),
                }),
            },
        };
    }),
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(eventsJsonLd),
                }}
            />
            <Events />
        </>
    );
}
