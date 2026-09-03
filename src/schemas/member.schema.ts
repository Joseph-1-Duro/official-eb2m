import { z } from "zod";

export const memberSchema = z.object({
  name: z.string().min(3),
  role: z.string().min(3),
  set: z.string().optional(),
  avatar: z.string().optional(),
  linkedin: z.string().url().or(z.literal("")).optional(),
  excerpt: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type MemberFrontmatter = z.infer<typeof memberSchema>;
export type Member = MemberFrontmatter & {
  slug: string;
  body: string;
};
