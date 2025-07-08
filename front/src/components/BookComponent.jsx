import React, { useState } from "react";
import BookModal from "./BookModal";
import FavoriteButton from "./FavoriteButton";

export default function BookComponent({ book, onUpdate }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{border: "1px solid #ccc", margin: 8, padding: 8, width: 200}}>
      <img src={book.coverImage} alt={book.title} style={{width: "100%", height: 200, objectFit: "coverImage"}} />
      <h4>{book.title}</h4>
      <p>{book.author}</p>
      <FavoriteButton book={book} onUpdate={onUpdate} />
      <button onClick={() => setShowModal(true)}>Détails</button>
      {showModal && <BookModal book={book} onClose={() => setShowModal(false)} onUpdate={onUpdate} />}
    </div>
  );
}
