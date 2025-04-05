const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/budgetController");

router.post("/", budgetController.addBudget);
router.get("/:userId", budgetController.getBudgets);

module.exports = router;
