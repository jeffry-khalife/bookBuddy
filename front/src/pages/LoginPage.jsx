import React, { useState, useEffect } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/books");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login(email, password);
      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userId", res.user.id);
        window.location.reload(); 
      } else {
        setError(res.message || "Identifiants incorrects");
      }
    } catch (err) {
      setError("Erreur de connexion");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Connexion</h2>
        <input
          className="login-input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="login-input"
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="login-btn" type="submit">Se connecter</button>
        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  );
}
