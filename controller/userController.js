// dbconnection
const dbconnection = require("../db/dbConfig");
const bcrypt=require("bcrypt");
const statusCode=require("http-status-codes")

async function register(req, res) {
  const {username,firstname,lastname,email,password}=req.body;
  if (!username || !firstname || !lastname || !email || !password) {
    return res.status(statusCode.BAD_REQUEST).json({msg :" please provide all information"})
    
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
async function login(req, res) {
  res.send(" user login");
}
async function checkUser(req, res) {
  res.send(" check user");
}
module.exports = { register, login, checkUser };
