import Link from "next/link";
import { getUpcomingEvents } from "@/lib/articles";
import MdxContent from "@/ui/components/MdxContent";
import UpcomingEventsReveal from "./UpcomingEventsReveal";

/** How many events after the featured one are listed. Anything beyond this
 *  needs a dedicated /events route — see TODO.md. */
const LIST_LIMIT = 3;

export default function UpcomingEvents() {
  const events = getUpcomingEvents();

  // Cap here rather than in the client component, so events we never render
  // don't get serialised into the RSC payload.
  const [featured, ...rest] = events;
  const list = rest.slice(0, LIST_LIMIT);

  // MDX is server-only, so the article is rendered here and handed to the
  // client component as a slot for its <details> disclosure.
  const article = featured?.body.trim() ? <MdxContent source={featured.body} /> : null;

  return (
    <section id="upcoming-events" className="upcoming-events">
      <div className="upcoming-events__inner">
        <div className="upcoming-events__intro">
          <span className="upcoming-events__eyebrow">Upcoming events</span>
          <h2 className="upcoming-events__title">Mark your calendar</h2>
        </div>

        {!featured ? (
          <div className="upcoming-events__empty">
            <p className="upcoming-events__empty-note">
              No events scheduled yet. Our past work is in Activities.
            </p>
            <div className="upcoming-events__empty-links">
              <Link href="/activities" className="upcoming-events__link">
                Browse activities
              </Link>
              <Link href="/contact" className="upcoming-events__link">
                Contact the association
              </Link>
            </div>
          </div>
        ) : (
          <UpcomingEventsReveal featured={featured} list={list} article={article} />
        )}
      </div>
    </section>
  );
}