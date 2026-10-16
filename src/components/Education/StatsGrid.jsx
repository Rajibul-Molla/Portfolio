/**
 * StatsGrid.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * "By the numbers" 2 × 2 grid. Each cell displays an animated count-up number
 * followed by an optional suffix (e.g. "+") and a mono label below it.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import React from "react";
import { useCountUp } from "./useCountUp";

/* One stat cell with its own count-up */
function StatCell({ stat, isInView }) {
  const count = useCountUp(stat.value, 1000, isInView);

  return (
    <div className="edu__stat">
      <span className="edu__stat-number">
        {count}
        {stat.suffix}
      </span>
      <span className="edu__stat-label">{stat.label}</span>
    </div>
  );
}

export default function StatsGrid({ stats, isInView }) {
  return (
    <div className="edu__stats-section">
      <h3 className="edu__stats-heading">By the numbers</h3>

      <div className="edu__stats-grid" role="list">
        {stats.map((stat) => (
          <div key={stat.id} role="listitem">
            <StatCell stat={stat} isInView={isInView} />
          </div>
        ))}
      </div>
    </div>
  );
}
