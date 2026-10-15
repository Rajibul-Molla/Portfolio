import React, { useRef, useState, useEffect } from "react";

/**
 * Reveal wrapper — fades + slides children up when they enter the viewport.
 * Props:
 *   delay  (string) — CSS delay, e.g. "0.12s"
 *   className (string) — extra class names
 */
export default function Reveal({ children, delay = "0s", className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`ov-reveal ${visible ? "ov-reveal--visible" : ""} ${className}`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
}
