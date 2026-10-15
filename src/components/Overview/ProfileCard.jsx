import React from "react";
import { overviewData } from "./overviewData";

export default function ProfileCard() {
  const { badge, name, role, images } = overviewData;

  return (
    <div className="ov-card ov-card--profile">
      {/* City image background layer */}
      <div
        className="ov-profile-bg"
        style={{ backgroundImage: `url(${images.city})` }}
      />
      {/* Dark overlay */}
      <div className="ov-profile-overlay" />

      {/* Faint truss SVG art */}
      <svg
        className="ov-profile-truss"
        viewBox="0 0 388 473"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <line x1="0" y1="473" x2="388" y2="0" stroke="rgba(225,29,72,0.12)" strokeWidth="1" />
        <line x1="0" y1="350" x2="388" y2="0" stroke="rgba(225,29,72,0.10)" strokeWidth="1" />
        <line x1="0" y1="473" x2="290" y2="0" stroke="rgba(225,29,72,0.10)" strokeWidth="1" />
        <line x1="80" y1="473" x2="388" y2="100" stroke="rgba(225,29,72,0.08)" strokeWidth="1" />
        <line x1="0" y1="200" x2="388" y2="473" stroke="rgba(225,29,72,0.07)" strokeWidth="1" />
        <line x1="0" y1="473" x2="388" y2="120" stroke="rgba(225,29,72,0.06)" strokeWidth="1" />
      </svg>

      {/* Thin horizontal divider near top */}
      <div className="ov-profile-divider" />

      {/* Portrait */}
      <div className="ov-profile-portrait-wrap">
        <img
          src={images.portrait}
          alt={`Portrait of ${name}`}
          className="ov-profile-portrait"
          draggable="false"
        />
        <div className="ov-profile-portrait-fade" />
      </div>

      {/* Badge */}
      <div className="ov-profile-badge" aria-label={badge}>
        <span className="ov-profile-badge-dot" aria-hidden="true" />
        {badge}
      </div>

      {/* Name + role */}
      <div className="ov-profile-info">
        <p className="ov-profile-name">{name}</p>
        <p className="ov-profile-role">{role}</p>
      </div>
    </div>
  );
}
