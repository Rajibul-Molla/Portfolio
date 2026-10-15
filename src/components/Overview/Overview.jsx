import React from "react";
import "./Overview.css";
import Reveal from "./Reveal";
import ProfileCard from "./ProfileCard";
import IntroCard from "./IntroCard";
import StatsCard from "./StatsCard";
import InfoCard from "./InfoCard";
import LocationCard from "./LocationCard";

export default function Overview() {
  return (
    <section id="overview" className="ov-section">
      <div className="ov-container">
        <div className="ov-grid">
          {/* Card A — Profile (dark) */}
          <Reveal delay="0s" className="ov-grid-a">
            <ProfileCard />
          </Reveal>

          {/* Card B — Intro */}
          <Reveal delay="0.12s" className="ov-grid-b">
            <IntroCard />
          </Reveal>

          {/* Card C — Stats */}
          <Reveal delay="0.24s" className="ov-grid-c">
            <StatsCard />
          </Reveal>

          {/* Card D — Info */}
          <Reveal delay="0.36s" className="ov-grid-d">
            <InfoCard />
          </Reveal>

          {/* Card E — Location */}
          <Reveal delay="0.48s" className="ov-grid-e">
            <LocationCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
