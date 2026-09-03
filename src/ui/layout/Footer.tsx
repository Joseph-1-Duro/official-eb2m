import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__tagline">
          <p className="footer__text">Building a stronger Lagos Island, one EkoBoy at a time.</p>
          <p className="footer__text">EkoBoys2Men — Together 4 Ever.</p>
        </div>
        <ul className="footer__nav">
          <li className="footer__nav-item">
            <ArrowUpRight aria-hidden="true" className="footer__arrow" size={20} />
            <Link href={"/"} className="footer__link">Home</Link>
          </li>
          <li className="footer__nav-item">
            <ArrowUpRight aria-hidden="true" className="footer__arrow" size={20} />
            <Link href="/activities" className="footer__link">Activities</Link>
          </li>
          <li className="footer__nav-item">
            <ArrowUpRight aria-hidden="true" className="footer__arrow" size={20} />
            <Link href="/members" className="footer__link">Members</Link>
          </li>
          <li className="footer__nav-item">
            <ArrowUpRight aria-hidden="true" className="footer__arrow" size={20} />
            <Link href="/contact" className="footer__link">Contact</Link>
          </li>
        </ul>
        <div>
          <p className="footer__brand">EkoBoy2Men</p>
          <p className="footer__copy">©{new Date().getFullYear()} Eko Boys To Men Association. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}