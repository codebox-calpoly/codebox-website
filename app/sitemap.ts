import type { MetadataRoute } from "next";

const BASE_URL = "https://codebox.so";

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    const routes: { path: string; priority: number }[] = [
        { path: "/", priority: 1 },
        { path: "/about", priority: 0.9 },
        { path: "/projects", priority: 0.9 },
        { path: "/events", priority: 0.9 },
        { path: "/join", priority: 0.9 },
        { path: "/team", priority: 0.8 },
        { path: "/interest", priority: 0.8 },
    ];

    return routes.map(({ path, priority }) => ({
        url: `${BASE_URL}${path}`,
        lastModified,
        changeFrequency: "weekly",
        priority,
    }));
}
