import React, { useEffect, useState } from "react";
import { getBooks } from "../api";
import BookComponent from "../components/BookComponent";
import "./FavoritesPage.css";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchFavorites() {
      setLoading(true);
      try {
        const allBooks = await getBooks(token);
        setFavorites(allBooks.filter(book => book.isFavorite));
      } catch (err) {
        setFavorites([]);
      }
      setLoading(false);
    }
    fetchFavorites();
  }, [token]);

  return (
    <div className="favorites-page">
      <h2>⭐ Mes Favoris</h2>
      {loading ? (
        <div>Chargement...</div>
      ) : favorites.length === 0 ? (
        <div className="empty-state">
          <span>😕 Aucun livre favori.</span>
        </div>
      ) : (
        <div className="books-list">
          {favorites.map(book => (
            <BookComponent key={book._id} book={book} onUpdate={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}
