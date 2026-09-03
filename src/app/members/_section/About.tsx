import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function About() {
  return (
    <section className="members-about">
      <div className="members-about__inner">
        <div className="members-about__header">
          <h2 className="members-about__title">About us</h2>
          <p className="members-about__copy">
            At Ekoboys2Men, we are redefining what an alumni network can do for Lagos Island with unmatched community credibility, replacing
            scattered goodwill with organized, lasting support — so opportunity reaches more students, more reliably.
          </p>
        </div>

        <div className="members-about__body">
          <div className="members-about__spacer" aria-hidden="true" />
          <div className="members-about__main">
            <p className="members-about__copy--offset">
              Our mission is to transform outcomes for students of Lagos Island by making every year of support count. We harness alumni
              networks, mentorship, and funding to enable scholarships and grants that remove real barriers to education. We&apos;re here to not
              just give back, but build lasting change for the community that raised us.
            </p>
            <Link href="/activities" className="members-about__cta">
              Check our activities
              <ArrowUpRight aria-hidden="true" size={16} className="members-about__cta-icon" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
