const Reward = require('../models/Reward');

exports.assignReward = async (req, res) => {
  try {
    const { type, icon, description } = req.body;
    const userId = req.user.id;

    const reward = new Reward({ type, icon, description, user: userId });
    await reward.save();

    res.status(201).json(reward);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserRewards = async (req, res) => {
  try {
    const rewards = await Reward.find({ user: req.user.id });
    res.json(rewards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
