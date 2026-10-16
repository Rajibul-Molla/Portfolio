/**
 * useInView.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Returns [ref, isInView]. Once the element enters the viewport the hook fires
 * once and never resets (one-shot). threshold controls how much of the element
 * must be visible before it triggers.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { useEffect, useRef, useState } from "react";

export function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If the browser does not support IntersectionObserver just reveal immediately
    if (!("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // one-shot: stop observing after first trigger
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
}
