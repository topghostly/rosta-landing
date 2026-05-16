"use client";

import { motion } from "framer-motion";
import { Smile } from "lucide-react";

const ITEMS = [
  "Coming Soon",
  "Join the waitlist — get early access",
  "Built for African Influencer Agencies",
  "Naira pricing, African market",
  "Be first in line",
  "Launching soon",
  "Secure your spot on the waitlist",
];

const REPEATED = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

function Item({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-5 whitespace-nowrap">
      <Smile className="h-4 w-4 shrink-0 text-foreground/30" />
      <span className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/50">
        {text}
      </span>
    </span>
  );
}

export function AnnouncementBar() {
  return (
    <div className="relative w-full overflow-hidden select-none border-b border-foreground/6 py-2.5">
      <motion.div
        className="flex gap-10"
        style={{ width: "max-content" }}
        animate={{ x: "-50%" }}
        initial={{ x: 0 }}
        transition={{ duration: 100, ease: "linear", repeat: Infinity }}
      >
        {REPEATED.map((text, i) => (
          <Item key={i} text={text} />
        ))}
      </motion.div>
    </div>
  );
}
