const Adult = require('../model');
const bcrypt = require('bcryptjs');
const schedule = require('node-schedule');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      let user = await Adult.findOne({ email: req.body.email });
      if (!user) {
        const adult = new Adult(req.body);
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        adult.password = await bcrypt.hash(password, salt);
        await adult.save();
        const { firstName, child, _id, email } = adult;
        req.login(adult, (error) => (error ? next(error) : 
        res.json({ firstName, child, _id, email })));
      } else {
        return res.status(435).send('This email is already registered');
      }
    } catch (error) {
      next(error);
    }
  },

  loginUser: async (req, res, next) => {
    try {
      let adult = await Adult.findOne({
        email: req.body.email,
      });
      if (adult) {
        if (!bcrypt.compareSync(req.body.password, adult.password)) {
          return res.sendStatus(401);
        }
        const { firstName, child, _id, email } = adult;
        req.login(adult, (error) => (error ? next(error) : 
        res.json({ firstName, child, _id, email })));
      } else {
        res.sendStatus(403);
      }
    } catch (error) {
      next(error);
    }
  },

  authMe: async (req, res, next) => {
    try {
      const { firstName, child, _id, email } = req.user;
      res.json({ firstName, child, _id, email });
    } catch (error) {
      console.log('Error authorizing user in server');
      next(error);
    }
  },

  addChild: async (req, res, next) => {
    try {
      const adult = await Adult.findOne({
        email: req.user.email,
      });
      adult.child.push(req.body);
      await adult.save();
      let newChild = adult.child.find(
        (elem) => elem.firstName === req.body.firstName
      );
      res.send(newChild);
    } catch (error) {
      next(error);
    }
  },

  updateChild: async (req, res, next) => {
    try {
      const adult = await Adult.findOne({
        email: req.user.email,
      }).select('-password');
      let updated = await adult.child.find(
        (elem) => elem._id.toString() === req.body._id
      );
      Object.assign(updated, req.body);
      await adult.save();
      res.send(updated);
    } catch (error) {
      next(error);
    }
  },

  deleteChild: async (req, res, next) => {
    try {
      const adult = await Adult.findOne({
        email: req.user.email,
      }).select('-password');
      adult.child = await adult.child.filter(
        (elem) => elem._id.toString() !== req.body._id
      );
      await adult.save();
      res.send(adult);
    } catch (error) {
      next(error);
    }
  },

  logoutUser: async (req, res, next) => {
    try {
      req.logout();
      req.session.destroy();
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  },
};

schedule.scheduleJob('0 0 * * *', async () => {
  console.log('hi');
  try {
    await Adult.updateMany(
      {},
      { $set: { 'child.$[element].dailyPoints': 0 } },
      { arrayFilters: [{ 'element.dailyPoints': { $gte: 0 } }] }
    );
  } catch (error) {
    console.log(error);
  }
});
