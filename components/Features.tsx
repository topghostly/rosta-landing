"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface Feature {
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    title: "Campaign Workspace",
    description:
      "One table per campaign. Every creator, status, deliverable, and post link in one view, no WhatsApp scrolling.",
  },
  {
    title: "Profit Tracking Per Creator",
    description:
      "See what you charged, what you paid, and what you kept. Per creator, per campaign, in naira.",
  },
  {
    title: "Client Proposal Portal",
    description:
      "Share a branded link. The brand reviews creator profiles, rates, and stats, then approves directly in their browser.",
  },
  {
    title: "Creator Database",
    description:
      "Your agency's private, searchable database with contacts, rates, past work, notes. Owned by your agency, not anyone's phone.",
  },
  {
    title: "Status Pipeline",
    description:
      "Shortlisted, Briefed, Approved, Posted, Paid. Colour coded, overdue items auto-flagged, visible to your whole team.",
  },
  {
    title: "One-Click Report Generation",
    description:
      "End of campaign, one click. A branded PDF report shareable as a link or download, you control what the brand sees.",
  },
];

export function Features() {
  return (
    <section className="relative w-full bg-background py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-6">
        <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-24">
          <div className="md:sticky md:top-24 md:self-start">
            <div className="inline-flex w-fit items-center gap-1.5 rounded-[4px] border border-foreground/[0.08] bg-foreground/[0.04] px-2.5 py-1">
              <Sparkles className="h-3 w-3 text-foreground/55" />
              <span className="font-sans text-[12px] font-medium tracking-tight text-foreground/70">
                Features
              </span>
            </div>

            <h2 className="mt-6 max-w-[520px] font-serif text-[36px] leading-[1.05] tracking-tight text-foreground sm:text-[44px] md:text-[52px]">
              Everything Your Agency Needs. Nothing You Don't.
            </h2>

            <p className="mt-7 max-w-[460px] font-sans text-[16px] leading-[1.55] text-foreground/60 md:text-[18px]">
              Built around how Nigerian agencies actually work, not how a
              Silicon Valley product manager imagines you work.
            </p>
          </div>

          <ul className="flex flex-col">
            {FEATURES.map((feature, index) => (
              <FeatureRow key={feature.title} feature={feature} index={index} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FeatureRow({ feature, index }: { feature: Feature; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.05,
      }}
      className="border-b border-foreground/[0.08] py-9 first:pt-0"
    >
      <h3 className="font-serif text-[24px] leading-[1.15] tracking-tight text-foreground md:text-[30px]">
        {feature.title}
      </h3>
      <p className="mt-3 max-w-[540px] font-sans text-[15px] leading-[1.6] text-foreground/60 md:text-[16px]">
        {feature.description}
      </p>
    </motion.li>
  );
}
