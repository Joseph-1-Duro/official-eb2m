import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllActivities, getActivityBySlug, getAdjacentActivities } from "@/lib/articles";
import { formatDate } from "@/lib/format";
import MdxContent from "@/ui/components/MdxContent";
import Gallery from "@/ui/components/Gallery";
import ActivityPagination from "@/ui/components/ActivityPagination";

export const runtime = "nodejs";

export function generateStaticParams() {
  return getAllActivities().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const activity = getActivityBySlug(slug);
  if (!activity) return {};
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ekoboy2men.org";
  return {
    title: activity.title,
    description: activity.description,
    openGraph: {
      title: activity.title,
      description: activity.description,
      url: `${baseUrl}/activities/${slug}`,
      type: "article",
      images: activity.cover ? [{ url: activity.cover }] : undefined,
    },
    alternates: { canonical: `/activities/${slug}` },
  };
}

export default async function ActivityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activity = getActivityBySlug(slug);
  if (!activity) notFound();

  const { newer, older } = getAdjacentActivities(slug);


  return (
    <article className="article">
      <Link href="/activities" className="article__back">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to Activities
      </Link>

      <div className="article__header">
        <span className="article__eyebrow">{activity.category}</span>
        <h1 className="article__title">{activity.title}</h1>
        <div className="article__meta">
          <span>{activity.author}</span>
          <time dateTime={activity.date}>{formatDate(activity.date)}</time>
          <span>{activity.tags.join(" · ")}</span>
        </div>
      </div>

      <div className="article__body">
        <MdxContent source={activity.body} />
      </div>

      <Gallery images={activity.gallery} videos={activity.videos} />

      <ActivityPagination older={older} newer={newer} />
    </article>
  );
}
