"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./Button";

export function CTA() {
  return (
    <section className="relative w-full bg-background py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-[920px] flex-col items-center text-center"
        >
          {/* <span className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/65">
            Early Access
          </span> */}

          <h2 className="mt-7 font-serif text-[40px] leading-[1.04] tracking-tight text-foreground sm:text-[56px] md:text-[72px] lg:text-[80px]">
            Run Your Agency Like a Real Operation.
          </h2>

          <p className="mt-7 max-w-[560px] font-sans text-[16px] leading-[1.55] text-foreground/70 md:text-[18px]">
            Join the waitlist for founding agency pricing, early access, and a
            direct line to the team building Rosta.
          </p>

          <div className="mt-10">
            <Link href="/waitlist">
              <Button>Join the Waitlist</Button>
            </Link>
          </div>

          {/* <p className="mt-6 font-sans text-[13px] text-foreground/45">
            Free during early access · No card required
          </p> */}
        </motion.div>
      </div>
    </section>
  );
}
