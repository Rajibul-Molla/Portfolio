import React from "react";
import { overviewData } from "./overviewData";

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function IntroCard() {
  const { heading, paragraphs, buttons } = overviewData;

  function handleContactClick(e) {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  async function handleDownloadResume(e) {
    e.preventDefault();
    try {
      const response = await fetch(buttons.resumeUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "Rajibul_Molla_2026.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback: direct download link navigation
      const fallbackLink = document.createElement("a");
      fallbackLink.href = buttons.resumeUrl;
      fallbackLink.download = "Rajibul_Molla_2026.pdf";
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      document.body.removeChild(fallbackLink);
    }
  }

  return (
    <div className="ov-card ov-card--intro">
      <h1 className="ov-intro-heading">{heading}</h1>
      <p className="ov-intro-p1">{paragraphs[0]}</p>
      <p className="ov-intro-p2">{paragraphs[1]}</p>
      <div className="ov-intro-buttons">
        <a
          href={buttons.resumeUrl}
          download="Rajibul_Molla_2026.pdf"
          onClick={handleDownloadResume}
          className="ov-btn ov-btn--primary"
          id="ov-download-resume"
        >
          <DownloadIcon />
          <span>{buttons.primary}</span>
        </a>
        <button
          type="button"
          className="ov-btn ov-btn--secondary"
          id="ov-contact-me"
          onClick={handleContactClick}
        >
          {buttons.secondary}
        </button>
      </div>
    </div>
  );
}
