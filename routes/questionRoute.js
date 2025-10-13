const express=require('express');
 
const router=express.Router();

// first
// const authMiddleware = require("../middleware/authmiddleware");

// router.get("all-questions",authMiddleware,(req,res)=>{

// })


router.get("/all-questions", (req, res) => {
  res.send("all questions")
});
module.exports=router
