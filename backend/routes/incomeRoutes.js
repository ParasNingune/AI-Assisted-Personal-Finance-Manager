const express = require("express");

const {addIncome, getAllIncome, deleteIncome} = require("../controllers/incomeController");
const {protect} = require("../middleware/userMiddleware");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.delete("/:id", protect, deleteIncome);

module.exports = router;