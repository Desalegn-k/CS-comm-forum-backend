import {React,useState} from 'react'
 
 import {data, Link, useNavigate} from 'react-router-dom';
  
 import { useRef  } from 'react';
 import axios from '../axiosConfig';
 import './css/Register.css'
 
 


export default function Register() {
  const [message, setMessage] = useState("");

  const navigate=useNavigate();
  const useNameDom=useRef(null);
  const firstNameDom = useRef(null);
  const lastNameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);
   const [showPassword, setShowPassword] = useState(false);
  
  
  

  async function HandleSubmit(e) {
 
    e.preventDefault(useNameDom);
    // console.log(useNameDom.current.value)
    // console.log(firstNameDom.current.value);
    // console.log(lastNameDom.current.value);
    // console.log(emailDom.current.value);
    // console.log(passwordDom.current.value);
    const firstValue = firstNameDom.current.value;
    const usernameValue=useNameDom.current.value;
    const lastValue=lastNameDom.current.value;
        const emailVlue = emailDom.current.value;
        const paswordvalue = passwordDom.current.value;
        if (
          !usernameValue||
          !firstValue||
          !lastValue    ||
          !emailVlue||
          !paswordvalue

        ) {
          
          
         
          // const messeage1 = "please provide all requierd informations";

          // get.innerHTML = "please provide all requierd informations";
           setMessage("please provide all requierd informations");
          return;
          
        }
       
        
    try {
      await axios.post("/users/register",{
        username:usernameValue,
        firstname:firstValue,
        lastname:lastValue,
        email:emailVlue,
        password:paswordvalue
      });
      alert("register succefuly,please login")
      // setTimeout(()=>{get.innerHTML = "register succefuly,please login";},500)
      

     navigate('/login')
      
    } catch (error) {
      // alert(error.response.data.msg)
      
      //  get.innerHTML= error.response.data.msg;
      setMessage(error.response.data.msg);
      
       
        

      console.log(error.response)
      
    }
  }

  return (
    <>
      <section className="  whole-co">
        <section className="register-container">
          <div className="internal-regi-container">
            <h1 className="Join-network">Join the network</h1>
            <h4 className="already-container">
              <span className="span-already">

              

                Already Have An Account?



                <Link to="/login" className="sign-in">
                  Sign In
                </Link>
              </span>
            </h4>
          </div>
          <p id="provid">{message}</p>
          <form onSubmit={HandleSubmit}>
            <div className="input-cont">
              <input
                ref={useNameDom}
                name="user name"
                type="text"
                placeholder="User name*"
              />
            </div>
            <div className=" last-first ">
              <div className="F-name  ">
                <input
                  ref={firstNameDom}
                  name="firstname"
                  type="text"
                  placeholder="First name*"
                />
              </div>
              <div className="L-name  ">
                <div className=" ">
                  <input
                    ref={lastNameDom}
                    name="lastname"
                    type="text"
                    placeholder="Last name*"
                  />
                </div>
              </div>
            </div>
            <div className="input-cont">
              <input
                ref={emailDom}
                name=" email"
                type="email"
                placeholder="Email*"
              />
            </div>
            <div className="input-cont flex">
              <div className="password">
                <input
                  ref={passwordDom}
                  name="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="password*"
                />
              </div>
              <div
                className="show"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <img
                  src={
                    showPassword
                      ? "/icons/normal.png" // eye with slash 
                      : "/icons/hidn.png" // normal eye (👁)
                  }
                  alt={showPassword ? "Hide password" : "Show password"}
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
            </div>
            <div className="agree">
              I agree to the{" "}
              <Link to="#" className="privacy">
                privacy policy
              </Link>{" "}
              and{" "}
              <Link to="#" className="privacy">
                terms of service
              </Link>
            </div>

            <div className="submit-btn">
              <button type="submit" className=" btn btn-primary" id="subm">
                Agree and Join
              </button>
            </div>
          </form>
        </section>
        <section className="discription  ">
          <p className="about">About</p>
                   <h1 className="about-title">StackCampus</h1>
                   <p className="abouy-dis">
                     StackCampus is a collaborative learning platform built for students,
                     developers, and tech enthusiasts. It provides a space to ask
                     questions, share knowledge, and learn from peers — just like a
                     digital campus for coders.
                   </p>
                   <p className="abouy-dis">
                     Our mission is to empower learners by connecting them with a
                     supportive community where knowledge flows freely. Whether you're
                     solving coding challenges, exploring new technologies, or helping
                     others grow, StackCampus is where learning becomes teamwork.
                     <br />
                     <br />
                     <Link to="/Howitworks" className="haw-m1">
                       How it Works
                     </Link>
                   </p>
        </section>
      </section>
    </>
  );
}
