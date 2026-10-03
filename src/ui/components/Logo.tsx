"use client";

import Image from "next/image";
import Link from "next/link";
import logo from '../../../public/logo48.png'

type LogoProps = {
  onClick?: () => void;
};

export default function Logo({ onClick }: LogoProps) {
  return (
    <Link href="/" className="logo" onClick={onClick}>
      <Image src={logo} alt="Logo" height={48} width={48} />
    </Link>
  )
}