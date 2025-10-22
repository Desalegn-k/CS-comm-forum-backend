 import React, { useState } from "react";
 import axios from "axios";
 import './css/ForgotPassword.css'

 const ForgotPassword = () => {
   const [email, setEmail] = useState("");
   const [message, setMessage] = useState("");

   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const res = await axios.post(
         "http://localhost:5300/api/users/forgot-password",
         { email }
       );
       setMessage(res.data.msg);
     } catch (err) {
       setMessage("Error sending reset link");
     }
   };

   return (
     <div
       style={{ textAlign: "center", marginTop: "100px" }}
       className="classfor"
     >
       <h2>Forgot Password</h2>
       <form onSubmit={handleSubmit} className="">
         <div className="resetemail">
           <input
             className="forget"
             type="email"
             placeholder="Enter your email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
           />
         </div>

         <div className="resetbtn">
           <button type="submit" className="">Send Reset Link</button>
         </div>
       </form>
       <p>{message}</p>
     </div>
   );
 };

 export default ForgotPassword;
