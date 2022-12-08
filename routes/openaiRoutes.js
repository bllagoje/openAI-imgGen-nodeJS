const express = require("express");
const router = express.Router();
const { generateImage } = require("../controllers/openaiController");

// Post:
router.post("/generateimage", generateImage);


// Export:
module.exports = router;