"use client";

import Image from "next/image";
import Link from "next/link";
import logo from '../../../public/logo32.png'

type LogoProps = {
  onClick?: () => void;
};

export default function Logo({ onClick }: LogoProps) {
  return (
    <Link href="/" className="logo" onClick={onClick}>
    {/* <span className="logo__mark">E</span>
      <span className="logo__text">
        <span className="logo__text--primary">EB2M</span>
      // </span> */}
      <Image src={logo} alt="Logo" height={32} width={32} />
    </Link>
  )
}