import type { MetadataRoute } from "next";
import { getAllActivities, getAllMembers } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const activities = getAllActivities();

  // Content-derived lastmod — the newest activity date drives `/` (Recent
  // Activities section) and `/activities`. Routes with no content date omit
  // `lastModified` instead of claiming a fresh modification on every build.
  const latestActivityDate = activities.reduce((latest, a) => (a.date > latest ? a.date : latest), "");
  const lastModified = latestActivityDate ? new Date(latestActivityDate) : undefined;

  const staticRoutes = [
    { url: SITE_URL, lastModified, changeFrequency: "monthly" as const, priority: 1 as const },
    { url: `${SITE_URL}/members`, changeFrequency: "monthly" as const, priority: 0.8 as const },
    { url: `${SITE_URL}/activities`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 as const },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly" as const, priority: 0.7 as const },
  ];

  const activityRoutes = activities.map((a) => ({
    url: `${SITE_URL}/activities/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "weekly" as const,
    priority: 0.7 as const,
  }));

  const memberRoutes = getAllMembers().map((m) => ({
    url: `${SITE_URL}/members/${m.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6 as const,
  }));

  return [...staticRoutes, ...activityRoutes, ...memberRoutes];
}
