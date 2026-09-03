import type { MetadataRoute } from "next";
import { getAllActivities, getAllMembers } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ekoboy2men.org";
  const now = new Date();

  const routes = ["", "/members", "/activities", "/contact"] as const;
  const staticRoutes = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : route === "/members" ? 0.8 : 0.7,
  }));

  const activities = getAllActivities().map((a) => ({
    url: `${baseUrl}/activities/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "weekly" as const,
    priority: 0.7 as const,
  }));

  const members = getAllMembers().map((m) => ({
    url: `${baseUrl}/members/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6 as const,
  }));

  return [...staticRoutes, ...activities, ...members];
}
