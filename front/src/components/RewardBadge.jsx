import React from "react";

export default function RewardBadge({ type, icon, description }) {
  return (
    <div style={{
      display: "inline-block",
      margin: 8,
      padding: 12,
      background: "#f5f5f5",
      borderRadius: 12,
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      textAlign: "center",
      minWidth: 100
    }}>
      <div style={{ fontSize: 32 }}>{icon}</div>
      <div style={{ fontWeight: "bold", marginTop: 8 }}>{type}</div>
      <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>{description}</div>
    </div>
  );
}
