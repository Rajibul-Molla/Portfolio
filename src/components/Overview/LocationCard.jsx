import React from "react";
import { overviewData } from "./overviewData";

export default function LocationCard() {
  const { location, images, showCityImageInLocationCard } = overviewData;

  return (
    <div className="ov-card ov-card--location">
      {/* Top area */}
      <div className="ov-location-top">
        {showCityImageInLocationCard && (
          <img
            src={images.city}
            alt="City"
            className="ov-location-city-img"
            draggable="false"
          />
        )}
      </div>

      {/* Red bottom panel */}
      <div className="ov-location-panel">
        <span className="ov-location-label">{location.label}</span>
        <span className="ov-location-value">{location.value}</span>
      </div>
    </div>
  );
}
