/**
 * educationData.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for ALL text in the Education section.
 * Edit this file to update placeholders, stats, dates, and the progress value.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const heading = "Education";

export const subtitle = "Each step built on the one before it.";

/**
 * steps[]  — four staircase cards, ascending height (card 1 = shortest).
 * isActive marks the "you are here" card (should be exactly one true).
 * icon: "book-open" | "pencil" | "wrench" | "graduation-cap"
 */
export const steps = [
  {
    id: "step-1",
    icon: "book-open",
    years: "[Start year] - [End year]",
    title: "[Secondary school]",
    institution: "[School name]",
    description: "[Add a score, subject or achievement]",
    isActive: false,
  },
  {
    id: "step-2",
    icon: "pencil",
    years: "[Start year] - [End year]",
    title: "[Higher secondary stream]",
    institution: "[School or college name]",
    description: "[Add a score, trade or a workshop project]",
    isActive: false,
  },
  {
    id: "step-3",
    icon: "wrench",
    years: "[Start year] - [End year]",
    title: "[Diploma and branch]",
    institution: "[Polytechnic or institute name]",
    description: "[Add your main subjects, score or a project you are proud of]",
    isActive: false,
  },
  {
    id: "step-4",
    icon: "graduation-cap",
    years: "[Start year] - [End year or Present]",
    title: "[Your degree and branch]",
    institution: "[College or university name]",
    description: "[Add your main subjects, score or a project you are proud of]",
    isActive: true,
  },
];

/**
 * certifications[]  — three ticket cards below the staircase.
 */
export const certifications = [
  {
    id: "cert-1",
    name: "[Certification name]",
    meta: "[Issuing organisation], [Year]",
  },
  {
    id: "cert-2",
    name: "[Course name]",
    meta: "[Platform or institute], [Year]",
  },
  {
    id: "cert-3",
    name: "[Certification or course]",
    meta: "[Issuing organisation], [Year]",
  },
];

/**
 * nowClimbing  — the right-panel "now learning" card.
 * progress: 0–100 (integer). Bar is static — no animation.
 */
export const nowClimbing = {
  label: "now climbing",
  title: "[Topic you are learning now]",
  subtitle: "[Course, book or platform]",
  progress: 62,
};

/**
 * stats[]  — 2 × 2 grid, "By the numbers".
 * suffix is appended after the animated number (e.g. "+").
 */
export const stats = [
  { id: "stat-1", value: 12, suffix: "+", label: "[Years of learning]" },
  { id: "stat-2", value: 6,  suffix: "",  label: "[Certificates earned]" },
  { id: "stat-3", value: 15, suffix: "+", label: "[Projects built]" },
  { id: "stat-4", value: 4,  suffix: "",  label: "[Tech stacks used]" },
];

/**
 * nextUp[]  — vertical timeline, TWO items only.
 * The first item's node is filled and pulsing; the second is hollow.
 */
export const nextUp = [
  {
    id: "next-1",
    title: "[Next certification]",
    when: "[Quarter, Year]",
  },
  {
    id: "next-2",
    title: "[Advanced course]",
    when: "[Quarter, Year]",
  },
];
