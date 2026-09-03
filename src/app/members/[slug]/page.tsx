import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllMembers, getMemberBySlug } from "@/lib/articles";
import MdxContent from "@/ui/components/MdxContent";

export const runtime = "nodejs";

export function generateStaticParams() {
  return getAllMembers().map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const member = getMemberBySlug(slug);
  if (!member) return {};
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ekoboy2men.org";
  return {
    title: member.name,
    description: member.excerpt ?? member.role,
    openGraph: {
      title: member.name,
      description: member.excerpt ?? member.role,
      url: `${baseUrl}/members/${slug}`,
      type: "profile",
      images: member.avatar ? [{ url: member.avatar }] : undefined,
    },
    alternates: { canonical: `/members/${slug}` },
  };
}

export default async function MemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = getMemberBySlug(slug);
  if (!member) notFound();

  const hasLinkedin = Boolean(member.linkedin);

  return (
    <div className="member-bio">
      <div className="member-bio__inner">
        <Link href="/members" className="member-bio__breadcrumb">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Members
        </Link>

        <div className="member-bio__hero">
          <div className="member-bio__avatar">
            {member.avatar ? (
              <Image src={member.avatar} alt={member.name} fill loading="eager" sizes="(min-width: 1024px) 24rem, 100vw" className="member-bio__avatar-image" />
            ) : (
              <div className="member-bio__avatar-fallback">{member.name.charAt(0)}</div>
            )}
          </div>

          <div className="member-bio__header">
            <span className="member-bio__eyebrow">{member.role}</span>
            <h1 className="member-bio__name">{member.name}</h1>
            <div className="member-bio__meta">
              {member.set ? <span className="member-bio__set">Set {member.set}</span> : null}
              {hasLinkedin ? (
                <a href={member.linkedin!} target="_blank" rel="noopener noreferrer" className="member-bio__linkedin" aria-label={`${member.name} LinkedIn`}>
                  LinkedIn
                </a>
              ) : (
                <span className="member-bio__linkedin member-bio__linkedin--empty" aria-hidden="true" />
              )}
            </div>
          </div>
        </div>

        <div className="member-bio__body">
          <MdxContent source={member.body} />
        </div>

        <div className="member-bio__resources">
          <h2 className="member-bio__resources-title">Resources by this member</h2>
          <p className="member-bio__resources-empty">No items found.</p>
        </div>
      </div>
    </div>
  );
}
