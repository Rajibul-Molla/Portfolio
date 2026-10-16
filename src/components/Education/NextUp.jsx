/**
 * NextUp.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Vertical timeline for upcoming goals.
 * - A 2px vertical line fades from crimson → transparent downward.
 * - First node: filled crimson circle with glow + infinite pulse.
 * - Subsequent nodes: hollow (crimson border, dark fill).
 * - Line draws top-to-bottom on inView; nodes pop in staggered.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import React from "react";

export default function NextUp({ items, isInView }) {
  return (
    <div className="edu__nextup-section">
      <h3 className="edu__nextup-heading">Next up</h3>

      <ol className="edu__nextup-list">
        {items.map((item, i) => (
          <li
            key={item.id}
            className={`edu__nextup-item${isInView ? " edu__nextup-item--visible" : ""}${
              i === 0 ? " edu__nextup-item--first" : ""
            }`}
            style={{ "--edu-nextup-delay": `${i * 160}ms` }}
          >
            {/* Node dot */}
            <span
              className={`edu__nextup-node${i === 0 ? " edu__nextup-node--active" : ""}`}
              aria-hidden="true"
            />

            {/* Text */}
            <div className="edu__nextup-text">
              <span className="edu__nextup-title">{item.title}</span>
              <span className="edu__nextup-when">{item.when}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
