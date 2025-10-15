
 require("dotenv").config();
const express=require('express');
const app=express();
const cors=require('cors')
const port=5300;
// dbconnection
const dbconnection=require("./db/dbConfig")

//  chack the server
// app.get("/",(req,res)=>{
//   res.send("welcome")
// })


// user route middleware file
const userRoutes=require("./routes/userRoutes");
// question route middleware file
 const quesionRoute=require("./routes/questionRoute");

 //  cors
app.use(cors())

//  authentication middleware file
 const authMiddleware = require("./middleware/authmiddleware");


// json data middleware


app.use(express.json());
// user route middleware
app.use("/api/users",userRoutes)

// question routes middle ware
app.use("/api/question", authMiddleware, quesionRoute);


//  answer routes middle ware
async function start(){
  try {const reult=await dbconnection.execute("select 'tes'");
    // console.log(reult[0])
    app.listen(port);
    console.log('database connection established');
    console.log(`the server listning on port ${port }`)
    // console.log(reult[0])
  
} catch (error) {
  console.log(error.message)
  
}

}
start()




 
