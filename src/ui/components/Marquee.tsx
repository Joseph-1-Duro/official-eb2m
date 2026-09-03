"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.to(trackRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 30,
      ease: "none"
    })
  }, {scope: marqueeRef})

  return (
    <div ref={marqueeRef} aria-hidden className="marquee">
      <div ref={trackRef} className="track">
        <p>- Rebuilding the future of Lagos</p>
        <p>- Rebuilding the future of Lagos</p>
      </div>
    </div>
  )
}