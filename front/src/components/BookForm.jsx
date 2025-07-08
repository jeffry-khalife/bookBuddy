import React, { useState } from "react";
import { addBook } from "../api";
import "./BookForm.css";

export default function BookForm({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    coverImage: "",
    status: "à lire",
    pages: "",
    category: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.title) errs.title = "Titre requis";
    if (!form.author) errs.author = "Auteur requis";
    if (!form.coverImage) errs.coverImage = "Image requise";
    if (!form.pages || isNaN(form.pages) || form.pages <= 0) errs.pages = "Nombre de pages invalide";
    if (!form.category) errs.category = "Catégorie requise";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "pages" ? Number(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const token = localStorage.getItem("token");
    try {
      await addBook(form, token);
      onSuccess();
      onClose();
    } catch (err) {
      alert("Erreur lors de l'ajout du livre !");
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} title="Fermer">×</button>
        <h3>Ajouter un livre</h3>
        <form onSubmit={handleSubmit} className="book-form">
          <label>
            Titre
            <input name="title" placeholder="Titre" value={form.title} onChange={handleChange} />
            {errors.title && <span className="error">{errors.title}</span>}
          </label>
          <label>
            Auteur
            <input name="author" placeholder="Auteur" value={form.author} onChange={handleChange} />
            {errors.author && <span className="error">{errors.author}</span>}
          </label>
          <label>
            URL de la couverture
            <input name="coverImage" placeholder="URL de la couverture" value={form.coverImage} onChange={handleChange} />
            {errors.coverImage && <span className="error">{errors.coverImage}</span>}
          </label>
          <label>
            Nombre de pages
            <input name="pages" placeholder="Nombre de pages" type="number" value={form.pages} onChange={handleChange} />
            {errors.pages && <span className="error">{errors.pages}</span>}
          </label>
          <label>
            Catégorie
            <input name="category" placeholder="Catégorie" value={form.category} onChange={handleChange} />
            {errors.category && <span className="error">{errors.category}</span>}
          </label>
          <label>
            État
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="à lire">À lire</option>
              <option value="en cours de lecture">En cours</option>
              <option value="terminé">Terminé</option>
            </select>
          </label>
          <div className="form-actions">
            <button type="submit">Ajouter</button>
            <button type="button" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
}
