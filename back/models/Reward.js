const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  icon: {
    type: String 
  },
  description: {
    type: String
  },
  achievedAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Reward', rewardSchema);
