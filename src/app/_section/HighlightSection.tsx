"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Highlight = {
  src: string;
  alt: string;
  width: number;
  height: number;
  wide?: boolean;
};

const HIGHLIGHTS: Highlight[] = [
  {
    src: "/highlights/highlight-1.jpg",
    alt: "Schoolgirls and visiting dignitaries gathered in front of the Eko Boys To Men water purification tanks donated to Boys Academy",
    width: 720,
    height: 1280,
  },
  {
    src: "/highlights/highlight-2.jpg",
    alt: "Eko Boys To Men members inspecting the installed water purification system during the commissioning",
    width: 720,
    height: 1280,
  },
  {
    src: "/highlights/highlight-3.jpg",
    alt: "Students gathered around the new water dispensing point as a member addresses them",
    width: 720,
    height: 1280,
  },
  {
    src: "/highlights/highlight-4.jpg",
    alt: "Students seated during the Mentoring & Shaping The Future Leaders workshop",
    width: 720,
    height: 1280,
  },
  {
    src: "/highlights/highlight-5.jpg",
    alt: "Eko Boys To Men members and guests posing for a group photo at the water project commissioning",
    width: 1280,
    height: 720,
    wide: true,
  },
];

const HighlightSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", containerRef.current);
      if (!items.length) return;

      gsap.set(items, { autoAlpha: 0, y: 24 });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(items, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            overwrite: true,
          });
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="highlights" aria-labelledby="highlights-title">
      <div className="highlights__inner">
        <div className="highlights__intro" data-reveal>
          <p className="highlights__eyebrow">Who we are</p>
          <h2 id="highlights-title" className="highlights__title">
            Our Vision &amp; Mission
          </h2>
        </div>

        <div className="highlights__grid">
          <article className="highlights__card highlights__card--vision" data-reveal>
            <h3 className="highlights__card-title">Our Vision</h3>
            <p className="highlights__card-text">
              To build a united and empowered Lagos Island community through education, leadership, and service.
            </p>
          </article>

          <article className="highlights__card highlights__card--mission" data-reveal>
            <h3 className="highlights__card-title">Our Mission</h3>
            <p className="highlights__card-text">
              To engage and uplift boys and men on Lagos Island through innovative programs that drive growth, leadership and community impact.
            </p>
          </article>

          {HIGHLIGHTS.map((highlight) => (
            <figure
              key={highlight.src}
              className={highlight.wide ? "highlights__media highlights__media--wide" : "highlights__media"}
              data-reveal
            >
              <Image
                src={highlight.src}
                alt={highlight.alt}
                width={highlight.width}
                height={highlight.height}
                sizes={highlight.wide ? "(min-width: 768px) 90vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                className="highlights__image"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightSection;
