const express = require("express");
const { getUser, createUser } = require("../controllers/userController");
const router = express.Router();

router.post("/", createUser);
router.get("/:id", getUser);

module.exports = router;