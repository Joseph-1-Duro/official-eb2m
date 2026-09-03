import Image from "next/image";
import Link from "next/link";
import type { Activity } from "@/schemas/activity.schema";
import { formatDate } from "@/lib/format";

type ActivityCardProps = {
  activity: Activity;
};

export default function ActivityCard({ activity }: ActivityCardProps) {
  const { slug, title, description, date, category, cover } = activity;
  const coverAlt = activity.coverAlt ?? activity.gallery?.[0]?.alt ?? title;

  return (
    <Link href={`/activities/${slug}`} className="activity-card">
      {cover ? (
        <div className="activity-card__media">
          <Image src={cover} alt={coverAlt} width={640} height={400} sizes="(min-width: 1024px) 33vw, 50vw" className="activity-card__image" />
        </div>
      ) : null}
      <div className="activity-card__body">
        <span className="activity-card__category">{category}</span>
        <h3 className="activity-card__title">{title}</h3>
        <p className="activity-card__excerpt">{description}</p>
        <time className="activity-card__date" dateTime={date}>
          {formatDate(date)}
        </time>
      </div>
    </Link>
  );
}
