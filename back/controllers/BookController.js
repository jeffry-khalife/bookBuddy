const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  try {
    const bookData = { ...req.body, user: req.user.id };
    const book = new Book(bookData);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.id });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.user.id });
    if (!book) return res.status(404).json({ message: 'Livre non trouvé' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!book) return res.status(404).json({ message: 'Livre non trouvé' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { lastPageRead, status } = req.body;
    const book = await Book.findOne({ _id: req.params.id, user: req.user.id });
    if (!book) return res.status(404).json({ message: 'Livre non trouvé' });

    if (lastPageRead !== undefined) book.lastPageRead = lastPageRead;
    if (status) book.status = status;

    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.user.id });
    if (!book) return res.status(404).json({ message: 'Livre non trouvé' });

    book.isFavorite = true;
    await book.save();

    res.json({ message: 'Livre ajouté aux favoris' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.user.id });
    if (!book) return res.status(404).json({ message: 'Livre non trouvé' });

    book.isFavorite = false;
    await book.save();

    res.json({ message: 'Livre retiré des favoris' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.filterBooks = async (req, res) => {
  try {
    const filters = { user: req.user.id };
    if (req.query.author) filters.author = req.query.author;
    if (req.query.category) filters.category = req.query.category;
    if (req.query.status) filters.status = req.query.status;

    const books = await Book.find(filters);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!book) return res.status(404).json({ message: 'Livre non trouvé' });
    res.json({ message: 'Livre supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
