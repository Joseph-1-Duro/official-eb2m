import type { Metadata } from "next";
import Header from "./_section/Header";
import ContactForm from "./_section/ContactForm";
import MapUI from "./_section/MapUI";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Eko Boys To Men Association — connect with our alumni network, ask about scholarships, partnerships or community support for Lagos Island.",
  openGraph: {
    title: "Contact — Eko Boys To Men",
    description: "Contact Eko Boys To Men Association for scholarships, partnerships and community support.",
    url: "/contact",
    type: "website",
  },
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <Header />
      {/* space-7 handled by section padding */}
      <ContactForm />
      <MapUI />
    </>
  );
}