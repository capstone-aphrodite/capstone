const Adult = require("../model");

module.exports = {
  //Revisit to encrypt password
  createUser: async (req, res, next) => {
    try {
      let adult = new Adult(req.body);
      await adult.save();
      //add req.login of adult
      res.send(adult);
    } catch (error) {
      next(error);
    }
  },

  //Revisit with Bcrypt
  loginUser: async (req, res, next) => {
    try {
      const adult = await Adult.findOne({
        email: req.body.email,
      });
      //check if req.body.password is correct
      //add req.login of adult
      res.send(adult);
    } catch (error) {
      next(error);
    }
  },

  addChild: async (req, res, next) => {
    //hardcoding for now until sessions are created otherwise a security issue of someone editing someone else
    try {
      //getting an adult first
      const adult = await Adult.findOne({
        email: "yahoo@yahoo.com",
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
        email: "yahoo@yahoo.com",
      });
      //console.log(req.params.id);
      const child = adult.child.find((kid) => kid.id === req.params.id);
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
        email: "yahoo@yahoo.com",
      });
      adult.child = adult.child.filter((kid) => kid.id !== req.params.id);
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
