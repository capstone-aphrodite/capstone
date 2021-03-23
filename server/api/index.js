const router = require("express").Router();
const { addChild, updateChild, deleteChild } = require("../controllers/adult");

router.put("/addChild", addChild);
router.put("/updateChild/:id", updateChild);
router.delete("/deleteChild/:id", deleteChild);

module.exports = router;
