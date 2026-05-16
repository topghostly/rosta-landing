import type { Metadata } from "next";
import { Hedvig_Letters_Serif, Inter_Tight } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "../components/LenisProvider";
import { PageLoader } from "../components/PageLoader";
import { PageTransition } from "../components/PageTransition";

const hedvig = Hedvig_Letters_Serif({
  variable: "--font-hedvig",
  subsets: ["latin"],
  weight: "400",
});

const interTight = Inter_Tight({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s — Rosta",
    default: "Rosta — Campaign Management for African Influencer Agencies",
  },
  description:
    "Rosta helps African influencer marketing agencies manage campaigns, track creator payments, impress brand clients, and understand their profit — all from one place.",
  icons: { icon: "/images/rosta-ico.ico" },
  openGraph: {
    siteName: "Rosta",
    type: "website",
    locale: "en_NG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hedvig.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <PageLoader />
        <LenisProvider>
          <PageTransition>
            {children}
          </PageTransition>
        </LenisProvider>
      </body>
    </html>
  );
}
