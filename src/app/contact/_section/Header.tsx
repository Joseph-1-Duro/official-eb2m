"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Mail, Phone, MapPin } from "lucide-react";

const EMAIL = "info@ekoboys2men.com";
const PHONE = "+234 8162498709";
const PHONE_HREF = "tel:+2348162498709";
const ADDRESS = "3, Wilmot Close, off Ahmadu Bello Way, Victoria Island, Lagos.";
const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=3+Wilmot+Close,+Ahmadu+Bello+Way,+Victoria+Island,+Lagos";

export default function Header() {
  const containerRef = useRef<HTMLElement>(null);

  // Slide-in reveal (same pattern as the about section, horizontal)
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const items = gsap.utils.toArray<HTMLElement>(
        ".contact-header__intro, .contact-header__item",
        containerRef.current,
      );

      if (!items.length) return;

      gsap.set(items, { autoAlpha: 0, x: -32 });

      gsap.to(items, {
        autoAlpha: 1,
        x: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        overwrite: true,
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="contact-header">
      <div className="contact-header__inner">
        <div className="contact-header__intro">
          <span className="contact-header__eyebrow">Get in touch</span>
          <h1 className="contact-header__title">Contact Us</h1>
          <p className="contact-header__copy">Email, Call or Fill the form to reach out.</p>
          <p className="contact-header__copy">We would love to hear from you.</p>
        </div>

        <ul className="contact-header__channels">
          <li className="contact-header__item">
            <Mail size={20} aria-hidden="true" className="contact-header__icon" />
            <a href={`mailto:${EMAIL}`} className="contact-header__link">
              {EMAIL}
            </a>
          </li>
          <li className="contact-header__item">
            <Phone size={20} aria-hidden="true" className="contact-header__icon" />
            <a href={PHONE_HREF} className="contact-header__link">
              {PHONE}
            </a>
          </li>
          <li className="contact-header__item">
            <MapPin size={20} aria-hidden="true" className="contact-header__icon" />
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-header__link"
            >
              {ADDRESS}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}