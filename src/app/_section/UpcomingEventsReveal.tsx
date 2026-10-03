"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import type { Event } from "@/schemas/event.schema";
import { parseIsoDate } from "@/lib/date";

gsap.registerPlugin(ScrollTrigger);

type UpcomingEventsRevealProps = {
  /** The next event — rendered large. */
  featured: Event;
  /** What follows it, already capped by the server section. */
  list: Event[];
  /** The featured event's article, rendered on the server (MDX is RSC-only)
   *  and revealed by a native <details> disclosure. Null when it has none. */
  article: ReactNode;
};

/** "10:00 · Lagos Island" — empty when neither field is set. */
function metaLine(event: Event): string {
  return [event.time, event.venue].filter(Boolean).join(" · ");
}

/** The next event, featured; the ones after it as a quiet ruled list. */
export default function UpcomingEventsReveal({ featured, list, article }: UpcomingEventsRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const featuredDate = parseIsoDate(featured.date);
  const featuredMeta = metaLine(featured);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-reveal]", containerRef.current);
      if (!rows.length) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(rows, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(rows, { autoAlpha: 0, y: 20 });

      ScrollTrigger.batch(rows, {
        start: "top 90%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power2.out",
            overwrite: true,
          });
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="upcoming-events__body">
      <article className="upcoming-events__featured" data-reveal>
        <div className="upcoming-events__date">
          <span className="upcoming-events__date-day">{featuredDate.day}</span>
          <span className="upcoming-events__date-month">{featuredDate.month}</span>
          <span className="upcoming-events__date-year">{featuredDate.year}</span>
        </div>

        <div className="upcoming-events__featured-body">
          <h3 className="upcoming-events__featured-title">{featured.title}</h3>

          {featuredMeta ? <p className="upcoming-events__meta">{featuredMeta}</p> : null}

          <p className="upcoming-events__summary">{featured.summary}</p>

          {article ? (
            <details className="upcoming-events__details">
              <summary className="button button--primary upcoming-events__details-toggle">
                Details
                <ChevronDown aria-hidden="true" size={16} />
              </summary>
              <div className="upcoming-events__article">{article}</div>
            </details>
          ) : null}
        </div>
      </article>

      {list.length > 0 ? (
        <ul className="upcoming-events__list">
          {list.map((event) => {
            const { day, month, year } = parseIsoDate(event.date);
            const meta = metaLine(event);

            return (
              <li key={event.slug} className="upcoming-events__row" data-reveal>
                <span className="upcoming-events__row-date">
                  <span className="upcoming-events__row-day">{day}</span>
                  <span className="upcoming-events__row-month">{month}</span>
                  <span className="upcoming-events__row-year">{year}</span>
                </span>

                <span className="upcoming-events__row-title">{event.title}</span>

                {meta ? <span className="upcoming-events__row-meta">{meta}</span> : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}