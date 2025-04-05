const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goalController");

router.post("/", goalController.addGoal);
router.get("/:userId", goalController.getGoals);

module.exports = router;
