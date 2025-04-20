const express = require("express");

const {addExpense, getAllExpense, deleteExpense, downloadReport} = require("../controllers/expenseController");
const {protect} = require("../middleware/userMiddleware");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.delete("/:id", protect, deleteExpense);
router.get("/download", protect, downloadReport);

module.exports = router;