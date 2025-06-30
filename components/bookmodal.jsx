import React from 'react';

const BookModal = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: '#00000088' }}>
      <div className="modal-content" style={{ background: 'white', margin: '10% auto', padding: '2rem', maxWidth: '500px', borderRadius: '8px' }}>
        <button onClick={onClose} style={{ float: 'right' }}>❌</button>
        <h2>{book.title}</h2>
        <p><strong>Auteur :</strong> {book.author}</p>
        <p><strong>Pages :</strong> {book.pages}</p>
        <p><strong>Catégorie :</strong> {book.category}</p>
        <p><strong>État :</strong> {book.status}</p>
        {book.coverImage && <img src={book.coverImage} alt={book.title} style={{ width: '100%', marginTop: '1rem' }} />}
      </div>
    </div>
  );
};

export default BookModal;
