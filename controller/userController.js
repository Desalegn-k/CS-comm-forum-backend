// dbconnection
const dbconnection = require("../db/dbConfig");
const bcrypt=require("bcrypt");
const statusCode = require("http-status-codes");
const jwt=require("jsonwebtoken")


async function register(req, res) {
  const {username,firstname,lastname,email,password}=req.body;
  if (!username || !firstname || !lastname || !email || !password) {
    return res.status( statusCode.BAD_REQUEST).json({msg :" please provide all information ok"})
    
  } 
  try {
    const [user]=await dbconnection.query("SELECT username,userid FROM users WHERE username=? or email=?",[username,email]);
    // return res.json( {user_returned:user})

    if (user.length>0) {
      return res.status(400).json({msg:"user already registered"})
      
    }
    if ( password.length<8) {
      return res.status(statusCode.BAD_REQUEST).json({meg:"the paswored must at least 8 chracters"})
      
    }

    // encrypt password
    const salt =await bcrypt.genSalt(10);
    const hashpasword= await bcrypt.hash(password,salt)
    
    await dbconnection.query(
      "INSERT INTO users (username,firstname,lastname,email,password) VALUES(?,?,?,?,?)",
      [username, firstname, lastname, email, hashpasword]
    );
    return res.status(statusCode.CREATED).json("registred succefuly")
    
  } catch (error) {
    console.log(error.message)
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({msg:" Somthing went wrong, please try again later"})
    
  }
  // res.send("Register");
}
// async function login(req, res) {
//   // res.send(" user login");
//   const {email,password}=req.body;
//   if (!email || !password) {
//     return res.status(statusCode.BAD_REQUEST).json({meg:"please enter all requied filds"})
    
//   }
// }

async function login(req, res) {
  const {email, password} = req.body;

  // Check if email or password is missing
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all required fields" });
  }

  //   placeholder logic for now
  try {
    const [user]=await dbconnection.query("SELECT username,userid,password from users where email=?",[email])
    
    if (user.length==0) {
      return res.status(statusCode.BAD_REQUEST).json({msg:" Invalid cridential"})

      
    }
    
       
      // compare password
     const isMuch= await bcrypt.compare(password,user[0].password);
     if (!isMuch) {
       return res
         .status(statusCode.BAD_REQUEST)
         .json({ msg: " Invalid cridential(pasword)" });

      
     }
    //  return res.json({user})

    const username=user[0].username;
    const userid=user[0].userid;
   const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
     expiresIn: "1d",
   });
   return res.status(statusCode.OK).json({msg:"user loginsuccesfull",token})


     
    
  } catch (error) {
    console.log(error.message)
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({msg:"Somthing went wrong,try later!"})
    
  }
  
}

async function checkUser(req, res) {
  const username= req.user.username;
  const userid = req.user.userid;
  res.status(statusCode.OK).json({msg:"valid user" ,username,userid});
   
 
}
module.exports = { register, login, checkUser };

