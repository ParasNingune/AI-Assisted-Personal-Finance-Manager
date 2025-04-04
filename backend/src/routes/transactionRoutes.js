const express = require("express");
const { addTransaction } = require("../controllers/transactionController");
const router = express.Router();

router.post("/", addTransaction);

module.exports = router;