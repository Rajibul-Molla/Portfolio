/**
 * NowClimbing.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * "Now climbing" card for the right panel.
 * Progress bar is STATIC — it shows the full value from first render.
 * No animation, no count-up. The percentage label is a plain string.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import React from "react";

export default function NowClimbing({ data }) {
  const { label, title, subtitle, progress } = data;

  return (
    <div className="edu__climbing">
      {/* Header row: pulsing dot + "now climbing" label */}
      <div className="edu__climbing-header">
        <span className="edu__climbing-dot" aria-hidden="true" />
        <span className="edu__climbing-label">{label}</span>
      </div>

      {/* Title */}
      <p className="edu__climbing-title">{title}</p>

      {/* Subtitle / source */}
      <p className="edu__climbing-subtitle">{subtitle}</p>

      {/* Progress bar — static, no transition */}
      <div className="edu__climbing-track-wrap">
        <div
          className="edu__climbing-track"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Learning progress: ${progress}%`}
        >
          <div
            className="edu__climbing-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="edu__climbing-pct-row">
          <span className="edu__climbing-pct-label">progress</span>
          <span className="edu__climbing-pct-value">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
