 import React, { useState } from "react";
 import { useParams } from "react-router-dom";
 import axios from "axios";

 const ResetPassword = () => {
   const { token } = useParams();
   const [password, setPassword] = useState("");
   const [message, setMessage] = useState("");

   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const res = await axios.post(
         `http://localhost:5300/api/users/reset-password/${token}`,
         { password }
       );
       setMessage(res.data.msg);
     } catch (err) {
       setMessage("Invalid or expired token");
     }
   };

   return (
     <div style={{ textAlign: "center", marginTop: "100px" }}>
       <h2>Reset Password</h2>
       <form onSubmit={handleSubmit} className="resetform">
         <input
           type="password"
           placeholder="Enter new password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           required
         />
        
         
         <button type="submit" className="resetbtn">Reset Password</button>
       </form>
       <p>{message}</p>
     </div>
   );
 };

 export default ResetPassword;
