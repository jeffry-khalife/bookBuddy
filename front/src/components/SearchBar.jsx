import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      placeholder="Rechercher un livre..."
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{margin: 8, padding: 4, width: 200}}
    />
  );
}
