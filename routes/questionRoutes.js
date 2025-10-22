// const express=require('express');
 
// const router=express.Router();

// // first
// // const authMiddleware = require("../middleware/authmiddleware");

// // router.get("all-questions",authMiddleware,(req,res)=>{

// // })


// router.get("/all-questions", (req, res) => {
//   res.send("all questions")
// });
// module.exports=router


const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const {
  createQuestion,
  getQuestions,
  getQuestion,
} = require("../controller/questionController");

// Create question (auth required)
router.post("/question", authMiddleware, createQuestion);

// List all questions (public)
router.get("/questions", getQuestions);

// Get single question (public)
router.get("/:questionid", getQuestion);

module.exports = router;
