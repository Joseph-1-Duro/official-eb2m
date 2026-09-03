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

  // gsap animation to hero section
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!open) return;

      const items = gsap.utils.toArray<HTMLElement>(".navbar__item", containerRef.current);
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.08, ease: "power2.out", overwrite: true },
      );
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

      <nav id="primary-nav" className={`navbar ${open ? "navbar--open" : ""}`} aria-label="Primary">
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
