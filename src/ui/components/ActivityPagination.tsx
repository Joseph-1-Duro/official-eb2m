import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Activity } from "@/schemas/activity.schema";

type ActivityPaginationLink = Pick<Activity, "slug" | "title">;

type ActivityPaginationProps = {
  older: ActivityPaginationLink | null;
  newer: ActivityPaginationLink | null;
};

function PaginationLink({
  link,
  direction,
}: {
  link: ActivityPaginationLink;
  direction: "older" | "newer";
}) {
  const isOlder = direction === "older";
  const Icon = isOlder ? ArrowRight : ArrowLeft;

  return (
    <Link href={`/activities/${link.slug}`} className={`article__nav-link article__nav-link--${direction}`}>
      <Icon size={16} aria-hidden="true" />
      <span className="article__nav-label">{isOlder ? "Next Activity" : "Previous Activity"}</span>
      <span className="article__nav-title">{link.title}</span>
    </Link>
  );
}

export default function ActivityPagination({ older, newer }: ActivityPaginationProps) {
  if (!older && !newer) return null;

  return (
    <nav className="article__nav" aria-label="Activity navigation">
      {newer ? <PaginationLink link={newer} direction="newer" /> : <span aria-hidden="true" />}
      {older ? <PaginationLink link={older} direction="older" /> : <span aria-hidden="true" />}
    </nav>
  );
}