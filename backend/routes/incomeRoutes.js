const express = require("express");

const {addIncome, getAllIncome, deleteIncome, downloadReport} = require("../controllers/incomeController");
const {protect} = require("../middleware/userMiddleware");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.delete("/:id", protect, deleteIncome);
router.get("/download", protect, downloadReport);

module.exports = router;