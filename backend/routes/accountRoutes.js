const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

router.post("/", accountController.createAccount);
router.get("/:userId", accountController.getAccounts);

module.exports = router;
