"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";
import { ArrowUpRight } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <Logo onClick={closeMenu} />
      <Navbar open={open} setOpen={setOpen} />
      <Link href="/contact" className="site-header__cta" onClick={closeMenu}>
        Contact Us
        <ArrowUpRight aria-hidden size={16} />
      </Link>
    </header>
  )
}