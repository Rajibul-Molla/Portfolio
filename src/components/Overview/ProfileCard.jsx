import React from "react";
import { overviewData } from "./overviewData";

export default function ProfileCard() {
  const { badge, name, role } = overviewData;

  return (
    <div className="ov-card ov-card--profile">
      {/* Top: Red pill badge with white dot */}
      <div className="ov-profile-top">
        <div className="ov-profile-badge" aria-label={badge}>
          <span className="ov-profile-badge-dot" aria-hidden="true" />
          {badge}
        </div>
      </div>

      {/* Middle: Subtle line-art bridge truss pattern */}
      <div className="ov-profile-truss-wrap" aria-hidden="true">
        <svg
          className="ov-profile-truss-svg"
          viewBox="0 0 300 80"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top & bottom horizontal lines */}
          <line x1="0" y1="1" x2="300" y2="1" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
          <line x1="0" y1="79" x2="300" y2="79" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />

          {/* Vertical dividers */}
          <line x1="0" y1="1" x2="0" y2="79" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
          <line x1="100" y1="1" x2="100" y2="79" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
          <line x1="200" y1="1" x2="200" y2="79" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
          <line x1="300" y1="1" x2="300" y2="79" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />

          {/* Diagonals */}
          <line x1="0" y1="1" x2="100" y2="79" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
          <line x1="0" y1="79" x2="100" y2="1" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />

          <line x1="100" y1="1" x2="200" y2="79" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
          <line x1="100" y1="79" x2="200" y2="1" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />

          <line x1="200" y1="1" x2="300" y2="79" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
          <line x1="200" y1="79" x2="300" y2="1" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
        </svg>
      </div>

      {/* Bottom: Name, title, and crop note */}
      <div className="ov-profile-bottom">
        <h3 className="ov-profile-name">{name}</h3>
        <p className="ov-profile-role">{role}</p>
        <p className="ov-profile-note">
          Replace this panel with your portrait, cropped to fit
        </p>
      </div>
    </div>
  );
}
