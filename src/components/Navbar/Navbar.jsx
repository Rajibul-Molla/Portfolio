import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import cloudImg from '../../assets/cloud.png';
import birdImg from '../../assets/bird.png';
import {
  UserIcon,
  CodeIcon,
  BriefcaseIcon,
  MailIcon,
  InfoIcon,
  GraduationIcon,
  LayersIcon,
  ChevronDownIcon,
} from './NavIcons';

/**
 * Navbar Component
 * Features:
 * - Logo: "Portfo" white, "lio." crimson #E11D48
 * - Desktop links: "About me" (dropdown), "Projects", "Experience", "Contact"
 * - "About me" Dropdown with chevron rotation, hover bridge, keyboard navigation (Enter/Space, Esc, Arrows)
 * - Mobile hamburger with full-width dark dropdown and accordion
 * - 2px crimson underline hover animation with left-to-right expansion and right retract
 */
function Navbar({ activeLink = '', onLinkClick = () => {} }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileAccordionOpen, setIsMobileAccordionOpen] = useState(false);

  const dropdownRef = useRef(null);
  const dropdownBtnRef = useRef(null);
  const subItemsRef = useRef([]);

  // Close dropdown on outside click (desktop)
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Close mobile menu on Esc key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Keyboard navigation on dropdown button
  const handleDropdownButtonKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsDropdownOpen((prev) => !prev);
      if (!isDropdownOpen && subItemsRef.current[0]) {
        setTimeout(() => subItemsRef.current[0]?.focus(), 50);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsDropdownOpen(true);
      setTimeout(() => subItemsRef.current[0]?.focus(), 50);
    }
  };

  // Keyboard navigation within dropdown sub-items
  const handleSubItemKeyDown = (e, index) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % 3;
      subItemsRef.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + 3) % 3;
      subItemsRef.current[prevIndex]?.focus();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsDropdownOpen(false);
      dropdownBtnRef.current?.focus();
    }
  };

  const handleItemClick = (id) => {
    onLinkClick(id);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const isAboutActive = ['about', 'education', 'tech-stack'].includes(activeLink);

  return (
    <nav className="navbar" aria-label="Main Navigation">
      {/* Brand Logo */}
      <a
        href="#"
        className="navbar-logo"
        aria-label="Portfolio Home"
        onClick={() => handleItemClick('')}
      >
        <span className="logo-white">Portfo</span>
        <span className="logo-accent">lio.</span>
      </a>

      {/* Decorative cloud below logo */}
      <img
        src={cloudImg}
        alt=""
        className="navbar-cloud"
        aria-hidden="true"
      />

      {/* Decorative bird beside cloud */}
      <img
        src={birdImg}
        alt=""
        className="navbar-bird"
        aria-hidden="true"
      />

      {/* Desktop Navigation Links */}
      <div className="navbar-links" role="menubar">
        {/* About me with Dropdown */}
        <div
          className={`nav-item has-dropdown ${isDropdownOpen ? 'dropdown-open' : ''}`}
          ref={dropdownRef}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button
            ref={dropdownBtnRef}
            type="button"
            className={`nav-link dropdown-toggle ${
              isDropdownOpen || isAboutActive ? 'active' : ''
            }`}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            onKeyDown={handleDropdownButtonKeyDown}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
            id="about-me-button"
          >
            <UserIcon />
            <span>About me</span>
            <ChevronDownIcon className={`chevron-icon ${isDropdownOpen ? 'rotated' : ''}`} />
          </button>

          {/* Dropdown Panel */}
          <div
            className={`dropdown-panel ${isDropdownOpen ? 'show' : ''}`}
            role="menu"
            aria-labelledby="about-me-button"
          >
            <a
              href="#about"
              className="dropdown-item"
              role="menuitem"
              ref={(el) => (subItemsRef.current[0] = el)}
              onClick={() => handleItemClick('about')}
              onKeyDown={(e) => handleSubItemKeyDown(e, 0)}
              tabIndex={isDropdownOpen ? 0 : -1}
            >
              <InfoIcon />
              Overview
            </a>
            <a
              href="#education"
              className="dropdown-item"
              role="menuitem"
              ref={(el) => (subItemsRef.current[1] = el)}
              onClick={() => handleItemClick('education')}
              onKeyDown={(e) => handleSubItemKeyDown(e, 1)}
              tabIndex={isDropdownOpen ? 0 : -1}
            >
              <GraduationIcon />
              Education
            </a>
            <a
              href="#tech-stack"
              className="dropdown-item"
              role="menuitem"
              ref={(el) => (subItemsRef.current[2] = el)}
              onClick={() => handleItemClick('tech-stack')}
              onKeyDown={(e) => handleSubItemKeyDown(e, 2)}
              tabIndex={isDropdownOpen ? 0 : -1}
            >
              <LayersIcon />
              Tech Stack
            </a>
          </div>
        </div>

        {/* Projects */}
        <div className="nav-item">
          <a
            href="#projects"
            className={`nav-link ${activeLink === 'projects' ? 'active' : ''}`}
            onClick={() => handleItemClick('projects')}
            role="menuitem"
          >
            <CodeIcon />
            Projects
          </a>
        </div>

        {/* Experience */}
        <div className="nav-item">
          <a
            href="#experience"
            className={`nav-link ${activeLink === 'experience' ? 'active' : ''}`}
            onClick={() => handleItemClick('experience')}
            role="menuitem"
          >
            <BriefcaseIcon />
            Experience
          </a>
        </div>

        {/* Contact */}
        <div className="nav-item">
          <a
            href="#contact"
            className={`nav-link ${activeLink === 'contact' ? 'active' : ''}`}
            onClick={() => handleItemClick('contact')}
            role="menuitem"
          >
            <MailIcon />
            Contact
          </a>
        </div>
      </div>

      {/* Mobile Hamburger Toggle Button */}
      <button
        type="button"
        className="mobile-hamburger"
        aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      >
        {isMobileMenuOpen ? (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {/* Mobile backdrop — tap to close */}
      <div
        className={`mobile-backdrop ${isMobileMenuOpen ? 'mobile-backdrop--visible' : ''}`}
        aria-hidden="true"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel — always mounted, driven by CSS translateX */}
      <div
        className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Mobile Accordion for About me */}
        <div className="mobile-accordion">
          <button
            type="button"
            className={`mobile-nav-row mobile-accordion-toggle ${isAboutActive ? 'active' : ''}`}
            aria-expanded={isMobileAccordionOpen}
            onClick={() => setIsMobileAccordionOpen((prev) => !prev)}
          >
            <span className="mobile-nav-row__icon"><UserIcon /></span>
            <span className="mobile-nav-row__label">About me</span>
            <ChevronDownIcon className={`chevron-icon ${isMobileAccordionOpen ? 'rotated' : ''}`} />
          </button>

          {/* Accordion sub-items — smooth expand/collapse via max-height */}
          <div className={`mobile-accordion-items ${isMobileAccordionOpen ? 'mobile-accordion-items--open' : ''}`}>
            <a
              href="#about"
              className="dropdown-item"
              onClick={() => handleItemClick('about')}
            >
              <InfoIcon />
              Overview
            </a>
            <a
              href="#education"
              className="dropdown-item"
              onClick={() => handleItemClick('education')}
            >
              <GraduationIcon />
              Education
            </a>
            <a
              href="#tech-stack"
              className="dropdown-item"
              onClick={() => handleItemClick('tech-stack')}
            >
              <LayersIcon />
              Tech Stack
            </a>
          </div>
        </div>

        <a
          href="#projects"
          className={`mobile-nav-row ${activeLink === 'projects' ? 'active' : ''}`}
          onClick={() => handleItemClick('projects')}
        >
          <span className="mobile-nav-row__icon"><CodeIcon /></span>
          <span className="mobile-nav-row__label">Projects</span>
        </a>
        <a
          href="#experience"
          className={`mobile-nav-row ${activeLink === 'experience' ? 'active' : ''}`}
          onClick={() => handleItemClick('experience')}
        >
          <span className="mobile-nav-row__icon"><BriefcaseIcon /></span>
          <span className="mobile-nav-row__label">Experience</span>
        </a>
        <a
          href="#contact"
          className={`mobile-nav-row ${activeLink === 'contact' ? 'active' : ''}`}
          onClick={() => handleItemClick('contact')}
        >
          <span className="mobile-nav-row__icon"><MailIcon /></span>
          <span className="mobile-nav-row__label">Contact</span>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
