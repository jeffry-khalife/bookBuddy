module.exports = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || typeof username !== 'string' || username.length < 3) {
    return res.status(400).json({ message: "Nom d'utilisateur invalide (min 3 caractères)" });
  }
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ message: "Email invalide" });
  }
  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ message: "Mot de passe trop court (min 6 caractères)" });
  }

  next();
};
