import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { activitySchema, type Activity } from "@/schemas/activity.schema";
import { memberSchema, type Member } from "@/schemas/member.schema";

const activitiesDir = path.join(process.cwd(), "src/content/activities");
const membersDir = path.join(process.cwd(), "src/content/members");

function getSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

function readMdx(filePath: string): { data: Record<string, unknown>; content: string } {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { data, content };
}

/** Resolves the .mdx/.md file path for a slug, or null if it doesn't exist. */
function resolveMdxPath(dir: string, slug: string): string | null {
  const filePath = path.join(dir, `${slug}.mdx`);
  if (fs.existsSync(filePath)) return filePath;
  const altPath = path.join(dir, `${slug}.md`);
  return fs.existsSync(altPath) ? altPath : null;
}

export const getAllActivities = cache(
  function getAllActivitiesInner(): Activity[] {
    const activities = getSlugs(activitiesDir).map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const { data, content } = readMdx(path.join(activitiesDir, file));
      const parsed = activitySchema.parse(data);
      const cover = parsed.cover ?? parsed.gallery?.[0]?.src;
      return { slug, body: content, ...parsed, cover };
    });

    return activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },
);

export function getActivityBySlug(slug: string): Activity | null {
  const filePath = resolveMdxPath(activitiesDir, slug);
  if (!filePath) return null;
  const { data, content } = readMdx(filePath);
  const parsed = activitySchema.parse(data);
  const cover = parsed.cover ?? parsed.gallery?.[0]?.src;
  return { slug, body: content, ...parsed, cover };
}

export const getAllMembers = cache(
  function getAllMembersInner(): Member[] {
    const members: Member[] = [];

    for (const file of getSlugs(membersDir)) {
      const slug = file.replace(/\.mdx?$/, "");
      const { data, content } = readMdx(path.join(membersDir, file));
      const parsed = memberSchema.safeParse(data);

      // Skip empty/invalid drafts (e.g. a placeholder file with no frontmatter yet)
      if (!parsed.success) {
        console.warn(`[members] Skipping "${file}" — invalid frontmatter:`, parsed.error.issues[0]?.message);
        continue;
      }

      members.push({ slug, body: content, ...parsed.data });
    }

    return members;
  },
);

export function getMemberBySlug(slug: string): Member | null {
  const filePath = resolveMdxPath(membersDir, slug);
  if (!filePath) return null;
  const { data, content } = readMdx(filePath);
  const parsed = memberSchema.parse(data);
  return { slug, body: content, ...parsed };
}

/** Returns the most recent activities, newest first. */
export function getRecentActivities(count = 3): Activity[] {
  return getAllActivities().slice(0, count);
}

type AdjacentActivities = {
  newer: Pick<Activity, "slug" | "title"> | null;
  older: Pick<Activity, "slug" | "title"> | null;
};

/** Returns the activities published immediately before/after the given one
 *  (list is sorted newest first), or null when at either end. */
export function getAdjacentActivities(slug: string): AdjacentActivities {
  const activities = getAllActivities();
  const index = activities.findIndex((a) => a.slug === slug);
  if (index === -1) return { newer: null, older: null };

  return {
    newer: index > 0 ? { slug: activities[index - 1].slug, title: activities[index - 1].title } : null,
    older:
      index < activities.length - 1
        ? { slug: activities[index + 1].slug, title: activities[index + 1].title }
        : null,
  };
}
