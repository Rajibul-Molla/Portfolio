import { useEffect, useRef, useState } from 'react';

/**
 * Fires once when the referenced element enters the viewport.
 * Disconnects the observer after the first intersection.
 *
 * @param {IntersectionObserverInit} [options]
 * @returns {{ ref: React.RefObject<Element>, isVisible: boolean }}
 */
export function useRevealOnce(options = { threshold: 0.1 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If reduced motion is preferred, skip animation entirely — always visible
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(el);

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, isVisible };
}
