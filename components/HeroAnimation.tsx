"use client";

import {
  ArrowUpDown,
  Bell,
  Briefcase,
  Calendar,
  ChevronRight,
  File,
  Filter,
  Folder,
  Hash,
  History,
  Option,
  PanelLeft,
  Plus,
  Search,
  ShoppingBag,
  Star,
  Sun,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

// ────────────────────────────────────────────────────────────────────────────
// Tweak-by-hand constants
// ────────────────────────────────────────────────────────────────────────────

const SEARCH_PHRASES = [
  "Natali Craig",
  "A Diamond is Forever",
  "Campaigns this week",
  "Pending influencers",
];

const TYPING_SPEED = 240;
const BACKSPACE_SPEED = 160;
const HOLD_AFTER_TYPED_MS = 1400;
const HOLD_AFTER_CLEARED_MS = 500;

const MOVE_DURATION = 0.95;

// Dashboard's natural design coordinate system.
const DASH_W = 1080;
const DASH_H = 350;

// Cursor waypoints expressed in DASH_W × DASH_H pixel space.
// `hold` = dwell time in seconds. `hover` = id of element to fake-hover.
const WAYPOINTS: {
  x: number;
  y: number;
  hold: number;
  hover: string | null;
}[] = [
  { x: 70, y: 152, hold: 0.7, hover: "side-influencers" },
  { x: 80, y: 222, hold: 0.9, hover: "side-campaigns" },
  { x: 540, y: 28, hold: 1.4, hover: "top-search" },
  { x: 360, y: 268, hold: 0.7, hover: "row-1" },
  { x: 360, y: 312, hold: 0.7, hover: "row-2" },
  { x: 360, y: 356, hold: 0.6, hover: "row-3" },
  { x: 905, y: 140, hold: 0.65, hover: "activity-1" },
  { x: 905, y: 196, hold: 0.65, hover: "activity-2" },
  { x: 905, y: 252, hold: 0.65, hover: "activity-3" },
];

// ────────────────────────────────────────────────────────────────────────────
// Cursor path (derived once from WAYPOINTS)
// ────────────────────────────────────────────────────────────────────────────

function buildCursorPath() {
  const xs: number[] = [WAYPOINTS[0].x];
  const ys: number[] = [WAYPOINTS[0].y];
  const times: number[] = [0];
  let t = WAYPOINTS[0].hold;
  xs.push(WAYPOINTS[0].x);
  ys.push(WAYPOINTS[0].y);
  times.push(t);

  for (let i = 1; i < WAYPOINTS.length; i++) {
    t += MOVE_DURATION;
    xs.push(WAYPOINTS[i].x);
    ys.push(WAYPOINTS[i].y);
    times.push(t);
    t += WAYPOINTS[i].hold;
    xs.push(WAYPOINTS[i].x);
    ys.push(WAYPOINTS[i].y);
    times.push(t);
  }

  t += MOVE_DURATION;
  xs.push(WAYPOINTS[0].x);
  ys.push(WAYPOINTS[0].y);
  times.push(t);

  const duration = t;
  const normalizedTimes = times.map((time) => time / duration);
  return { xs, ys, times: normalizedTimes, duration };
}

const CURSOR_PATH = buildCursorPath();

// ────────────────────────────────────────────────────────────────────────────
// Static dashboard data
// ────────────────────────────────────────────────────────────────────────────

const TABLE_ROWS = [
  {
    id: "#CM98044",
    name: "Natali Craig",
    avatar: "/images/AvatarFemale01.png",
    project: "A Diamond is Forever",
    address: "Meadow Lane Oakland",
    date: "Just now",
    statusLabel: "In Progress",
    statusColor: "#a78bfa",
  },
  {
    id: "#CM9802",
    name: "Kate Morrison",
    avatar: "/images/AvatarFemale04.png",
    project: "Think Different",
    address: "Larry San Francisco",
    date: "1 min ago",
    statusLabel: "Complete",
    statusColor: "#4ade80",
  },
  {
    id: "#CM9823",
    name: "Drew Cano",
    avatar: "/images/AvatarMale01.png",
    project: "Just Do It",
    address: "Bagwell Avenue Ocala",
    date: "1 hour ago",
    statusLabel: "Pending",
    statusColor: "#60a5fa",
  },
  {
    id: "#CM9947",
    name: "Orlando Diggs",
    avatar: "/images/AvatarMale03.png",
    project: "Think Different",
    address: "Larry San Francisco",
    date: "1 min ago",
    statusLabel: "Complete",
    statusColor: "#4ade80",
  },
  {
    id: "#CM9532",
    name: "Andi Lane",
    avatar: "/images/AvatarFemale03.png",
    project: "Just Do It",
    address: "Bagwell Avenue Ocala",
    date: "1 hour ago",
    statusLabel: "Pending",
    statusColor: "#60a5fa",
  },
];

const ACTIVITIES = [
  {
    text: "Changed the style.",
    time: "Just now",
    avatar: "/images/Avatar3d03.png",
  },
  {
    text: "Released a new version.",
    time: "59 minutes ago",
    avatar: "/images/AvatarFemale05.png",
  },
  {
    text: "Submitted a bug.",
    time: "12 hours ago",
    avatar: "/images/AvatarMale04.png",
  },
  {
    text: "Modified A data in Page X.",
    time: "Today, 11:59 AM",
    avatar: "/images/AvatarFemale06.png",
  },
  {
    text: "Deleted a page in Project X.",
    time: "Feb 2, 2026",
    avatar: "/images/AvatarFemale05.png",
  },
];

// ────────────────────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────────────────────

export function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  // Typing state
  const [searchText, setSearchText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fake-hover state, synced with cursor motion
  const [activeHover, setActiveHover] = useState<string | null>(
    WAYPOINTS[0].hover,
  );

  // Scale dashboard to container width
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / DASH_W);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Typing animation state machine
  useEffect(() => {
    const phrase = SEARCH_PHRASES[phraseIndex];
    let timeoutId: number | undefined;

    if (!isDeleting) {
      if (searchText.length < phrase.length) {
        timeoutId = window.setTimeout(
          () => setSearchText(phrase.slice(0, searchText.length + 1)),
          TYPING_SPEED,
        );
      } else {
        timeoutId = window.setTimeout(
          () => setIsDeleting(true),
          HOLD_AFTER_TYPED_MS,
        );
      }
    } else {
      if (searchText.length > 0) {
        timeoutId = window.setTimeout(
          () => setSearchText(phrase.slice(0, searchText.length - 1)),
          BACKSPACE_SPEED,
        );
      } else {
        timeoutId = window.setTimeout(() => {
          setIsDeleting(false);
          setPhraseIndex((i) => (i + 1) % SEARCH_PHRASES.length);
        }, HOLD_AFTER_CLEARED_MS);
      }
    }

    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [searchText, isDeleting, phraseIndex]);

  // Fake-hover scheduler (must mirror cursor's timing exactly)
  useEffect(() => {
    let cancelled = false;
    const timeouts: number[] = [];

    const schedule = (fn: () => void, delay: number) => {
      const id = window.setTimeout(() => {
        if (!cancelled) fn();
      }, delay);
      timeouts.push(id);
    };

    const runLoop = () => {
      let t = 0;
      schedule(() => setActiveHover(WAYPOINTS[0].hover), 0);
      t += WAYPOINTS[0].hold * 1000;

      for (let i = 1; i < WAYPOINTS.length; i++) {
        schedule(() => setActiveHover(null), t);
        t += MOVE_DURATION * 1000;
        const hover = WAYPOINTS[i].hover;
        schedule(() => setActiveHover(hover), t);
        t += WAYPOINTS[i].hold * 1000;
      }

      schedule(() => setActiveHover(null), t);
      t += MOVE_DURATION * 1000;
      schedule(runLoop, t);
    };

    runLoop();
    return () => {
      cancelled = true;
      timeouts.forEach(window.clearTimeout);
    };
  }, []);

  return (
    <div className="mt-16 w-full px-4 sm:px-8">
      <div
        ref={containerRef}
        className="relative mx-auto w-full overflow-hidden"
        style={{
          maxWidth: 1440,
          aspectRatio: `${DASH_W} / ${DASH_H}`,
          maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 55%, transparent 100%)",
        }}
      >
        {scale > 0 && (
          <div
            className="absolute left-0 top-0 origin-top-left"
            style={{
              width: DASH_W,
              height: DASH_H,
              transform: `scale(${scale})`,
            }}
          >
            <div className="relative flex h-full w-full overflow-hidden rounded-[14px] border border-foreground/[0.08] bg-[#1a1916] font-sans text-foreground shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7),0_0_0_1px_rgba(250,249,245,0.02)_inset] select-none">
              <Sidebar activeHover={activeHover} />
              <Main activeHover={activeHover} searchText={searchText} />
              <Activities activeHover={activeHover} />
              <FakeCursor />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Sidebar
// ────────────────────────────────────────────────────────────────────────────

function Sidebar({ activeHover }: { activeHover: string | null }) {
  return (
    <aside className="flex w-[200px] shrink-0 flex-col gap-1 border-r border-foreground/[0.06] bg-foreground/[0.015] px-3 py-4">
      <div className="flex items-center gap-2 px-2 pb-2">
        <span className="font-serif text-[22px] leading-none text-foreground">
          Rosta
        </span>
      </div>

      <div className="mt-2 flex gap-4 px-2 text-[11px]">
        <span className="text-foreground/70">Favorites</span>
        <span className="text-foreground/30">Recent</span>
      </div>

      <div className="mt-2 space-y-0.5">
        <SideRow
          id="side-overview"
          label="Overview"
          dot
          activeHover={activeHover}
        />
        <SideRow
          id="side-influencers"
          label="Influencers"
          dot
          activeHover={activeHover}
        />
      </div>

      <div className="mt-3 px-2 text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/35">
        Dashboards
      </div>

      <div className="mt-1 space-y-0.5">
        <SideRow
          id="side-campaigns"
          label="Campaigns"
          icon={<Hash className="h-3 w-3" />}
          active
          caret
          activeHover={activeHover}
        />
        <SideRow
          id="side-ecommerce"
          label="eCommerce"
          icon={<ShoppingBag className="h-3 w-3" />}
          caret
          activeHover={activeHover}
        />
        <SideRow
          id="side-projects"
          label="Projects"
          icon={<Folder className="h-3 w-3" />}
          caret
          activeHover={activeHover}
        />
        <SideRow
          id="side-documents"
          label="Documents"
          icon={<File className="h-3 w-3" />}
          caret
          activeHover={activeHover}
        />
        <SideRow
          id="side-followers"
          label="Followers"
          icon={<Users className="h-3 w-3" />}
          caret
          activeHover={activeHover}
        />
        <SideRow
          id="side-corporate"
          label="Corporate"
          icon={<Briefcase className="h-3 w-3" />}
          caret
          activeHover={activeHover}
        />
        <SideRow
          id="side-blog"
          label="Blog"
          icon={<File className="h-3 w-3" />}
          caret
          activeHover={activeHover}
        />
      </div>
    </aside>
  );
}

function SideRow({
  id,
  label,
  icon,
  dot,
  caret,
  active,
  activeHover,
}: {
  id: string;
  label: string;
  icon?: ReactNode;
  dot?: boolean;
  caret?: boolean;
  active?: boolean;
  activeHover: string | null;
}) {
  const isHovered = activeHover === id;
  const highlighted = active || isHovered;

  return (
    <div
      className={`flex items-center gap-2 rounded-[5px] px-2 py-1.5 transition-colors duration-150 cursor-default select-none hover:bg-foreground/[0.07] ${
        highlighted ? "bg-foreground/[0.07]" : ""
      }`}
    >
      <span
        className={` h-3 w-3 items-center justify-center text-foreground/35 transition-opacity ${
          caret ? "flex" : "hidden"
        }`}
      >
        <ChevronRight size={10} />
      </span>
      {icon && (
        <span
          className={`shrink-0 ${highlighted ? "text-foreground/85" : "text-foreground/55"}`}
        >
          {icon}
        </span>
      )}
      {dot && (
        <span className="h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
      )}
      <span
        className={`text-[11px] leading-none ${
          highlighted ? "text-foreground" : "text-foreground/65"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Main column
// ────────────────────────────────────────────────────────────────────────────

function Main({
  activeHover,
  searchText,
}: {
  activeHover: string | null;
  searchText: string;
}) {
  return (
    <main className="flex min-w-0 flex-1 flex-col">
      {/* Top bar */}
      <div className="flex h-[52px] shrink-0 items-center gap-2.5 border-b border-foreground/[0.06] px-4">
        <PanelLeft size={12} className=" text-foreground/40" />
        <Star size={12} className=" text-foreground/40" />
        <div className="ml-1 flex items-center gap-1.5 text-[10px]">
          <span className="text-foreground/40">Dashboards</span>
          <span className="text-foreground/25">/</span>
          <span className="text-foreground/80">influencers</span>
        </div>

        <div className="ml-auto mr-auto" style={{ width: 340 }}>
          <TopSearch
            text={searchText}
            isHovered={activeHover === "top-search"}
          />
        </div>

        <div className="flex items-center gap-3">
          <Sun size={12} className=" text-foreground/40" />
          <History size={12} className=" text-foreground/40" />
          <Bell size={12} className=" text-foreground/40" />
          <PanelLeft size={12} className=" text-foreground/40" />
        </div>
      </div>

      {/* Body */}
      <div className="flex min-h-0 flex-1 flex-col px-5 pb-3 pt-4">
        <h3 className="font-sans text-[13px] font-semibold text-foreground">
          Influencers List
        </h3>

        <div className="mt-3 flex items-center gap-3">
          <Plus size={14} className=" text-foreground/45" />
          <Filter size={12} className=" text-foreground/45" />
          <ArrowUpDown size={12} className=" text-foreground/45" />
          <div className="ml-auto flex h-[24px] w-[180px] items-center gap-1.5 rounded-[4px] border border-foreground/[0.07] bg-foreground/[0.03] px-2">
            <Search className="h-3 w-3 text-foreground/35" />
            <span className="text-[10px] text-foreground/30">Search</span>
          </div>
        </div>

        {/* Table */}
        <div className="mt-2.5 min-h-0 flex-1">
          <div className="grid grid-cols-[14px_56px_1.2fr_1fr_1fr_72px_88px] items-center gap-3 border-b border-foreground/[0.07] py-2 text-[8px] uppercase tracking-[0.08em] text-foreground/35">
            <span />
            <span>Id</span>
            <span>Influencer</span>
            <span>Project</span>
            <span>Address</span>
            <span>Date</span>
            <span>Status</span>
          </div>

          {TABLE_ROWS.map((row, i) => (
            <TableRow
              key={row.id}
              row={row}
              hovered={activeHover === `row-${i + 1}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function TopSearch({ text, isHovered }: { text: string; isHovered: boolean }) {
  return (
    <div
      className={`relative flex h-[28px] items-center rounded-[6px] border bg-foreground/[0.04] px-2.5 transition-colors duration-200 ${
        isHovered
          ? "border-foreground/25 bg-foreground/[0.07]"
          : "border-foreground/[0.07]"
      }`}
    >
      <Search className="h-3 w-3 shrink-0 text-foreground/45" />
      <div className="ml-2 flex flex-1 items-center text-[11px] leading-none text-foreground/90">
        {text || <span className="text-foreground/35">Search</span>}
        <motion.span
          className="ml-px inline-block bg-foreground/75"
          style={{ width: 1.5, height: 11 }}
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{
            duration: 1,
            times: [0, 0.49, 0.5, 1],
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      <kbd className="ml-2 flex h-[16px] min-w-[16px] items-center justify-center rounded-[3px] border border-foreground/15 bg-foreground/[0.03] px-1 text-[9px] font-medium text-foreground/45">
        <Option size={6} />
      </kbd>
    </div>
  );
}

function TableRow({
  row,
  hovered,
}: {
  row: (typeof TABLE_ROWS)[number];
  hovered: boolean;
}) {
  return (
    <div
      className={`cursor-pointer hover:bg-foreground/[0.045] grid grid-cols-[14px_56px_1.2fr_1fr_1fr_72px_88px] items-center gap-3 border-b border-foreground/[0.04] py-2.5 text-[10px] leading-none transition-colors duration-200 ${
        hovered ? "bg-foreground/[0.045]" : ""
      }`}
    >
      <span className="h-[6px] w-[6px] rounded-[2px] border border-foreground/25 ml-3" />
      <span className="text-foreground/55">{row.id}</span>
      <div className="flex min-w-0 items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={row.avatar}
          alt={row.name}
          width={18}
          height={18}
          className="h-[18px] w-[18px] shrink-0 rounded-full object-cover"
        />
        <span className="truncate text-foreground/90">{row.name}</span>
      </div>
      <span className="truncate text-foreground/65">{row.project}</span>
      <span className="truncate text-foreground/65">{row.address}</span>
      <span className="flex items-center gap-1 text-foreground/55">
        <Calendar size={10} />
        {row.date}
      </span>
      <span
        className="flex items-center gap-1.5 font-medium"
        style={{ color: row.statusColor }}
      >
        <span
          className="h-1 w-1 shrink-0 rounded-full"
          style={{ background: row.statusColor }}
        />
        {row.statusLabel}
      </span>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Activities panel
// ────────────────────────────────────────────────────────────────────────────

function Activities({ activeHover }: { activeHover: string | null }) {
  return (
    <aside className="flex w-[205px] shrink-0 flex-col border-l border-foreground/[0.06] bg-foreground/[0.015] px-4 py-4">
      <h3 className="font-sans text-[13px] font-semibold text-foreground">
        Activities
      </h3>
      <div className="relative mt-3 flex-1">
        <div className="flex flex-col gap-1">
          {ACTIVITIES.map((act, i) => (
            <ActivityItem
              key={i}
              activity={act}
              hovered={activeHover === `activity-${i + 1}`}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

function ActivityItem({
  activity,
  hovered,
}: {
  activity: (typeof ACTIVITIES)[number];
  hovered: boolean;
}) {
  return (
    <div
      className={`relative hover:bg-foreground/[0.07] cursor-pointer flex items-start gap-2.5 rounded-[4px] py-1 pl-1.5 pr-2 transition-colors duration-200 ${
        hovered ? "bg-foreground/[0.05]" : ""
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={activity.avatar}
        alt=""
        width={18}
        height={18}
        className="relative z-10 h-[18px] w-[18px] shrink-0 rounded-full object-cover ring-2 ring-[#1a1916]"
      />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[10px] leading-tight text-foreground/85">
          {activity.text}
        </span>
        <span className="text-[10px] leading-none text-foreground/40">
          {activity.time}
        </span>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Animated cursor
// ────────────────────────────────────────────────────────────────────────────

function FakeCursor() {
  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0 z-50 will-change-transform"
      animate={{ x: CURSOR_PATH.xs, y: CURSOR_PATH.ys }}
      transition={{
        duration: CURSOR_PATH.duration,
        times: CURSOR_PATH.times,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/svg/cursor.svg"
        alt=""
        width={22}
        height={22}
        draggable={false}
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.55))" }}
      />
    </motion.div>
  );
}
