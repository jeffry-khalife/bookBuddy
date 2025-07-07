import React, { useState, useRef, useEffect } from "react";
import { updateBook, updateBookProgress, deleteBook } from "../api";
import ProgressBar from "./ProgressBar";
import "./BookForm.css";

function Dropdown({ options, selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", width: "100%", marginTop: 4 }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          padding: "8px",
          textAlign: "left",
          background: "#fafafa",
          border: "1px solid #ccc",
          borderRadius: 4,
          cursor: "pointer"
        }}
      >
        {selected || "Sélectionner"} <span style={{ float: "right" }}>▼</span>
      </button>
      {open && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            maxHeight: 120,
            overflowY: "auto",
            background: "white",
            border: "1px solid #ccc",
            margin: 0,
            padding: 0,
            listStyle: "none",
            zIndex: 10,
            borderRadius: 4,
          }}
        >
          {options.map((opt, i) => (
            <li
              key={i}
              onClick={() => {
                onSelect(opt);
                setOpen(false);
              }}
              style={{
                padding: "8px",
                cursor: "pointer",
                background: opt === selected ? "#f0f0f0" : "white"
              }}
              onMouseDown={e => e.preventDefault()}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function BookModal({ book, onClose, onUpdate }) {
  const [status, setStatus] = useState(book.status);
  const [lastPageRead, setLastPageRead] = useState(book.lastPageRead || 0);
  const [pages, setPages] = useState(book.pages);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [msg, setMsg] = useState("");

  const statusOptions = ["à lire", "en cours de lecture", "terminé"];

  const handleBookUpdate = async (e) => {
    e.preventDefault();
    setMsg("");
    const token = localStorage.getItem("token");
    try {
      await updateBook(book._id, { status, pages }, token);
      if (status === "en cours de lecture") {
        await updateBookProgress(book._id, { lastPageRead }, token);
      }
      setMsg("Livre mis à jour !");
      onUpdate();
    } catch (err) {
      setMsg("Erreur lors de la mise à jour !");
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    const token = localStorage.getItem("token");
    try {
      await deleteBook(book._id, token);
      onUpdate();
      onClose();
    } catch (err) {
      setMsg("Erreur lors de la suppression !");
    }
    setDeleting(false);
  };

  useEffect(() => {
    if (lastPageRead > pages) setLastPageRead(pages);
  }, [pages, lastPageRead]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} title="Fermer">×</button>
        <h3>{book.title}</h3>
        {book.coverImage && (
          <img
            src={book.coverImage}
            alt={book.title}
            style={{ width: 150, margin: "0 auto", borderRadius: 8, display: "block" }}
          />
        )}
        <p style={{ marginTop: 16 }}>
          <strong>Auteur :</strong> {book.author}
        </p>
        <p>
          <strong>Catégorie :</strong> {book.category}
        </p>
        <form className="book-form" onSubmit={handleBookUpdate}>
          <label>
            État de lecture :
            <Dropdown
              options={statusOptions}
              selected={status}
              onSelect={setStatus}
            />
          </label>
          <label>
            Nombre de pages :
            <input
              type="number"
              min={1}
              value={pages}
              onChange={e => setPages(Number(e.target.value))}
              style={{ width: "100%", marginBottom: 8 }}
            />
          </label>
          {status === "en cours de lecture" && (
            <>
              <label>
                Dernière page lue :
                <input
                  type="number"
                  min={0}
                  max={pages}
                  value={lastPageRead}
                  onChange={e => setLastPageRead(Number(e.target.value))}
                  style={{ width: "100%", marginBottom: 8 }}
                />
              </label>
              <ProgressBar value={lastPageRead} max={pages} />
            </>
          )}
          <div className="form-actions-row" style={{ marginTop: 16 }}>
            {!showConfirmDelete ? (
              <button
                type="button"
                onClick={() => setShowConfirmDelete(true)}
                style={{ background: "#f44336", color: "white", marginRight: 16 }}
              >
                Supprimer ce livre
              </button>
            ) : (
              <span className="confirm-delete-popup" style={{ marginRight: 16 }}>
                <span style={{ marginBottom: 8 }}>Confirmer la suppression ?</span>
                <button
                  type="button"
                  onClick={handleDelete}
                  style={{
                    background: "#f44336",
                    color: "white",
                    marginRight: 8,
                    minWidth: 80,
                  }}
                  disabled={deleting}
                >
                  {deleting ? "Suppression..." : "Oui"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirmDelete(false)}
                  style={{
                    background: "#eee",
                    color: "#333",
                    minWidth: 80,
                  }}
                  disabled={deleting}
                >
                  Annuler
                </button>
              </span>
            )}
            <button type="submit" style={{ minWidth: 110 }}>
              Mettre à jour
            </button>
          </div>
          {msg && <div style={{ marginTop: 12, color: "#1976d2" }}>{msg}</div>}
        </form>
      </div>
    </div>
  );
}
