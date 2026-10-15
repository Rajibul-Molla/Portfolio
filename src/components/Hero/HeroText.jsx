import React from 'react';
import Typewriter from './Typewriter';

/**
 * HeroText Component
 * Left-aligned, vertically centered in the hero.
 * Contains:
 * 1. "Hello, my name is" (28px, weight 400, line-height 1.2)
 * 2. "Prakash Shahi" (88px, weight 700, line-height 1.15, wraps onto 2 lines, max-width ~520px)
 * 3. "And I'm a Freelancer|" (44px, weight 700, crimson typewriter + blinking cursor)
 * 4. "Hire me" button (172px x 64px, background #E11D3F)
 */
const ROLES = ['Freelancer', 'Software Engineer', 'Full-Stack Developer'];

function HeroText({ onHireClick = () => { } }) {
  return (
    <div className="hero-content">
      <p className="hero-greeting">Hello, my name is</p>
      <h1 className="hero-name">
        Rajibul Molla
      </h1>
      <h2 className="hero-role">
        <span className="role-prefix">And I'm a </span>
        <Typewriter words={ROLES} />
      </h2>
      <a
        href="#contact"
        className="hire-btn"
        onClick={onHireClick}
      >
        Hire me
      </a>
    </div>
  );
}

export default HeroText;
