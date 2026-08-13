"use client";

import { Clock, Users } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

import { AnimatedSection } from "../ui/AnimatedSection";
import { CTA } from "../CTA";
import { events, type ClubEvent } from "@/data/data";

const DISCORD_INVITE_URL = "https://discord.gg/Hbj66Rcca";

const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

function parseDate(iso: string) {
    const [year, month, day] = iso.split("-").map(Number);
    return new Date(year, month - 1, day);
}

function formatPresenters(presenters: string[]) {
    if (presenters.length === 1) return presenters[0];
    return `${presenters.slice(0, -1).join(", ")} & ${presenters[presenters.length - 1]}`;
}

function EventRow({ event, index }: { event: ClubEvent; index: number }) {
    const date = parseDate(event.date);

    return (
        <AnimatedSection delay={Math.min(index * 0.05, 0.2)}>
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-12 items-end">
                <div className="w-32">
                    <div className="text-[7rem] leading-none font-extrabold bg-gradient-to-b from-accent to-accent-dark bg-clip-text text-transparent select-none">
                        {date.getDate()}
                    </div>
                    <div className="mt-2 text-2xl font-extrabold tracking-wide uppercase">
                        {MONTHS[date.getMonth()]} {date.getFullYear()}
                    </div>
                </div>
                <div className="border-b border-white/40 pb-4 md:text-right">
                    {event.tags && event.tags.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-2 md:justify-end">
                            {event.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-accent/60 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    <h3 className="text-2xl font-extrabold">{event.name}</h3>
                    {event.presenters && event.presenters.length > 0 && (
                        <p className="mt-2 flex items-center gap-2 text-white/70 md:justify-end">
                            <Users className="w-4 h-4 shrink-0" />
                            Presented by {formatPresenters(event.presenters)}
                        </p>
                    )}
                    <p className="mt-2 flex items-center gap-2 text-accent font-medium md:justify-end">
                        <Clock className="w-4 h-4 shrink-0" />
                        {event.time}
                    </p>
                </div>
            </div>
        </AnimatedSection>
    );
}

export function Events() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sorted = [...events].sort(
        (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime()
    );
    const upcoming = sorted.filter((e) => parseDate(e.date) >= today);
    const past = sorted.filter((e) => parseDate(e.date) < today).reverse();

    return (
        <div className="bg-background text-foreground">
            <section className="pt-40 pb-20">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <AnimatedSection className="text-center">
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold">
                            Events
                        </h1>
                        <p className="mt-5 text-lg text-white/60">
                            Come meet board and learn how to get involved — here&rsquo;s what&rsquo;s
                            coming up!
                        </p>
                    </AnimatedSection>

                    <AnimatedSection className="mt-24">
                        <h2 className="text-3xl sm:text-4xl font-extrabold">
                            Upcoming Events
                        </h2>
                    </AnimatedSection>

                    <div className="mt-16 flex flex-col gap-20">
                        {upcoming.length > 0 ? (
                            upcoming.map((event, i) => (
                                <EventRow
                                    key={`${event.date}-${event.name}`}
                                    event={event}
                                    index={i}
                                />
                            ))
                        ) : (
                            <AnimatedSection>
                                <p className="text-lg text-white/60">
                                    Nothing on the calendar right now — keep an
                                    eye on our Discord for what&rsquo;s next!
                                </p>
                            </AnimatedSection>
                        )}
                    </div>

                    <AnimatedSection delay={0.1} className="mt-24 text-center">
                        <p className="text-lg text-white/60">
                            Wondering where these are happening? Locations are
                            shared in our Discord!
                        </p>
                        <a
                            href={DISCORD_INVITE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-3.5 text-lg font-bold text-white transition-all duration-300 hover:bg-[var(--codebox-green-hover)] hover:scale-[1.03]">
                            <FontAwesomeIcon
                                icon={faDiscord}
                                className="w-5 h-5"
                            />
                            Join the Discord
                        </a>
                    </AnimatedSection>

                    {past.length > 0 && (
                        <>
                            <AnimatedSection className="mt-28">
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-white/60">
                                    Past Events
                                </h2>
                            </AnimatedSection>
                            <div className="mt-16 flex flex-col gap-20 opacity-50">
                                {past.map((event, i) => (
                                    <EventRow
                                        key={`${event.date}-${event.name}`}
                                        event={event}
                                        index={i}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            <CTA />
        </div>
    );
}
