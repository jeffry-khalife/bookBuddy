// index.js
const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

// Exemple de route API
app.get('/api', (req, res) => {
  res.json({ message: 'Bienvenue sur l’API Bookbuddy !' });
});

app.listen(PORT, () => {
  console.log(`Serveur Express démarré sur http://localhost:${PORT}`);
});
