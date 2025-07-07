const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');
const authMiddleware = require('../core/authMiddleware');

router.use(authMiddleware);

router.post('/', BookController.addBook);

router.get('/', BookController.getBooks);

router.get('/:id', BookController.getBookById);

router.get('/filter', BookController.filterBooks);

router.put('/:id', BookController.updateBook);

router.put('/:id/progress', BookController.updateProgress);

router.post('/:id/favorite', BookController.addFavorite);

router.delete('/:id/favorite', BookController.removeFavorite);

const validateBook = require('../core/validateBook');
router.post('/', validateBook, BookController.addBook);

router.delete('/:id', BookController.deleteBook);


module.exports = router;
