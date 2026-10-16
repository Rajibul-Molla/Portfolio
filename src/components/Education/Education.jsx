/**
 * Education.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Section shell. 70/30 grid layout: left panel has the staircase + certs,
 * right panel has now-climbing, stats, next-up.
 * All data comes from educationData.js. Animations trigger once via useInView.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import React from "react";
import "./Education.css";

import {
  heading,
  subtitle,
  steps,
  certifications,
  nowClimbing,
  stats,
  nextUp,
} from "./educationData";

import { useInView }     from "./useInView";
import EducationStairs   from "./EducationStairs";
import CertificationList from "./CertificationList";
import NowClimbing       from "./NowClimbing";
import StatsGrid         from "./StatsGrid";
import NextUp            from "./NextUp";

export default function Education() {
  // Trigger animations once when the section enters the viewport
  const [sectionRef, isInView] = useInView(0.15);

  return (
    <section
      id="education"
      className="edu"
      ref={sectionRef}
      aria-labelledby="edu-heading"
    >
      <div className="edu__container">
        {/* ── 70 / 30 grid ──────────────────────────────────────────────── */}
        <div className="edu__grid">

          {/* ═══════════════════════════════════════════ LEFT PANEL (70%) */}
          <div className="edu__panel edu__panel--left">

            {/* Header row: heading + subtitle */}
            <div className="edu__header">
              <h2
                id="edu-heading"
                className={`edu__heading${isInView ? " edu__heading--visible" : ""}`}
              >
                {heading}
              </h2>
              <p className={`edu__subtitle${isInView ? " edu__subtitle--visible" : ""}`}>
                {subtitle}
              </p>
            </div>

            {/* Staircase — flex:1 so it fills available height */}
            <div className="edu__stairs-flex">
              <EducationStairs steps={steps} isInView={isInView} />
            </div>

            {/* Certifications row */}
            <CertificationList certifications={certifications} isInView={isInView} />
          </div>

          {/* ═══════════════════════════════════════════ RIGHT PANEL (30%) */}
          <div className="edu__panel edu__panel--right">

            {/* Now climbing */}
            <NowClimbing data={nowClimbing} />

            {/* By the numbers */}
            <StatsGrid stats={stats} isInView={isInView} />

            {/* Next up timeline */}
            <NextUp items={nextUp} isInView={isInView} />

          </div>

        </div>
      </div>
    </section>
  );
}
