import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import BookCard from '../components/BookCard';
import BookModal from '../components/BookModal';

const MyLibrary = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    api.get('/books')
      .then((res) => setBooks(res.data))
      .catch(() => alert("Impossible de charger les livres"));
  }, []);

  return (
    <div>
      <h2>Ma bibliothèque</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 200px)', gap: '1rem' }}>
        {books.map(book => (
          <BookCard key={book._id} book={book} onClick={() => setSelectedBook(book)} />
        ))}
      </div>

      {selectedBook && <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />}
    </div>
  );
};

export default MyLibrary;
