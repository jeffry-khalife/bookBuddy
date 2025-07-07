import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const data = await getProfile(userId, token);
        setProfile(data);
        setForm({ username: data.username, email: data.email, password: "" });
      } catch (err) {
        setProfile(null);
      }
      setLoading(false);
    }
    fetchProfile();
  }, [userId, token]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    try {
      const updateData = {
        username: form.username,
        email: form.email,
      };
      if (form.password) updateData.password = form.password;
      const updated = await updateProfile(userId, updateData, token);
      setProfile(updated);
      setEditMode(false);
      setMsg("Profil mis à jour !");
    } catch (err) {
      setMsg("Erreur lors de la mise à jour.");
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (!profile) return <div>Erreur lors du chargement du profil.</div>;

  return (
    <div className="profile-page">
      <h2>👤 Mon Profil</h2>
      {msg && <div className="profile-msg">{msg}</div>}
      {!editMode ? (
        <>
          <div className="profile-row">
            <strong>Pseudo :</strong> <span>{profile.username}</span>
          </div>
          <div className="profile-row">
            <strong>Email :</strong> <span>{profile.email}</span>
          </div>
          <button className="profile-btn" onClick={() => setEditMode(true)}>
            ✏️ Modifier mon profil
          </button>
        </>
      ) : (
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-form-group">
            <label>
              Pseudo :
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="profile-input"
              />
            </label>
          </div>
          <div className="profile-form-group">
            <label>
              Email :
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="profile-input"
              />
            </label>
          </div>
          <div className="profile-form-group">
            <label>
              Nouveau mot de passe :
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Laisse vide pour ne pas changer"
                className="profile-input"
              />
            </label>
          </div>
          <div className="profile-form-actions">
            <button type="submit" className="profile-btn save">
              💾 Enregistrer
            </button>
            <button type="button" className="profile-btn cancel" onClick={() => setEditMode(false)}>
              Annuler
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
