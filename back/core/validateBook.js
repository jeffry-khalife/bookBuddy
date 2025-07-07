module.exports = (req, res, next) => {
  const { title, author, pages, category, status } = req.body;

  if (!title || typeof title !== 'string') {
    return res.status(400).json({ message: "Titre requis" });
  }
  if (!author || typeof author !== 'string') {
    return res.status(400).json({ message: "Auteur requis" });
  }
  if (!pages || typeof pages !== 'number' || pages <= 0) {
    return res.status(400).json({ message: "Nombre de pages invalide" });
  }
  if (!category || typeof category !== 'string') {
    return res.status(400).json({ message: "Catégorie requise" });
  }
  if (status && !['à lire', 'en cours de lecture', 'terminé'].includes(status)) {
    return res.status(400).json({ message: "Statut de lecture invalide" });
  }

  next();
};
