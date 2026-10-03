import { z } from "zod";

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "date must be an ISO date (YYYY-MM-DD)");

export const eventSchema = z.object({
  title: z.string().min(3),
  summary: z.string().min(10),
  /** The day it happens — an event drops out of the section once this passes. */
  date: isoDate,
  /** Local start/end time, kept as display strings ("10:00"). No TZ math. */
  time: z.string().optional(),
  endTime: z.string().optional(),
  venue: z.string().optional(),
  cover: z.string().optional(),
  coverAlt: z.string().optional(),
});

export type EventFrontmatter = z.infer<typeof eventSchema>;
export type Event = EventFrontmatter & {
  slug: string;
  body: string;
};