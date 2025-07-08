import React from "react";

export default function ProgressBar({ value, max }) {
  const percent = Math.round((value / max) * 100);
  return (
    <div style={{width: "100%", background: "#eee", borderRadius: 8}}>
      <div style={{
        width: `${percent}%`,
        background: "#4caf50",
        height: 12,
        borderRadius: 8
      }} />
      <span>{percent}%</span>
    </div>
  );
}
