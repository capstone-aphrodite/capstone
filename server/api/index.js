const router = require('express').Router();
const { addChild, updateChild, deleteChild } = require('../controllers/adult');
const {
  updateDailyPointGoal,
  updateRewardOptions,
  updateSelectedReward,
} = require('../controllers/incentive');

router.put('/addChild', addChild);
router.put('/updateChild', updateChild);
router.delete('/deleteChild/:id', deleteChild);
router.put('/updateDailyPointGoal/:id', updateDailyPointGoal);
router.put('/updateRewardOptions/:id', updateRewardOptions);
router.put('/updateSelectedReward/:id', updateSelectedReward);

module.exports = router;
