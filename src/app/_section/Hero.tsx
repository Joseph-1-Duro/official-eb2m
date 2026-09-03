"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const q = gsap.utils.selector(containerRef);
      const textTargets = q("h1, .motto, .hero__text p, .hero__cta");
      const media = q(".hero__media");

      gsap.set(textTargets, { autoAlpha: 0, y: 24 });
      gsap.set(media, { autoAlpha: 0, clipPath: "inset(0 0 100% 0)" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(textTargets, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
      }).to(
        media,
        {
          autoAlpha: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.0,
          ease: "power2.out",
        },
        "-=0.5",
      );
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="hero">
      <div className="hero__inner">
        <div className="hero__text">
          <h1>
            Eko Boys <br /> To Men Association
          </h1>
          <h4 className="motto">Together 4 ever</h4>
          <p>
            We are an association of distinguished individuals committed to mobilizing resources to support essential needs for Lagos Island residents, particularly students, through sustained funding
            and educational grants.
          </p>
          <Link href="/members" className="hero__cta">
            Discover Our Platform
            <ArrowUpRight aria-hidden size={16} />
          </Link>
        </div>

        <div className="hero__media">
          <Image
            fill
            src="/hero-bg.jpg"
            alt="Members of Eko Boys to Men Association"
            loading="eager"
            sizes="100vw"
            className="hero__image"
          />
        </div>
      </div>
    </section>
  );
}
