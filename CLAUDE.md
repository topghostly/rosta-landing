# Roster Landing Page — CLAUDE.md

## What This Codebase Is

This is the **public-facing website** for **Roster** — a campaign management platform built for influencer marketing agencies in Nigeria and Africa. The codebase is NOT the app itself. It covers:

- `/` — Landing page (hero, problem statement, features, pricing, CTA)
- `/about` — About the product and team
- `/waitlist` — Waitlist signup form
- `/contact` — Contact form

The app itself (campaign workspaces, client portals, creator database) lives in a separate codebase.

## Product Context (read before writing copy or UI)

**One-line pitch:** Roster helps African influencer agencies run professional campaigns, impress their clients, and see their profit — all in one place, priced in naira.

**The problem:** Nigerian agencies run campaigns via WhatsApp, Excel, and manually built PowerPoints. Roster replaces that operating chaos with a proper back-office platform.

**Key differentiators to emphasise:**

1. Agency profit tracking — shows Creator Payout | Amount Charged to Brand | Agency Profit per influencer, auto-calculated. No other tool does this.
2. Client proposal portal — shareable link, brand approves/rejects creators, no PDF over WhatsApp.
3. Built for Nigeria/Africa — naira pricing, local context. Global tools charge $199–$2,350/month in dollars.

**User types (for landing page messaging):**

- Agency (primary) — the buyer. Logs in daily. Manages creators, campaigns, finances, reports.
- Brand client (secondary) — sees only their campaigns via a limited portal.
- Influencer — no login; uses a unique link per campaign (not a landing page audience).

**What Roster does NOT do (never imply otherwise in copy):**

- Process actual payments or hold money
- Auto-pull Instagram/TikTok data via APIs
- Provide a global influencer discovery database
- Have a mobile app (web only)

## Tech Stack

| Layer     | Choice                                                                   |
| --------- | ------------------------------------------------------------------------ |
| Framework | Next.js 15 (App Router)                                                  |
| Language  | TypeScript (strict)                                                      |
| Styling   | Tailwind CSS v4                                                          |
| Fonts     | Hedvig Letters Serif (serif) + Inter Tight (sans) via `next/font/google` |
| Runtime   | Node.js                                                                  |

## Fonts

Two typefaces — use them intentionally:

- **Inter Tight** (`font-sans`, `var(--font-sans)`) — UI text, body copy, labels, navigation
- **Hedvig Letters Serif** (`font-serif`, `var(--font-serif)`) — headings, display text, pull quotes

Apply via Tailwind: `font-sans` / `font-serif`. Both are loaded in `app/layout.tsx` via `next/font/google` and exposed as CSS variables.

## Design Tokens

Defined in `app/globals.css`. Use via Tailwind utilities:

| Token             | Tailwind class    | Light     | Dark      |
| ----------------- | ----------------- | --------- | --------- |
| background        | `bg-background`   | `#faf9f5` | `#141413` |
| foreground (text) | `text-foreground` | `#faf9f5` | `#faf9f5` |
| muted             | `text-muted`      | `#5e5d59` | `#87867f` |
| hover             | `bg-hover`        | `#f5f4ed` | `#30302e` |
| accent            | `bg-accent`       | `#ffffff` | `#1f1e1d` |

Dark mode: add `.dark` class to `<html>`, or system preference applies automatically.

## Project Structure

```
app/
  layout.tsx          — root layout, fonts, metadata
  globals.css         — Tailwind v4 imports + CSS variables + design tokens
  page.tsx            — landing page (/)
  about/
    page.tsx
  waitlist/
    page.tsx
  contact/
    page.tsx
components/
  [name].tsx          — shared page-level components (Navbar, Footer, etc.)
public/               — static assets (images, logo, og image)
```

Create directories as needed — the structure above is the target, not the current state.

## Commands

```bash
npm run dev      # local dev server at http://localhost:8008
npm run build    # production build
npm run lint     # ESLint
```

## Code Conventions

- **No comments** unless the WHY is non-obvious.
- **No default exports for components** except page files (`page.tsx`, `layout.tsx`) which Next.js requires.
- **Named exports** for all other components: `export function HeroSection() {}`.
- Keep page files thin — extract sections into `components/` if they exceed ~80 lines.
- Use Tailwind utility classes directly. No CSS modules, no styled-components, no component libraries.
- Tailwind v4 config is CSS-first (in `globals.css` under `@theme inline`), not `tailwind.config.js`.
- All copy should be Nigeria/Africa-contextual — reference naira (₦), local market.

## Design Principles

- Professional, restrained SaaS aesthetic — not playful or startup-generic.
- Prioritise clarity of the value proposition above decoration.
- Mobile-first responsive layout.
- Max content width is **1440px** — use `max-w-[1440px] mx-auto` on section inner containers.
- Customise tokens in `globals.css` under `@theme inline` to extend the design system.

## What NOT to Build Here

- No authentication UI (login, signup, dashboard) — that's the app codebase.
- No actual campaign workspace components.
- No payment flows.
- No influencer-facing pages (they use unique per-campaign links inside the app).
- No component libraries (no shadcn, no Radix, no MUI) — build UI from scratch with Tailwind.
