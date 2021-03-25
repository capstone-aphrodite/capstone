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
        const id = adult._id.toString();
        req.session.userId = id.slice(-4);
        req.login(adult, error => (error ? next(error) : res.json(adult)));
      } else {
        return res.status(435).send('email already has account');
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
        if (!bcrypt.compare(req.body.password, adult.password)) {
          return res.status(401).send('Incorrect password');
        }
      } else {
        res.status(401).send('A user with this email does not exist');
      }
      req.login(adult, error => (error ? next(error) : res.json(adult)));
    } catch (error) {
      next(error);
    }
  },

  authMe: async (req, res, next) => {
    try {
      res.json(req.adult);
    } catch (error) {
      console.log('Error fetching authMe in server');
      next(error);
    }
  },

  addChild: async (req, res, next) => {
    //hardcoding for now until sessions are created otherwise a security issue of someone editing someone else
    try {
      //getting an adult first
      const adult = await Adult.findOne({
        email: 'yahoo@yahoo.com',
      });
      adult.child.push(req.body);
      await adult.save();
      res.send(adult);
    } catch (error) {
      next(error);
    }
  },

  //Run by the team, form?
  updateChild: async (req, res, next) => {
    try {
      const adult = await Adult.findOne({
        email: 'yahoo@yahoo.com',
      });
      //console.log(req.params.id);
      const child = adult.child.find(kid => kid.id === req.params.id);
      //console.log("child", child, adult);
      Object.assign(child, req.body);
      //change the specifics in the child
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
      //req.session.destroy
    } catch (error) {
      next(error);
    }
  },
};
