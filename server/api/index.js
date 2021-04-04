const router = require('express').Router();
const {
  addChild,
  updateChild,
  deleteChild,
  verifyPassword,
} = require('../controllers/adult');

router.put('/addChild', addChild);
router.put('/updateChild', updateChild);
router.put('/deleteChild', deleteChild);
router.put('/verifyPassword', verifyPassword);

module.exports = router;
