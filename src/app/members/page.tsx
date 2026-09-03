import type { Metadata } from "next";
import About from "./_section/About";
import Header from "./_section/Header";
import MemberSection from "./_section/MemberSection";

export const metadata: Metadata = {
  title: "Members",
  description:
    "Turning shared history into scholarships, mentorship and opportunity for students of Lagos Island. Meet the EkoBoys2Men brotherhood and how we transform outcomes through alumni networks.",
  openGraph: {
    title: "Members — Eko Boys To Men",
    description:
      "Turning shared history into scholarships, mentorship and opportunity for students of Lagos Island. Learn about our brotherhood and mission.",
    url: "/members",
    type: "website",
  },
  alternates: { canonical: "/members" },
};

export default function Members() {
  return (
    <>
      <Header />
      <About />
      <MemberSection />
    </>
  )
}