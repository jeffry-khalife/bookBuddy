const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  coverImage: {
    type: String 
  },
  status: {
    type: String,
    enum: ['à lire', 'en cours de lecture', 'terminé'],
    default: 'à lire'
  },
  pages: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  lastPageRead: {
    type: Number,
    default: 0
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
