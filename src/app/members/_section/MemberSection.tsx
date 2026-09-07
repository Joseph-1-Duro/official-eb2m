import { getAllMembers } from "@/lib/articles";
import MemberGridReveal from "./MemberGridReveal";

export default function MemberSection() {
  const members = getAllMembers();

  if (members.length === 0) return null;

  return (
    <section id="members" className="member-grid">
      <div className="member-grid__inner">
        <h2 className="member-grid__title">Meet the faces of EB2M</h2>

        <MemberGridReveal members={members} />
      </div>
    </section>
  );
}
