import { z } from "zod";

export const ROLE_OPTIONS = [
  { value: "FOUNDER", label: "Founder / CEO" },
  { value: "DIRECTOR", label: "Director / Head of" },
  { value: "ACCOUNT_MANAGER", label: "Account Manager" },
  { value: "OPERATIONS", label: "Operations" },
  { value: "OTHER", label: "Other" },
] as const;

export const TEAM_SIZE_OPTIONS = [
  { value: "SOLO", label: "Just me" },
  { value: "SMALL", label: "2 – 5" },
  { value: "MID", label: "6 – 15" },
  { value: "LARGE", label: "16+" },
] as const;

export const COUNTRY_OPTIONS = [
  "Nigeria",
  "Ghana",
  "Kenya",
  "South Africa",
  "Egypt",
  "Côte d'Ivoire",
  "Senegal",
  "Tanzania",
  "Uganda",
  "Rwanda",
  "Other",
] as const;

export const waitlistSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email"),
  agencyName: z
    .string()
    .trim()
    .min(1, "Agency name is required")
    .max(120, "Agency name is too long"),
  role: z.enum([
    "FOUNDER",
    "DIRECTOR",
    "ACCOUNT_MANAGER",
    "OPERATIONS",
    "OTHER",
  ]),
  country: z.enum(COUNTRY_OPTIONS),
  teamSize: z.enum(["SOLO", "SMALL", "MID", "LARGE"]),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
