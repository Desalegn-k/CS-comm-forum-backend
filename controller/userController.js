// dbconnection
const dbconnection = require("../db/dbConfig");
const bcrypt=require("bcrypt");
const statusCode = require("http-status-codes");
const jwt=require("jsonwebtoken")
const crypto = require("crypto");
const nodemailer = require("nodemailer");


async function register(req, res) {
  const {username,firstname,lastname,email,password}=req.body;
  if (!username || !firstname || !lastname || !email || !password) {
    return res.status( statusCode.BAD_REQUEST).json({msg :" please provide all information ok"})
    
  } 
  try {
    
    const [user]=await dbconnection.query("SELECT username,userid ,email FROM users WHERE username=? or email=?",[username,email]);
    // return res.json( {user_returned:user})
    
//  if (user[0].email.length > 0) {
//    return res.status(400).json({ msg: " This Email   Has Already Registerd" });
//  }
//     if (user[0].username.length>0) {
       
//       return res.status(400).json({msg:" This Username   Has Already Registerd"})
     
      
//     }

if (user.length > 0) {
  if (user[0].email === email) {
    return res.status(400).json({ msg: "This Email Has Already Registered" });
  }
  if (user[0].username === username) {
    return res
      .status(400)
      .json({ msg: "This Username Has Already Registered" });
  }
}

     
    // if (user.email.length > 0) {
    //   return res
    //     .status(400)
    //     .json({ msg: "user name or email or both has already existd" });
    // }
    if ( password.length<8) {
      return res.status(statusCode.BAD_REQUEST).json({msg:"The Passswored Must Be At Least 8 Chracters"})
      
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
  // if (!email || !password) {
  //   return res.status(400).json({ msg: "Please enter all required fields" });
  // }

  //   placeholder logic for now
  try {
     if (!email || !password) {
       return res.status(400).json({ msg: "Please enter Both required fields!" });
     }
    const [user]=await dbconnection.query("SELECT username,userid,password from users where email=?",[email])
    
    if (user.length==0) {
      return res.status(statusCode.BAD_REQUEST).json({msg:"    The Email Didn't   Register,Please Enter the correct Email!"})

      
    }
    
       
      // compare password
     const isMuch= await bcrypt.compare(password,user[0].password);
     if (!isMuch) {
       return res
         .status(statusCode.BAD_REQUEST)
         .json({
           msg: " Incorrect Password,please enter the corrcet password!",
         });

      
     }
    //  return res.json({user})

    const username=user[0].username;
    const userid=user[0].userid;
   const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
     expiresIn: "1d",
   });
   return res.status(statusCode.OK).json({msg:"user loginsuccesfull",token,username})


     
    
  } catch (error) {
    console.log(error.message)
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({msg:"Somthing went wrong,try later!"})
    
  }
  
}

async function checkUser(req, res) {
  // const username= req.user.username;

  //  const [rows] = await dbconnection.query(
  //     "SELECT userid, firstname, username, email FROM users WHERE userid = ?",
  //     [userid]);
  //       if (rows.length === 0) {
  //         return res
  //           .status(statusCode.NOT_FOUND)
  //           .json({ msg: "User not found" });
  //       }
  // // const firstname=req.user.firstname;
  // const userid = req.user.userid;
  // res.status(statusCode.OK).json({msg:"valid user" ,username,userid});
  try {
    const userid = req.user.userid;

    // Fetch the user from the database
    const [rows] = await dbconnection.query(
      "SELECT userid, firstname, username, email FROM users WHERE userid = ?",
      [userid]
    );

    if (rows.length === 0) {
      return res.status(statusCode.NOT_FOUND).json({ msg: "User not found" });
    }

    const user = rows[0];
    res.status(statusCode.OK).json(user);
  } catch (error) {
    console.log(error.message);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong while checking user" });
  }
   
 
}



async function forgotPassword(req, res) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ msg: "Email required" });

  try {
    const [user] = await dbconnection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (user.length === 0)
      return res.status(404).json({ msg: "User not found" });

    // Generate token valid for 15 minutes
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 15 * 60 * 1000);

     await dbconnection.query(
      "UPDATE users SET resetToken = ?, resetTokenExpires = ? WHERE email = ?",
      [token, expires, email]
    );

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const link = `http://localhost:3000/reset-password/${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Link",
      html: `<p>Click <a href="${link}">here</a> to reset your password. The link expires in 15 minutes.</p>`,
    });

    res.json({ msg: "Reset link sent to your  email ,please Visit your email." });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Something went wrong" });
  }
}

async function resetPassword(req, res) {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const [user] = await dbconnection.query(
      "SELECT * FROM users WHERE resetToken = ? AND resetTokenExpires > NOW()",
      [token]
    );

    if (user.length === 0) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await dbconnection.query(
      "UPDATE users SET password = ?, resetToken = NULL, resetTokenExpires = NULL WHERE resetToken = ?",
      [hashed, token]
    );

    res.json({ msg: "Password reset successful!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error" });
  }
}

module.exports = { register, login, checkUser, forgotPassword, resetPassword };



 
