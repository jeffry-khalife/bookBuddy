const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

const validateRegister = require('../core/validateRegister');
router.post('/register', UserController.register);

router.post('/login', UserController.login);

module.exports = router;