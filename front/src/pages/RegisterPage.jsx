import React, { useState } from "react";
import { register } from "../api";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await register(username, email, password);
      if (res.message && res.message.includes("succès")) {
        navigate("/login");
      } else if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userId", res.user.id);
        navigate("/books");
      } else {
        setError(res.message || "Erreur lors de l'inscription");
      }
    } catch (err) {
      setError("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Inscription</h2>
        <input
          className="register-input"
          placeholder="Pseudo"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          className="register-input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="register-input"
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="register-btn" type="submit">S'inscrire</button>
        {error && <p className="register-error">{error}</p>}
      </form>
    </div>
  );
}
