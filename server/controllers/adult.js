const Adult = require('../model');
const bcrypt = require('bcryptjs');

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
        // const id = adult._id.toString();
        // req.session.userId = id.slice(-4);
        req.login(adult, error => (error ? next(error) : res.json(adult)));
      } else {
        res.status(435).send('This email is already registered');
      }
    } catch (error) {
      next(error);
    }
  },

  loginUser: async (req, res, next) => {
    try {
      const adult = await Adult.findOne({
        email: req.body.email,
      });
      if (adult) {
        if (!bcrypt.compareSync(req.body.password, adult.password)) {
          res.status(401).send('Incorrect password');
        }
        req.login(adult, error => (error ? next(error) : res.json(adult)));
      } else {
        res.status(401).send('A user with this email does not exist');
      }
    } catch (error) {
      next(error);
    }
  },

  authMe: async (req, res, next) => {
    try {
      res.json(req.user);
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
      res.send(adult);
    } catch (error) {
      next(error);
    }
  },

  updateChild: async (req, res, next) => {
    try {
      const adult = await Adult.findOne({
        email: req.user.email,
      });
      //the childId is very long, revisit and consider using some other parameter
      const child = adult.child.find(kid => kid.id === req.params.id);
      Object.assign(child, req.body);
      await adult.save();
      res.send(adult);
    } catch (error) {
      next(error);
    }
  },

  deleteChild: async (req, res, next) => {
    try {
      const adult = await Adult.findOne({
        email: 'yahoo@yahoo.com',
      });
      adult.child = adult.child.filter(kid => kid.id !== req.params.id);
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
