import React from "react";

export default function FilterBar({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <input name="author" placeholder="Auteur" onChange={handleChange} />
      <input name="category" placeholder="Catégorie" onChange={handleChange} />
    </div>
  );
}
