const express=require('express');
const app=express()
const port=5300;
// dbconnection
const dbconnection=require("./db/dbConfig")

//  chack the server
// app.get("/",(req,res)=>{
//   res.send("welcome")
// })


// user route middleware file
const userRoutes=require("./routes/userRoutes");

// json data middleware

app.use(express.json());
// user route middleware
app.use("/api/users",userRoutes)

// question routes middle ware

//  answer routes middle ware
async function start(){
  try {const reult=await dbconnection.execute("select 'test'");
    app.listen(port);
    console.log('database connection established');
    console.log(`the server listning on port ${port }`)
    // console.log(reult[0])
  
} catch (error) {
  console.log(error.message)
  
}

}
start()




 
