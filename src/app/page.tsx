import type { Metadata } from "next";
import Marquee from "@/ui/components/Marquee";
import Hero from "./_section/Hero";
import Mission from "./_section/Mission";
import Activities from "./_section/Activities";

export const metadata: Metadata = {
  title: "Eko Boys To Men Association — Together 4 Ever",
  description:
    "We mobilize resources, mentorship and collective standing of Eko Boys alumni to meet essential needs of Lagos Island residents, especially students, through sustained funding and educational grants.",
  openGraph: {
    title: "Eko Boys To Men Association — Together 4 Ever",
    description:
      "We mobilize resources, mentorship and collective standing of Eko Boys alumni to meet essential needs of Lagos Island residents, especially students.",
    url: "/",
    type: "website",
  },
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Mission />
      <Marquee />
      <Activities />
    </>
  )
}