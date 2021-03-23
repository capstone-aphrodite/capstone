const router = require("express").Router();
const { createUser, loginUser, logoutUser } = require("../controllers/adult");

router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
module.exports = router;
