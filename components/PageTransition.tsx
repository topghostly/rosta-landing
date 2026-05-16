"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useContext, useRef } from "react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

// Freezes the router context so the exit animation shows the OLD page rather than instantly snapping to the NEW page layout data
export function FrozenRoute({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {});
  const frozen = useRef(context).current;

  // Fallback in case context isn't available
  if (!LayoutRouterContext) {
    return <>{children}</>;
  }

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

const transitionVariants: Variants = {
  initial: {
    opacity: 0,
    filter: "blur(12px)",
  },
  enter: {
    opacity: [0, 1, 1],
    filter: ["blur(12px)", "blur(12px)", "blur(0px)"],
    transition: {
      duration: 0.9,
      times: [0, 0.5, 1], // Fades in opacity (first 40%), then unblurs (remaining 60%)
      ease: [0.25, 1, 0.5, 1], // Professional cubic-bezier ease out
    },
  },
  exit: {
    opacity: [1, 1, 0],
    filter: ["blur(0px)", "blur(12px)", "blur(12px)"],
    transition: {
      duration: 0.8,
      times: [0, 0.6, 1], // Blurs (first 60%), then fades out opacity (remaining 40%)
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={transitionVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="flex-1 flex flex-col min-h-full"
      >
        <FrozenRoute>{children}</FrozenRoute>
      </motion.div>
    </AnimatePresence>
  );
}
