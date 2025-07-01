import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Accueil</Link> | <Link to="/connexion">Connexion</Link> | <Link to="/inscription">Inscription</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
