const express=require('express');
 
const router=express.Router();
const { register, login, checkUser } = require("../controller/userController");
const authMiddleware=require("../middleware/authmiddleware")


// usre controllers



// register rout

router.post("/register",register)

// login usr rout
router.post("/login", login);

// check user
router.get("/check", authMiddleware,checkUser);


module.exports=router