"use client";

import Link from "next/link";
import { type Dispatch, type SetStateAction, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const links = [
  { href: "/", label: "Home" },
  { href: "/activities", label: "Activities" },
  { href: "/members", label: "Members" },
];

type NavbarProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Navbar({ open, setOpen }: NavbarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // close navbar on window resize
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 48em)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    mql.addEventListener("change", onChange);
    window.addEventListener("resize", onResize);
    return () => {
      mql.removeEventListener("change", onChange);
      window.removeEventListener("resize", onResize);
    };
    // setOpen is a stable useState setter, so this only ever runs once on mount.
  }, [setOpen]);

  // kills overflow on the Y axis
  useEffect(() => {
    const html = document.documentElement;
    if (open) {
      const prevHtml = html.style.overflow;
      const prevBody = document.body.style.overflow;
      html.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      return () => {
        html.style.overflow = prevHtml;
        document.body.style.overflow = prevBody;
      };
    } else {
      html.style.overflow = "";
      document.body.style.overflow = "";
    }
  }, [open]);

  // slide the mobile menu down/up — GSAP drives height so the close animates too
  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = !window.matchMedia("(min-width: 48em)").matches;

      // desktop nav never collapses — clear any inline mobile styles
      if (!isMobile) {
        gsap.set(nav, { clearProps: "all" });
        return;
      }

      if (open) {
        gsap.set(nav, { display: "flex" });
        if (reduced) {
          gsap.set(nav, { height: "auto", autoAlpha: 1 });
          return;
        }
        gsap.fromTo(
          nav,
          { height: 0, autoAlpha: 0 },
          { height: "auto", autoAlpha: 1, duration: 0.3, ease: "power2.out", overwrite: true },
        );
        const items = gsap.utils.toArray<HTMLElement>(".navbar__item", containerRef.current);
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.08, ease: "power2.out", overwrite: true },
        );
      } else {
        // already hidden (e.g. first mount) — nothing to animate
        if (gsap.getProperty(nav, "display") === "none") return;
        if (reduced) {
          gsap.set(nav, { display: "none", autoAlpha: 0, height: 0 });
          return;
        }
        gsap.to(nav, {
          height: 0,
          autoAlpha: 0,
          duration: 0.25,
          ease: "power2.in",
          overwrite: true,
          onComplete: () => gsap.set(nav, { display: "none" }),
        });
      }
    },
    { dependencies: [open], scope: containerRef },
  );

  return (
    <div ref={containerRef} className="navbar-wrap">
      <button
        className="navbar__toggle"
        aria-expanded={open}
        aria-controls="primary-nav"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav id="primary-nav" ref={navRef} className="navbar" aria-label="Primary">
        <ul className="navbar__list">
          {links.map((link) => (
            <li key={link.href} className="navbar__item">
              <Link href={link.href} className="navbar__link" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
          <li className="navbar__item navbar__item--cta">
            <Link href="/contact" className="navbar__link navbar__link--cta" onClick={() => setOpen(false)}>
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
