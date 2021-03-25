const router = require('express').Router();
const {
  createUser,
  loginUser,
  logoutUser,
  authMe,
} = require('../controllers/adult');

router.post('/signup', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', authMe);
module.exports = router;
