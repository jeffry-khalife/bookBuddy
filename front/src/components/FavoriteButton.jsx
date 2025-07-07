import React from "react";
import { addFavorite, removeFavorite } from "../api";

export default function FavoriteButton({ book, onUpdate }) {
  const token = localStorage.getItem("token");
  const toggleFavorite = async () => {
    if (book.isFavorite) {
      await removeFavorite(book._id, token);
    } else {
      await addFavorite(book._id, token);
    }
    onUpdate();
  };

  return (
    <button onClick={toggleFavorite}>
      {book.isFavorite ? "★ Favori" : "☆ Favori"}
    </button>
  );
}
