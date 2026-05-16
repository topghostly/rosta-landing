import Link from "next/link";
import { Button } from "./Button";
import { HeroAnimation } from "./HeroAnimation";
import { Navbar } from "./Navbar";

export function Hero() {
  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden bg-background">
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />

        <div className="flex flex-1 flex-col items-center pb-16 pt-10 md:pb-24 md:pt-24">
          <div className="mx-auto flex w-full max-w-[880px] flex-col items-center px-6 text-center">
            <span className="font-sans text-[8px] font-medium uppercase tracking-[0.22em] text-foreground/65 md:text-[11px]">
              Built for African Influencer Agencies
            </span>

            <h1 className="mt-7 max-w-[860px] font-serif text-[36px] leading-[1.05] tracking-tight text-foreground sm:text-[48px] md:text-[60px] lg:text-[68px]">
              Stop Running Campaigns on WhatsApp and Excel.
            </h1>

            <p className="mt-7 max-w-[620px] font-sans text-[16px] leading-[1.55] text-foreground/85 md:text-[18px]">
              Rosta helps influencer marketing agencies manage creators, track
              campaigns, impress clients, and understand profitability — all
              from one place.
            </p>

            <div className="mt-10">
              <Link href="/waitlist">
                <Button>Join the Waitlist</Button>
              </Link>
            </div>
          </div>

          <HeroAnimation />
        </div>
      </div>
    </section>
  );
}
