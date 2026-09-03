import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getRecentActivities } from "@/lib/articles";
import ActivityCard from "@/ui/components/ActivityCard";

export default function Activities() {
  const activities = getRecentActivities();

  if (activities.length === 0) return null;

  return (
    <section className="activities">
      <div className="activities__inner">
        <div className="activities__header">
          <h2 className="activities__title">Recent Activities</h2>
          <Link href="/activities" className="activities__link">
            View all
            <ArrowRight size={16} aria-hidden="true" className="activities__link-icon" />
          </Link>
        </div>

        <div className="activities__grid">
          {activities.map((activity) => (
            <div key={activity.slug} className="activities__item">
              <ActivityCard activity={activity} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
