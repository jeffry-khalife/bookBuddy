import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import BookComponent from "../components/BookComponent";
import BookForm from "../components/BookForm";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import RewardBadge from "../components/RewardBadge";
import { getBooks, addBook } from "../api";
import "./BooksPage.css";
import ExternalBookSearchOpenLibrary from "../components/ExternalBookSearchOpenLibrary";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [shareMsg, setShareMsg] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      try {
        const data = await getBooks(token);
        setBooks(data);
      } catch (err) {
        setBooks([]);
      }
      setLoading(false);
    }
    fetchBooks();
  }, [token]);

  const filteredBooks = books.filter(book => {
    return (
      book.title.toLowerCase().includes(search.toLowerCase()) &&
      (filters.author ? book.author.toLowerCase().includes(filters.author.toLowerCase()) : true) &&
      (filters.category ? book.category.toLowerCase().includes(filters.category.toLowerCase()) : true)
    );
  });

  const refreshBooks = async () => {
    setLoading(true);
    const data = await getBooks(token);
    setBooks(data);
    setLoading(false);
  };

  const handleImportBook = async (bookData) => {
    if (!bookData.category || bookData.category.trim() === "") {
      bookData.category = "Non classé";
    }
    try {
      await addBook(bookData, token);
      await refreshBooks();
      alert("Livre importé dans ta collection !");
      setShowSearch(false);
    } catch (err) {
      alert("Erreur lors de l'import !");
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.origin + "/books";
    const shareData = {
      title: "Ma collection de livres",
      text: "Voici ma collection de livres !",
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {}
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShareMsg("Lien copié !");
        setTimeout(() => setShareMsg(""), 2000);
      } catch (err) {
        setShareMsg("Erreur lors de la copie");
        setTimeout(() => setShareMsg(""), 2000);
      }
    } else {
      window.prompt("Copiez ce lien :", shareUrl);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Titre", "Auteur", "Catégorie", "Pages", "État"];
    const tableRows = books.map(book => [
      book.title,
      book.author,
      book.category,
      book.pages,
      book.status
    ]);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 28,
      styles: { fontSize: 12 }
    });
    doc.save("ma-collection-livres.pdf");
  };

  const totalBooks = books.length;
  const finishedBooks = books.filter(b => b.status === "terminé").length;
  const inProgressBooks = books.filter(b => b.status === "en cours de lecture").length;

  const rewardBadges = [
    totalBooks >= 10 && {
      type: "Lecteur assidu",
      icon: "🏅",
      description: "Tu as ajouté 10 livres !"
    },
    finishedBooks >= 5 && {
      type: "Dévoreur de livres",
      icon: "📚",
      description: "Tu as terminé 5 livres !"
    },
    totalBooks >= 20 && {
      type: "Collectionneur",
      icon: "🎖️",
      description: "Ta collection compte plus de 20 livres."
    },
    inProgressBooks >= 3 && {
      type: "Toujours en cours",
      icon: "⏳",
      description: "Tu lis 3 livres en même temps !"
    }
  ].filter(Boolean);

  return (
    <div className="books-page">
      <div className="books-header">
        <h2>📚 Ma Collection</h2>
        <button className="add-book-btn" onClick={() => setShowForm(true)}>
          + Ajouter un livre
        </button>
        <button className="share-btn" onClick={handleShare} title="Partager ma collection">
          📤 Partager
        </button>
        <button className="export-pdf-btn" onClick={handleExportPDF} title="Exporter en PDF">
          📄 Exporter PDF
        </button>
        <button className="import-btn" onClick={() => setShowSearch(true)}>
          🔎 Importer depuis Open Library
        </button>
        {shareMsg && (
          <span className="share-msg">
            {shareMsg}
          </span>
        )}
      </div>

      {rewardBadges.length > 0 && (
        <div className="reward-badges-section">
          <h3>🏆 Tes badges</h3>
          {rewardBadges.map((badge, i) => (
            <RewardBadge key={i} {...badge} />
          ))}
        </div>
      )}

      {showSearch && (
        <ExternalBookSearchOpenLibrary
          onImport={handleImportBook}
          onClose={() => setShowSearch(false)}
        />
      )}

      <div className="books-tools">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar filters={filters} setFilters={setFilters} />
      </div>
      <div className="books-list">
        {loading ? (
          <div>Chargement...</div>
        ) : filteredBooks.length === 0 ? (
          <div className="empty-state">
            <span>😕 Aucun livre trouvé.</span>
          </div>
        ) : (
          filteredBooks.map(book => (
            <BookComponent key={book._id} book={book} onUpdate={refreshBooks} />
          ))
        )}
      </div>
      {showForm && (
        <BookForm onClose={() => setShowForm(false)} onSuccess={refreshBooks} />
      )}
    </div>
  );
}
