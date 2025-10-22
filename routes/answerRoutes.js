const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const { postAnswer, getAnswers } = require("../controller/answerController");

// Post answer (auth required)
router.post("/:questionid", authMiddleware, postAnswer);

// Get all answers for a question (public)
router.get("/:questionid", getAnswers);

module.exports = router;
