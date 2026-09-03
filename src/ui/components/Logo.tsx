"use client";

import Link from "next/link";

type LogoProps = {
  onClick?: () => void;
};

export default function Logo({ onClick }: LogoProps) {
  return (
    <Link href="/" className="logo" onClick={onClick}>
      <span className="logo__mark">E</span>
      <span className="logo__text">
        <span className="logo__text--primary">EB2M</span>
        <span className="logo__text--accent">Together4Ever</span>
      </span>
    </Link>
  )
}