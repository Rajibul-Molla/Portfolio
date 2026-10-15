import React, { useState } from 'react';
import Hero from './components/Hero/Hero';
import BlackStrip from './components/BlackStrip/BlackStrip';
import './App.css';

/**
 * App Root Component
 * Coordinates page layout and section navigation targets:
 * - Hero (with embedded Navbar, HeroText, Typewriter, and HeroPortrait)
 * - BlackStrip (160px solid black strip below hero)
 * - Empty anchor targets for smooth scroll navigation
 */
function App() {
  const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (id) => {
    setActiveLink(id);
  };

  return (
    <div className="portfolio-page">
      {/* Hero Section */}
      <Hero activeLink={activeLink} onLinkClick={handleLinkClick} />

      {/* 160px Solid Black Strip */}
      <BlackStrip />

      {/* Target anchor sections for smooth scroll (#about, #education, etc.) */}
      <div id="about" tabIndex="-1" />
      <div id="education" tabIndex="-1" />
      <div id="tech-stack" tabIndex="-1" />
      <div id="projects" tabIndex="-1" />
      <div id="experience" tabIndex="-1" />
      <div id="contact" tabIndex="-1" />
    </div>
  );
}

export default App;
