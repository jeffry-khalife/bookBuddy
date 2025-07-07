const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../core/authMiddleware');

router.get('/:id', authMiddleware, UserController.getProfile);

router.put('/:id', authMiddleware, UserController.updateProfile);

module.exports = router;
