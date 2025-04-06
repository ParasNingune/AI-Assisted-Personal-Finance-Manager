const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

router.post("/", transactionController.createTransaction);
router.get("/", transactionController.getTransactions);
router.get("/account/:accountId", transactionController.getAccountTransactions);
router.delete("/:id", transactionController.deleteTransaction);
router.put("/:id", transactionController.updateTransaction);

module.exports = router;
