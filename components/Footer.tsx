import Link from "next/link";

const LEGAL_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-foreground/[0.06] bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-10 md:pt-18">
        <div className="overflow-hidden">
          <span
            aria-hidden="true"
            className="pointer-events-none block select-none whitespace-nowrap text-center font-serif leading-[0.82] tracking-tight text-foreground/[0.05]"
            style={{ fontSize: "clamp(180px, 28vw, 550px)" }}
          >
            Rosta
          </span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-6 pb-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-[16px] text-muted">
            © {new Date().getFullYear()} Rosta. All rights reserved.
          </p>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-[13px] text-muted">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/90"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
