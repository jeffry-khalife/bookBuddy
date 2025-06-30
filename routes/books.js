const express = require('express');
const router = express.Router();
const auth = require('../auth/authmiddleware');

router.get('/', auth, (req, res) => {
  res.json({ message: `Bienvenue utilisateur ${req.user.id}` });
});

module.exports = router;