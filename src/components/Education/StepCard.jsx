/**
 * StepCard.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * One staircase card. Receives step data, its 1-based index (for the ghost
 * numeral), and whether animations have triggered (isInView).
 * ─────────────────────────────────────────────────────────────────────────────
 */
import React from "react";

/* ── Inline SVG icons ──────────────────────────────────────────────────── */
function IconBookOpen({ className }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function IconPencil({ className }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}

function IconWrench({ className }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function IconGraduationCap({ className }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

const ICONS = {
  "book-open": IconBookOpen,
  pencil: IconPencil,
  wrench: IconWrench,
  "graduation-cap": IconGraduationCap,
};

/* ── Component ─────────────────────────────────────────────────────────── */
export default function StepCard({ step, index, isInView }) {
  const { icon, years, title, institution, description, isActive } = step;
  const numeral = index + 1; // 1-based ghost numeral
  const IconComponent = ICONS[icon] || IconBookOpen;

  // Animation delay: stagger 120 ms per card
  const delay = `${index * 120}ms`;

  return (
    <li
      className={`edu__step${isActive ? " edu__step--active" : ""}${
        isInView ? " edu__step--visible" : ""
      }`}
      style={{ "--edu-step-delay": delay }}
    >
      {/* "you are here" badge — only on active card */}
      {isActive && (
        <span className="edu__step-badge" aria-label="Current step">
          you are here
        </span>
      )}

      {/* Top row: icon + year range */}
      <div className="edu__step-top">
        <IconComponent className="edu__step-icon" />
        <span className="edu__step-years">{years}</span>
      </div>

      {/* Title */}
      <h3 className="edu__step-title">{title}</h3>

      {/* Institution */}
      <p className="edu__step-institution">{institution}</p>

      {/* Description */}
      <p className="edu__step-desc">{description}</p>

      {/* Ghost numeral — decorative, behind content */}
      <span className="edu__step-ghost" aria-hidden="true">
        {numeral}
      </span>
    </li>
  );
}
