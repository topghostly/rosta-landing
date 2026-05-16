"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "danger";
export type IconPosition = "left" | "right";

// Omit Framer Motion conflicting event overloads
type SafeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onDragOver"
  | "onDragEnter"
  | "onDragLeave"
  | "onDrop"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
>;

export interface RostaButtonProps extends SafeButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  variant?: ButtonVariant;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const EASE = [0.34, 1.56, 0.64, 1] as const;

const VARIANT = {
  primary: {
    outer: "bg-[#5F3505] dark:bg-[#D4C790]",
    face: "bg-[#985100] dark:bg-[#FAF9F5]",
    text: "text-[#201100] dark:text-[#98873D]",
  },
  secondary: {
    outer: "bg-[#3a3937]",
    face: "bg-[#5e5d59]",
    text: "text-[#faf9f5]",
  },
  danger: {
    outer: "bg-[#7E2A2A]",
    face: "bg-[#C65454]",
    text: "text-white",
  },
} as const;

export function Button({
  children,
  icon,
  iconPosition = "right",
  variant = "primary",
  disabled = false,
  type = "button",
  className,
  onClick,
  ...rest
}: RostaButtonProps) {
  const v = VARIANT[variant];

  const iconSlot = (node: ReactNode) => (
    <span className="flex items-center justify-center shrink-0">{node}</span>
  );

  return (
    // Fixed-height wrapper keeps surrounding layout stable while padding animates
    <div style={{ height: 38 }} className={`w-fit ${className ?? ""}`}>
      <motion.button
        {...rest}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`w-fit rounded-[4px] ${v.outer} overflow-hidden cursor-pointer select-none outline-none disabled:opacity-40 disabled:cursor-not-allowed`}
        initial={{ padding: "2px 2px 6px 2px" }}
        whileHover={!disabled ? { padding: "2px 2px 4px 2px" } : undefined}
        whileTap={!disabled ? { padding: "2px 2px 2px 2px" } : undefined}
        transition={{ duration: 0.25, ease: EASE }}
      >
        <div
          className={`h-[28px] rounded-[2px] ${v.face} flex items-center justify-center overflow-hidden px-3 gap-1.5`}
        >
          {icon && iconPosition === "left" && iconSlot(icon)}
          <span
            className={`${v.text} font-sans font-semibold text-[13px] md:text-[15px] tracking-[0.01em] whitespace-nowrap leading-none`}
          >
            {children}
          </span>
          {icon && iconPosition === "right" && iconSlot(icon)}
        </div>
      </motion.button>
    </div>
  );
}
