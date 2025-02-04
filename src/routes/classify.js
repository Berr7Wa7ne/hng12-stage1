const express = require("express");
const router = express.Router();
const { classifyNumber } = require("../controllers/classifyController");

//Route to classify a number
router.get("/classify-number", classifyNumber);

module.exports = router;
