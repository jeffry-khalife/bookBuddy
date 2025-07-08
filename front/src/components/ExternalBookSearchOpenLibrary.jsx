import React, { useState } from "react";

export default function ExternalBookSearchOpenLibrary({ onImport, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setResults([]);
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`
    );
    const data = await res.json();
    setResults(data.docs || []);
    setLoading(false);
  };

  const getCoverUrl = (coverId) =>
    coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
      : "";

  return (
    <div style={{
      margin: "24px 0",
      background: "#fffbe6",
      border: "1px solid #ffe082",
      borderRadius: 12,
      padding: 24,
      position: "relative"
    }}>
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          right: 12,
          top: 12,
          background: "#ffe082",
          border: "none",
          borderRadius: "50%",
          width: 32,
          height: 32,
          fontSize: 18,
          cursor: "pointer"
        }}
        title="Fermer la recherche"
      >
        ×
      </button>
      <form onSubmit={searchBooks} style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          placeholder="Rechercher un livre (Open Library)"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>Rechercher</button>
      </form>
      {loading && <div>Recherche...</div>}
      <div style={{ marginTop: 16 }}>
        {results.map(item => (
          <div key={item.key} style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #eee",
            borderRadius: 8,
            padding: 8,
            marginBottom: 8
          }}>
            {item.cover_i && (
              <img
                src={getCoverUrl(item.cover_i)}
                alt={item.title}
                style={{ width: 50, marginRight: 12 }}
              />
            )}
            <div style={{ flex: 1 }}>
              <strong>{item.title}</strong> <br />
              <span>{item.author_name?.join(", ") || "Auteur inconnu"}</span>
              <div style={{ fontSize: 13, color: "#555" }}>
                {Array.isArray(item.subject) && item.subject.length > 0
                  ? item.subject.slice(0, 2).join(", ")
                  : "Non classé"}
              </div>
            </div>
            <button
              style={{ marginLeft: 12, padding: "6px 12px" }}
              onClick={() => {
                let category = "Non classé";
                if (
                  Array.isArray(item.subject) &&
                  item.subject.length > 0 &&
                  typeof item.subject[0] === "string" &&
                  item.subject[0].trim() !== ""
                ) {
                  category = item.subject[0];
                }
                if (!category || category.trim() === "") category = "Non classé";
                onImport({
                  title: item.title || "Sans titre",
                  author: item.author_name?.join(", ") || "Inconnu",
                  coverImage: getCoverUrl(item.cover_i),
                  pages: item.number_of_pages_median || 0,
                  category,
                  status: "à lire"
                });
              }}
            >
              Importer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
