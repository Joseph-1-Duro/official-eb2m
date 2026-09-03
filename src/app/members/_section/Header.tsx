"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Quote } from "lucide-react";

export default function Header() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const lines = gsap.utils.toArray<HTMLElement>(".members-header__line, .members-header__accent", containerRef.current);

      if (!lines.length) return;

      gsap.set(lines, { autoAlpha: 0, y: 32 });

      gsap.to(lines, {
        autoAlpha: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.18,
        ease: "power3.out",
        overwrite: true,
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="members-header">
      <div className="members-header__inner">
        <h1 className="members-header__title">
          <Quote />
          <span className="members-header__line">Turning shared history</span>
          <span className="members-header__line">into scholarships, mentorship,</span>
          <span className="members-header__line">and opportunity</span>
          <span className="members-header__accent">for students of Lagos Island.</span>
        </h1>
      </div>
    </section>
  );
}
