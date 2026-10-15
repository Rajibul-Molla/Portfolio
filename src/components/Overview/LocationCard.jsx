import React, { useRef, useState, useEffect } from "react";
import { overviewData } from "./overviewData";
import { useCountUp } from "./useCountUp";

function StatBlock({ stat, enabled }) {
  const count = useCountUp(stat.value, 1200, enabled);

  return (
    <div className="ov-stat-block">
      <span className="ov-stat-value">
        {count}
        {stat.suffix || "+"}
      </span>
      <span className="ov-stat-label">{stat.label}</span>
    </div>
  );
}

export default function LocationCard() {
  const { stats = [
    { label: "Projects", value: 20, suffix: "+" },
    { label: "Projects", value: 20, suffix: "+" },
    { label: "Projects", value: 20, suffix: "+" },
    { label: "Projects", value: 20, suffix: "+" },
  ] } = overviewData;

  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ov-card ov-card--location" ref={ref}>
      <div className="ov-stats-quad">
        {stats.slice(0, 4).map((stat, i) => (
          <StatBlock key={i} stat={stat} enabled={inView} />
        ))}
      </div>
    </div>
  );
}
