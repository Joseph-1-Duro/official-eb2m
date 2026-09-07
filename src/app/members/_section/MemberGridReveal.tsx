"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Member } from "@/schemas/member.schema";

gsap.registerPlugin(ScrollTrigger);

type MemberGridRevealProps = {
  members: Member[];
};

/** Member cards that fade up subtly as each scrolls into view. */
export default function MemberGridReveal({ members }: MemberGridRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".member-grid__card", containerRef.current);
      if (!cards.length) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(cards, { autoAlpha: 0, y: 20 });

      ScrollTrigger.batch(cards, {
        start: "top 90%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.25,
            ease: "power2.out",
            overwrite: true,
          });
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="member-grid__list">
      {members.map((member) => (
        <Link key={member.slug} href={`/members/${member.slug}`} className="member-grid__card">
          <div className="member-grid__media">
            {member.avatar ? (
              <Image src={member.avatar} alt={member.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="member-grid__image" />
            ) : (
              <div className="member-bio__avatar-fallback">{member.name.charAt(0)}</div>
            )}
          </div>
          <div className="member-grid__body">
            <h3 className="member-grid__name">{member.name}</h3>
            <p className="member-grid__role">{member.role}</p>
            {member.set ? <span className="member-grid__set">Set {member.set}</span> : null}
          </div>
        </Link>
      ))}
    </div>
  );
}
