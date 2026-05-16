"use client";

import { motion } from "framer-motion";
import { FileBarChart, LayoutList, Link2, TrendingUp } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

interface Benefit {
  chipLabel: string;
  chipIcon: ReactNode;
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
}

const BENEFITS: Benefit[] = [
  {
    chipLabel: "Profit Per Campaign",
    chipIcon: <TrendingUp className="h-3 w-3" />,
    heading: "Know Exactly What You Made on Every Campaign",
    description:
      "Enter what you charged the brand. Enter what you paid the creator. Rosta calculates your profit automatically per influencer, per campaign, in real time. No spreadsheet. No guesswork. Just the exact naira figure, every time.",
    image: "/images/benefit-1.webp",
    imageAlt:
      "Campaign profit breakdown showing creator payouts, brand charges and agency profit per influencer",
  },
  {
    chipLabel: "Brand-Facing Proposals",
    chipIcon: <Link2 className="h-3 w-3" />,
    heading: "Send Proposals That Make Brands Take You Seriously",
    description:
      "Stop sending PDFs on WhatsApp. With Rosta, you share a clean branded link, the brand opens it, sees each creator's stats and rates, and approves directly in their browser. What used to take days of back-and-forth now takes minutes. You look like a proper operation.",
    image: "/images/benefit-2.webp",
    imageAlt:
      "Shareable branded proposal link where the brand reviews and approves creators in their browser",
  },
  {
    chipLabel: "Live Creator Status",
    chipIcon: <LayoutList className="h-3 w-3" />,
    heading: "Always Know Where Every Creator Stands",
    description:
      "Managing ten creators across three campaigns means something always slips. Rosta gives every creator a status: Shortlisted, Briefed, Draft Submitted, Approved, Posted, Paid, colour coded and visible to your whole team in one screen. No more “I thought you followed up” conversations.",
    image: "/images/benefit-3.webp",
    imageAlt:
      "Colour-coded creator status board showing each creator's stage across multiple campaigns",
  },
  {
    chipLabel: "One-Click Reports",
    chipIcon: <FileBarChart className="h-3 w-3" />,
    heading: "Generate Your Client Report in One Click",
    description:
      "No more two-day PowerPoint jobs. Rosta pulls all your campaign data, reach, engagement, top performers, financials and generates a professional branded PDF automatically. You choose what the client sees and what stays internal. Done in seconds, not days.",
    image: "/images/benefit-4.webp",
    imageAlt:
      "Auto-generated branded client report with reach, engagement and financial summary",
  },
];

export function Benefits() {
  return (
    <section className="relative w-full bg-background py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-6">
        {/* Mobile: natural stacked order */}
        <div className="flex flex-col gap-y-20 md:hidden">
          {BENEFITS.map((benefit, index) => (
            <BenefitCard
              key={benefit.chipLabel}
              benefit={benefit}
              index={index}
            />
          ))}
        </div>
        {/* Desktop: two columns with 60% stagger rhythm.
            Each card height H ≈ column_width + 350px ≈ (vw-168px)/2 + 350px.
            Right column offset = 0.6H ≈ 30vw + 160px.
            Within-column gap = 0.2H ≈ 10vw + 53px. */}
        <div className="hidden md:flex md:gap-x-40">
          <div className="flex flex-1 flex-col gap-y-[160px]">
            <BenefitCard benefit={BENEFITS[0]} index={0} />
            <BenefitCard benefit={BENEFITS[2]} index={2} />
          </div>
          <div
            className="flex flex-1 flex-col gap-y-[160px]"
            style={{ marginTop: "calc(15vw + 160px)" }}
          >
            <BenefitCard benefit={BENEFITS[1]} index={1} />
            <BenefitCard benefit={BENEFITS[3]} index={3} />
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitCard({ benefit, index }: { benefit: Benefit; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col"
    >
      <div className="inline-flex w-fit items-center gap-1.5 rounded-[4px] border border-foreground/[0.08] bg-foreground/[0.04] px-2.5 py-1">
        <span className="text-foreground/55">{benefit.chipIcon}</span>
        <span className="font-sans text-[12px] font-medium tracking-tight text-foreground/70">
          {benefit.chipLabel}
        </span>
      </div>

      <h3 className="mt-5 max-w-[500px] font-serif text-[30px] leading-[1.08] tracking-tight text-foreground sm:text-[38px] md:text-[48px]">
        {benefit.heading}
      </h3>

      <p className="mt-6 max-w-[680px] font-sans text-[15px] leading-[1.6] text-foreground/60 md:text-[18px]">
        {benefit.description}
      </p>

      <div className="relative mt-9 aspect-square w-full overflow-hidden">
        <Image
          src={benefit.image}
          alt={benefit.imageAlt}
          fill
          sizes="(min-width: 768px) 540px, 90vw"
          className="object-cover"
          priority={index < 2}
        />
      </div>
    </motion.article>
  );
}
