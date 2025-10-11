const express=require('express');
const router=express.Router();
// usre controllers
const  {register,login,checkUser}=require("../controller/userController")


// register rout

router.post("/register",register)

// login usr rout
router.post("/login", login);

// check user
router.get("/check",checkUser)

module.exports=router