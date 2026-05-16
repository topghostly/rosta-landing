"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Loader2 } from "lucide-react";
import React, { useState } from "react";
import {
  COUNTRY_OPTIONS,
  ROLE_OPTIONS,
  TEAM_SIZE_OPTIONS,
  waitlistSchema,
  type WaitlistInput,
} from "@/lib/validation/waitlist";

type Status = "idle" | "submitting" | "success" | "error";

type FieldErrors = Partial<Record<keyof WaitlistInput, string>>;

const INITIAL_VALUES: WaitlistInput = {
  fullName: "",
  email: "",
  agencyName: "",
  role: "FOUNDER",
  country: "Nigeria",
  teamSize: "SOLO",
};

export function WaitlistForm() {
  const [values, setValues] = useState<WaitlistInput>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const update =
    <K extends keyof WaitlistInput>(key: K) =>
    (value: WaitlistInput[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
      if (errors[key]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }
    };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);

    const parsed = waitlistSchema.safeParse(values);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const next: FieldErrors = {};
      for (const key of Object.keys(flat) as (keyof WaitlistInput)[]) {
        const message = flat[key]?.[0];
        if (message) next[key] = message;
      }
      setErrors(next);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (res.ok) {
        setStatus("success");
        return;
      }

      const data = (await res.json().catch(() => null)) as
        | { error?: string }
        | null;
      setServerError(data?.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setServerError("Network error. Please check your connection.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return <SuccessState />;
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <Field label="Full name" htmlFor="fullName" error={errors.fullName}>
        <TextInput
          id="fullName"
          name="fullName"
          autoComplete="name"
          placeholder="Ada Okeke"
          value={values.fullName}
          onChange={(e) => update("fullName")(e.target.value)}
          invalid={Boolean(errors.fullName)}
        />
      </Field>

      <Field label="Work email" htmlFor="email" error={errors.email}>
        <TextInput
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="ada@youragency.com"
          value={values.email}
          onChange={(e) => update("email")(e.target.value)}
          invalid={Boolean(errors.email)}
        />
      </Field>

      <Field
        label="Agency name"
        htmlFor="agencyName"
        error={errors.agencyName}
      >
        <TextInput
          id="agencyName"
          name="agencyName"
          autoComplete="organization"
          placeholder="Bright Influence"
          value={values.agencyName}
          onChange={(e) => update("agencyName")(e.target.value)}
          invalid={Boolean(errors.agencyName)}
        />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Your role" htmlFor="role" error={errors.role}>
          <SelectInput
            id="role"
            name="role"
            value={values.role}
            onChange={(e) =>
              update("role")(e.target.value as WaitlistInput["role"])
            }
            invalid={Boolean(errors.role)}
          >
            {ROLE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </SelectInput>
        </Field>

        <Field label="Team size" htmlFor="teamSize" error={errors.teamSize}>
          <SelectInput
            id="teamSize"
            name="teamSize"
            value={values.teamSize}
            onChange={(e) =>
              update("teamSize")(e.target.value as WaitlistInput["teamSize"])
            }
            invalid={Boolean(errors.teamSize)}
          >
            {TEAM_SIZE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </SelectInput>
        </Field>
      </div>

      <Field label="Country" htmlFor="country" error={errors.country}>
        <SelectInput
          id="country"
          name="country"
          value={values.country}
          onChange={(e) =>
            update("country")(e.target.value as WaitlistInput["country"])
          }
          invalid={Boolean(errors.country)}
        >
          {COUNTRY_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </SelectInput>
      </Field>

      {serverError && (
        <p
          role="alert"
          className="rounded-[6px] border border-red-500/30 bg-red-500/10 px-3 py-2 font-sans text-[13px] text-red-700"
        >
          {serverError}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={submitting}
        whileHover={!submitting ? { y: -1 } : undefined}
        whileTap={!submitting ? { y: 0 } : undefined}
        transition={{ duration: 0.15 }}
        className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-[#141413] font-sans text-[15px] font-semibold tracking-tight text-[#faf9f5] transition-colors hover:bg-[#2a2826] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Joining the waitlist…
          </>
        ) : (
          <>
            Join the Waitlist
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </motion.button>

      <p className="text-center font-sans text-[12px] text-[#5e5d59]">
        We&apos;ll only email you about Rosta. No spam, ever.
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-1.5">
      <span className="font-sans text-[12px] font-medium uppercase tracking-[0.12em] text-[#5e5d59]">
        {label}
      </span>
      {children}
      {error && (
        <span className="font-sans text-[12px] text-red-700">{error}</span>
      )}
    </label>
  );
}

function TextInput({
  invalid,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      {...props}
      className={`h-11 w-full rounded-[8px] border bg-white px-3.5 font-sans text-[15px] text-[#141413] placeholder:text-[#a8a7a1] outline-none transition-colors focus:border-[#141413] ${
        invalid ? "border-red-500/60" : "border-[#141413]/12"
      } ${className ?? ""}`}
    />
  );
}

function SelectInput({
  invalid,
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }) {
  return (
    <div className="relative">
      <select
        {...props}
        className={`h-11 w-full appearance-none rounded-[8px] border bg-white pl-3.5 pr-10 font-sans text-[15px] text-[#141413] outline-none transition-colors focus:border-[#141413] ${
          invalid ? "border-red-500/60" : "border-[#141413]/12"
        } ${className ?? ""}`}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5e5d59]" />
    </div>
  );
}

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-4 rounded-[12px] border border-[#141413]/10 bg-white px-6 py-12 text-center"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#141413] text-[#faf9f5]">
        <Check className="h-5 w-5" strokeWidth={2.5} />
      </div>
      <h3 className="font-serif text-[24px] leading-[1.15] tracking-tight text-[#141413]">
        You&apos;re on the list.
      </h3>
      <p className="max-w-[360px] font-sans text-[15px] leading-[1.55] text-[#5e5d59]">
        We&apos;ll be in touch with early access details and founding agency
        pricing before launch.
      </p>
    </motion.div>
  );
}
