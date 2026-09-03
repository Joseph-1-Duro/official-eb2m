import Image from "next/image";
import Link from "next/link";
import { getAllMembers } from "@/lib/articles";

export default function MemberSection() {
  const members = getAllMembers();

  if (members.length === 0) return null;

  return (
    <section className="member-grid">
      <div className="member-grid__inner">
        <h2 className="member-grid__title">Meet the faces of EB2M</h2>

        <div className="member-grid__list">
          {members.map((member) => (
            <Link key={member.slug} href={`/members/${member.slug}`} className="member-grid__card">
              <div className="member-grid__media">
                {member.avatar ? (
                  <Image src={member.avatar} alt={member.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="member-grid__image" />
                ) : (
                  <div className="member-bio__avatar-fallback">{member.name.charAt(0)}</div>
                )}
              </div>
              <div className="member-grid__body">
                <h3 className="member-grid__name">{member.name}</h3>
                <p className="member-grid__role">{member.role}</p>
                {member.set ? <span className="member-grid__set">Set {member.set}</span> : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
