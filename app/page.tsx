import type { Metadata } from "next";
import { AnnouncementBar } from "@/components/AnnouncementBar";

export const metadata: Metadata = {
  title: "Campaign Management for African Influencer Agencies",
  description:
    "Stop running campaigns on WhatsApp and Excel. Rosta helps influencer marketing agencies manage creators, track campaigns, impress clients, and understand profitability — all in one place, priced in naira.",
  openGraph: {
    title: "Campaign Management for African Influencer Agencies",
    description:
      "Stop running campaigns on WhatsApp and Excel. Rosta helps influencer marketing agencies manage creators, track campaigns, impress clients, and understand profitability.",
    type: "website",
  },
};
import { Benefits } from "@/components/Benefits";
import { CTA } from "@/components/CTA";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <AnnouncementBar />
      <Hero />
      <Benefits />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}
