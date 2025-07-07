import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <Link to="/books">Ma collection</Link>
          <Link to="/favorites">Favoris</Link>
          <Link to="/profile">Profil</Link>
          <button onClick={handleLogout}>Déconnexion</button>
        </>
      ) : (
        <>
          <Link to="/login">Connexion</Link>
          <Link to="/register">Inscription</Link>
        </>
      )}
    </nav>
  );
}
