const express = require("express");


const {download} = require("../controllers/downloadController");
const {protect} = require("../middleware/userMiddleware");

const router = express.Router();

router.post("/report", protect, download);

module.exports = router;