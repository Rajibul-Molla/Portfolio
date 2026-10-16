/**
 * useCountUp.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Animates a number from 0 to `target` over `duration` ms using
 * requestAnimationFrame. Only starts when `active` is true (tie to useInView).
 * Returns the current display value.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { useEffect, useRef, useState } from "react";

/**
 * @param {number}  target   - The final number to count up to.
 * @param {number}  duration - Animation duration in ms (default 1000).
 * @param {boolean} active   - Set to true to start the animation.
 * @returns {number} current display value
 */
export function useCountUp(target, duration = 1000, active = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    // Respect prefers-reduced-motion: skip animation, jump to target
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setCount(target);
      return;
    }

    function step(timestamp) {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setCount(target); // ensure we land exactly on target
      }
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startTimeRef.current = null;
    };
  }, [target, duration, active]);

  return count;
}
