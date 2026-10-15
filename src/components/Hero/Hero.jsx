import React from 'react';
import bgImage from '../../assets/bg.webp';
import Navbar from '../Navbar/Navbar';
import HeroText from './HeroText';
import HeroPortrait from './HeroPortrait';
import './Hero.css';

/**
 * Hero Component
 * Assembles the full hero section:
 * - Background sketch illustration (Howrah Bridge sketch, clouds, birds)
 * - Gradient overlay
 * - Navbar (positioned absolutely over the hero)
 * - Hero text content (greeting, name, typewriter role, hire button)
 * - Portrait (anchored to bottom-right, flush with hero bottom)
 */
function Hero({ activeLink = '', onLinkClick = () => {} }) {
  return (
    <header
      className="hero-section"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Subtle gradient overlay */}
      <div className="hero-gradient-overlay" aria-hidden="true" />

      {/* Full-width transparent Navbar */}
      <Navbar activeLink={activeLink} onLinkClick={onLinkClick} />

      {/* Hero Text content */}
      <HeroText onHireClick={() => onLinkClick('contact')} />

      {/* Hero Portrait */}
      <HeroPortrait />
    </header>
  );
}

export default Hero;
