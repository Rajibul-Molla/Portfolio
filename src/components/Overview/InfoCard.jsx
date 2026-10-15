import React from "react";
import { overviewData } from "./overviewData";

export default function InfoCard() {
  const { info } = overviewData;

  return (
    <div className="ov-card ov-card--info">
      {info.map((row, i) => (
        <div key={i} className="ov-info-item">
          <div className="ov-info-row">
            <span className="ov-info-label">{row.label}</span>
            <span className="ov-info-value">{row.value}</span>
          </div>
          {i < info.length - 1 && <div className="ov-info-divider" />}
        </div>
      ))}
    </div>
  );
}
