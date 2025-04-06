const express = require("express");
const router = express.Router();
const investmentController = require("../controllers/investmentController");

router.post("/", investmentController.createInvestment);
router.get("/", investmentController.getInvestments);
router.put("/:id", investmentController.updateInvestment);
router.delete("/:id", investmentController.deleteInvestment);

module.exports = router;