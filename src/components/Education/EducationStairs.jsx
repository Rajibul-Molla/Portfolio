/**
 * EducationStairs.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Staircase wrapper: renders 4 StepCards on a shared baseline floor line.
 * Cards ascend in height left-to-right; cards are positioned so their bottoms
 * all sit on the same floor. The floor line draws left-to-right on inView.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import React from "react";
import StepCard from "./StepCard";

export default function EducationStairs({ steps, isInView }) {
  return (
    <div className="edu__stairs-wrap">
      {/* The shared floor line — draws left-to-right via CSS animation */}
      <div
        className={`edu__stairs-floor${isInView ? " edu__stairs-floor--visible" : ""}`}
        aria-hidden="true"
      />

      <ol className="edu__stairs-row" aria-label="Education steps">
        {steps.map((step, i) => (
          <StepCard
            key={step.id}
            step={step}
            index={i}
            isInView={isInView}
          />
        ))}
      </ol>
    </div>
  );
}
