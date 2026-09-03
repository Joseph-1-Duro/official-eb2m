import type { Metadata } from "next";
import { getAllActivities } from "@/lib/articles";
import ActivityCard from "@/ui/components/ActivityCard";

export const metadata: Metadata = {
  title: "Activities",
  description:
    "Explore EkoBoys2Men activities — scholarships, grants, mentorship programs and community initiatives supporting Lagos Island students and residents.",
  openGraph: {
    title: "Activities — Eko Boys To Men",
    description:
      "Scholarships, grants, mentorship and community initiatives by EkoBoys2Men for Lagos Island.",
    url: "/activities",
    type: "website",
  },
  alternates: { canonical: "/activities" },
};

export default function Activities() {
  const activities = getAllActivities();

  return (
    <div className="article">
      <div className="article__header">
        <h1 className="article__title">Activities</h1>
        <p className="article__p">Scholarships, grants, mentorship and community initiatives on Lagos Island.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))", gap: "1.5rem" }}>
        {activities.map((activity) => (
          <ActivityCard key={activity.slug} activity={activity} />
        ))}
      </div>
    </div>
  );
}
