import { z } from "zod";

export const galleryItemSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
});

export const videoItemSchema = z.object({
  src: z.string().min(1),
  poster: z.string().optional(),
  title: z.string().optional(),
});

export const activitySchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string().min(1),
  author: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be an ISO date (YYYY-MM-DD)"),
  tags: z.array(z.string()).default([]),
  gallery: z.array(galleryItemSchema).optional(),
  videos: z.array(videoItemSchema).optional(),
  cover: z.string().optional(),
  coverAlt: z.string().optional(),
});

export type GalleryItem = z.infer<typeof galleryItemSchema>;
export type VideoItem = z.infer<typeof videoItemSchema>;
export type ActivityFrontmatter = z.infer<typeof activitySchema>;
export type Activity = ActivityFrontmatter & {
  slug: string;
  body: string;
  cover: string | undefined;
};
