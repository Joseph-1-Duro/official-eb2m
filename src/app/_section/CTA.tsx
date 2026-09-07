"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Share2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    // TODO: replace with the association's official Facebook page URL
    href: "https://www.facebook.com/ekoboy2men",
  },
  {
    label: "Instagram",
    // TODO: replace with the association's official Instagram page URL
    href: "https://www.instagram.com/ekoboy2men",
  },
];

export default function CTA() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".cta__card", containerRef.current);
      if (!cards.length) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(cards, { autoAlpha: 0, y: 24 });

      const gridTrigger = containerRef.current?.querySelector<HTMLElement>(".cta__grid");
      if (!gridTrigger) return;

      ScrollTrigger.create({
        trigger: gridTrigger,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.18,
            ease: "power2.out",
            overwrite: true,
          });
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="cta">
      <div className="cta__inner">
        <div className="cta__header">
          <h2 className="cta__title">Stay Connected With the Brotherhood</h2>
          <p className="cta__subtitle">
            Follow our activities, events and updates on social media.
          </p>
        </div>

        <div className="cta__grid">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`cta__card cta__card--${label.toLowerCase()}`}
            >
              <div className="cta__card-header">
                <Share2 aria-hidden="true" className="cta__card-icon" size={20} />
                <span>Check out our activities</span>
              </div>

              <div className="cta__card-body">
                <h3 className="cta__card-title">{label}</h3>
                <ArrowRight aria-hidden="true" className="cta__card-arrow" size={28} />
              </div>
            </Link>
          ))}

          <div className="cta__banner">
            <Image
              fill
              src="/banner.jpg"
              alt="Eko Boys To Men Association banner"
              sizes="(min-width: 80em) 80rem, 100vw"
              className="cta__banner-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}