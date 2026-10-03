import type { Metadata } from "next";
import JoinCriteria from "./_section/JoinCriteria";

export const metadata: Metadata = {
  title: "Join",
  description:
    "Membership of Eko Boys To Men is open to men with a verifiable Lagos Island connection. Read the criteria for membership, from the N20,000 registration form to the interview and admission process.",
  openGraph: {
    title: "Join — Eko Boys To Men",
    description:
      "Read the criteria for membership of Eko Boys To Men Association, from registration to admission and presentation at the General Meeting.",
    url: "/join",
    type: "website",
  },
  alternates: { canonical: "/join" },
};

export default function Join() {
  return (
    <>
      <JoinCriteria />
      {/* Form + Checkout — future single implementations, see TODO.md */}
    </>
  );
}
