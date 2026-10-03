import { z } from "zod";

/**
 * Listing precedence for the members grid — the first entry renders first.
 * Only the order here is semantic; the strings themselves are display labels
 * written verbatim to the member card, so new offices can be added to content
 * without touching this list (unranked titles fall to the end, alphabetically).
 */
export const MEMBER_POSITION_ORDER = [
  "President",
  "Vice President",
  "General Secretary",
  "Assistant General Secretary",
  "Treasurer",
  "Financial Secretary",
  "Publicity Secretary",
  "Chairman, Welfare & Membership Committee",
  "Trustee",
] as const;

export const memberPositionSchema = z.string().min(3);

export const memberSchema = z.object({
  name: z.string().min(3),
  role: z.string().min(3),
  /** EB2M office — distinct from the professional `role`. */
  position: memberPositionSchema.optional(),
  set: z.string().optional(),
  avatar: z.string().optional(),
  linkedin: z.string().url().or(z.literal("")).optional(),
  excerpt: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

/** Rank of a position in MEMBER_POSITION_ORDER; unranked/unset → last. */
export function memberPositionRank(position?: string): number {
  const index = MEMBER_POSITION_ORDER.indexOf(position as (typeof MEMBER_POSITION_ORDER)[number]);
  return index === -1 ? MEMBER_POSITION_ORDER.length : index;
}

export type MemberFrontmatter = z.infer<typeof memberSchema>;
export type Member = MemberFrontmatter & {
  slug: string;
  body: string;
};
