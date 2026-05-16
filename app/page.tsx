import { AnnouncementBar } from "@/components/AnnouncementBar";
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
