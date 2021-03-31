const Adult = require("../model");

module.exports = {
  updateDailyPointGoal: async (req, res, next) => {
    try {
      //getting by child id
      const child = req.user.child.find((kid) => kid.id === req.params.id);
      //for axios
      child.dailyPointGoal = req.body.dailyPointGoal;
      await req.user.save();
      res.send(child);
    } catch (error) {
      next(error);
    }
  },

  updateRewardOptions: async (req, res, next) => {
    try {
      //getting by child id
      const child = req.user.child.find((kid) => kid.id === req.params.id);
      if (req.body.rewardOptions.length !== 3)
        return res.status(500).send("You need to select 3 options.");
      //for axios
      child.rewardOptions = req.body.rewardOptions;
      if (!child.rewardOptions.includes(child.selectedReward))
        child.selectedReward = null;
      await req.user.save();
      res.send(child);
    } catch (error) {
      next(error);
    }
  },

  updateSelectedReward: async (req, res, next) => {
    try {
      //getting by child id
      const child = req.user.child.find((kid) => kid.id === req.params.id);
      if (!child.rewardOptions.includes(req.body.selectedReward))
        return res
          .status(500)
          .send("You must only select from the given options.");
      //for axios
      child.selectedReward = req.body.selectedReward;

      await req.user.save();
      res.send(child);
    } catch (error) {
      next(error);
    }
  },
};
