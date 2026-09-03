import type { Metadata } from "next";
import '@/styles/main.scss'
import Header from "@/ui/layout/Header";
import Footer from "@/ui/layout/Footer";
import { jakartaFont, playFont } from "@/ui/fonts";
import ScrollToTop from "@/ui/components/ScrollToTop";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ekoboy2men.org";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Eko Boys To Men Association",
    template: "%s — Eko Boys To Men",
  },
  description:
    "EkoBoys2Men is an old school association of illustrious men devoted to mobilizing resources for residents of Lagos Island, especially students.",
  keywords: ["EkoBoys2Men", "Eko Boys To Men", "old school association", "alumni", "Lagos Island", "education", "community development"],
  openGraph: {
    siteName: "Eko Boys To Men Association",
    type: "website",
    locale: "en_US",
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      data-scroll-behavior="smooth"
      lang="en"
      className={`${playFont.variable} ${jakartaFont.variable}`}
    >
      <body>
        <Header />
        <ScrollToTop />
        <main>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
