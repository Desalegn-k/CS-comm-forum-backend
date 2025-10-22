const express=require('express');
 
const router=express.Router();
const { register, login, checkUser,forgotPassword ,resetPassword} = require("../controller/userController");
const authMiddleware=require("../middleware/authmiddleware")


// usre controllers



// register rout

router.post("/register",register)

// login usr rout
router.post("/login", login);

// check user
router.get("/check", authMiddleware,checkUser);


router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);




module.exports=router