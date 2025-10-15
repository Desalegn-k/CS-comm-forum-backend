import { React } from "react";
 import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
 import axios from "../axiosConfig";

export default function Login() {
    const navigate = useNavigate();
  const emailDom = useRef(null);
    const passwordDom = useRef(null);
 async function handleSubmit(e) {
   e.preventDefault();
   // console.log(useNameDom.current.value)
   // console.log(firstNameDom.current.value);
   // console.log(lastNameDom.current.value);
   // console.log(emailDom.current.value);
   // console.log(passwordDom.current.value);
    
    
   const emailVlue = emailDom.current.value;
   const paswordvalue = passwordDom.current.value;
   if (
      
     !emailVlue ||
     !paswordvalue
   ) {
     alert("please provide all requierd informations");
     return;
   }

   try {
     await axios.post("/users/login", {
        
       email: emailVlue,
       password: paswordvalue,
     });
     alert(" succefuly loged in,redirecting to the home page");
     navigate("/");
   } catch (error) {
     alert("somthing went wrong ,please try again");
     console.log(error.response);
   }
 }

  return (
    <>
      <section>
        <div>
          <h2>Login to your Account</h2>
          <p>
            <span>Don't have an account?<Link to='/register'>Create a new account</Link></span>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
           
          <div className="email">
            <input  ref={emailDom}name=" email" type="email" placeholder=" Enter your Email" />
          </div>
          <div className="pas-visble">
            <div className="password">
              <input  ref={passwordDom}name="password" type="password" placeholder="Enter your password" />
            </div>
            <div className="show">
              <img src="" alt="" /> to show the password{" "}
            </div>
          </div>
           
          <Link to="/ForgotPassword"> Forgot password?</Link>
          <div className="submit-btn">
            <button type="submit" className=" btn btn-primary" id="subm">
             Login
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
