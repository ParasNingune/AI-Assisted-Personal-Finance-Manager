const express = require("express");
const router = express.Router();
const txnController = require("../controllers/transactionController");

router.post("/", txnController.createTransaction);
router.get("/:userId", txnController.getUserTransactions);

module.exports = router;
