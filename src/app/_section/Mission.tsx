"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, ArrowDownLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Mission() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const wraps = gsap.utils.toArray<HTMLElement>(".mission__standalone-wrap", containerRef.current);
      if (!wraps.length) return;

      gsap.set(wraps, { x: -32, autoAlpha: 0 });

      const panelsTrigger = containerRef.current?.querySelector<HTMLElement>(".mission__panels");
      if (!panelsTrigger) return;

      ScrollTrigger.create({
        trigger: panelsTrigger,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(wraps, {
            x: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.18,
            ease: "power3.out",
            overwrite: true,
          });
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="mission">
      <div className="mission__inner">
        <div className="mission__panels">
          <div className="mission__panel">
            <div className="mission__standalone-wrap">
              <Quote aria-hidden="true" className="mission__quote" />
              <h3 className="mission__standalone">A home to return to, a network to lean on.</h3>
            </div>

            <div className="mission__copy">
              <ArrowDownLeft aria-hidden="true" className="mission__arrow" size={32} />
              <p className="mission__text">
                EkoBoys2Men exists to mobilize the resources, mentorship, and collective standing of our alumni to meet the essential needs of
                Lagos Island residents, particularly students, through sustained funding and educational grants. We sustain the bond of
                brotherhood formed in school by connecting old boys across generations, supporting one another&apos;s growth, and directing that
                support back toward the community and institution that shaped us.
              </p>
            </div>
          </div>

          <div className="mission__divider" aria-hidden="true" />

          <div className="mission__panel">
            <div className="mission__standalone-wrap">
              <Quote aria-hidden="true" className="mission__quote" />
              <h3 className="mission__standalone">Every EkoBoy, connected, growing, giving back.</h3>
            </div>

            <div className="mission__copy">
              <ArrowDownLeft aria-hidden="true" className="mission__arrow" size={32} />
              <p className="mission__text">
                To be recognized as the strongest and most active old boys&apos; network from our school — a brotherhood in which every EkoBoy,
                regardless of distance or years passed, remains connected, continues to grow, and helps rebuild the future of Lagos Island for
                the generations that follow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
