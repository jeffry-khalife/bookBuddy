const express = require('express');
const router = express.Router();
const RewardController = require('../controllers/RewardController');
const authMiddleware = require('../core/authMiddleware');

router.use(authMiddleware);

router.post('/:type', RewardController.assignReward);

router.get('/', RewardController.getUserRewards);

module.exports = router;
