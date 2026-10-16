/**
 * CertificationList.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Row of three "ticket" cards. Each card has a notch circle cut into
 * its left and right edges via pseudo-elements in CSS.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import React from "react";

export default function CertificationList({ certifications, isInView }) {
  return (
    <div className="edu__certs-section">
      <h3 className="edu__certs-heading">Certifications and courses</h3>

      <ul className="edu__certs-list" role="list">
        {certifications.map((cert, i) => (
          <li
            key={cert.id}
            className={`edu__cert${isInView ? " edu__cert--visible" : ""}`}
            style={{ "--edu-cert-delay": `${i * 80}ms` }}
          >
            {/* Left notch — decorative */}
            <span className="edu__cert-notch edu__cert-notch--left" aria-hidden="true" />

            <div className="edu__cert-body">
              <span className="edu__cert-name">{cert.name}</span>
              <span className="edu__cert-meta">{cert.meta}</span>
            </div>

            {/* Right notch — decorative */}
            <span className="edu__cert-notch edu__cert-notch--right" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </div>
  );
}
