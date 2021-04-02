const router = require('express').Router();
const {
  addChild,
  updateChild,
  deleteChild,
  verifyPassword,
} = require('../controllers/adult');
const {
  updateDailyPointGoal,
  updateRewardOptions,
  updateSelectedReward,
} = require('../controllers/incentive');

router.put('/addChild', addChild);
router.put('/updateChild', updateChild);
router.put('/deleteChild', deleteChild);
router.put('/updateDailyPointGoal/:id', updateDailyPointGoal);
router.put('/updateRewardOptions/:id', updateRewardOptions);
router.put('/updateSelectedReward/:id', updateSelectedReward);
router.put('/verifyPassword', verifyPassword);

module.exports = router;
