import { useState, useEffect, useRef } from "react";

/**
 * Counts from 0 to `target` over `duration` ms.
 * Starts only once `enabled` is true (card entered viewport).
 */
export function useCountUp(target, duration = 1200, enabled = false) {
  const [count, setCount] = useState(0);
  const raf = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (!enabled || started.current) return;
    started.current = true;

    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad
      const eased = 1 - Math.pow(1 - progress, 2);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        raf.current = requestAnimationFrame(step);
      }
    }

    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [enabled, target, duration]);

  return count;
}
