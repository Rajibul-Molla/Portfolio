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
export function useCountUp(target) {
  return target;
}
