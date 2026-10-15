import React from "react";
import "./Overview.css";
import ProfileCard from "./ProfileCard";
import IntroCard from "./IntroCard";
import InfoCard from "./InfoCard";
import LocationCard from "./LocationCard";

export default function Overview() {
  return (
    <section id="overview" className="ov-section">
      <div className="ov-container">
        <div className="ov-grid">
          {/* Left column: ONE tall dark card spanning both rows */}
          <div className="ov-grid-profile">
            <ProfileCard />
          </div>

          {/* Top right (spans 2 columns): Headline & action card */}
          <div className="ov-grid-intro">
            <IntroCard />
          </div>

          {/* Bottom right: Info card */}
          <div className="ov-grid-info">
            <InfoCard />
          </div>

          {/* Bottom right: Red Location card */}
          <div className="ov-grid-location">
            <LocationCard />
          </div>
        </div>
      </div>
    </section>
  );
}
