import React from 'react';
import portraitImage from '../../assets/portrait.png';

/**
 * HeroPortrait Component
 * Anchored to the bottom-right of the hero, bottom edge flush with hero bottom (no gap).
 * Dimensions: 535px wide x 630px tall (y=170 from hero top).
 * object-fit: contain; object-position: bottom right.
 */
function HeroPortrait() {
  return (
    <div className="hero-portrait-container">
      <img
        src={portraitImage}
        alt="Prakash Shahi portrait"
        className="hero-portrait"
      />
    </div>
  );
}

export default HeroPortrait;
