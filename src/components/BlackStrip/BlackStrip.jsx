import React from 'react';
import './BlackStrip.css';

/**
 * BlackStrip Component
 * A 160px solid black (#000) strip directly below the hero.
 * Represents the start of the next section (left empty).
 */
function BlackStrip() {
  return <section className="hero-bottom-strip" aria-hidden="true" />;
}

export default BlackStrip;
