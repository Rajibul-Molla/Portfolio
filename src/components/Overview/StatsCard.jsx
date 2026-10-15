import React, { useRef, useState, useEffect } from "react";
import { overviewData } from "./overviewData";
import { useCountUp } from "./useCountUp";

function StatTile({ stat, enabled }) {
  const count = useCountUp(stat.value, 1200, enabled);
  return (
    <div className="ov-stat-tile">
      <span className="ov-stat-label">{stat.label}</span>
      <span className="ov-stat-value">
        {count}
        {stat.suffix}
      </span>
    </div>
  );
}

export default function StatsCard() {
  const { stats } = overviewData;
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ov-card ov-card--stats" ref={ref}>
      <div className="ov-stats-grid">
        {stats.map((stat, i) => (
          <StatTile key={i} stat={stat} enabled={inView} />
        ))}
      </div>
    </div>
  );
}
