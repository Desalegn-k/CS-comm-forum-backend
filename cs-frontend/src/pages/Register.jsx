import React from 'react'
 import {Link, useNavigate} from 'react-router-dom';
  
 import { useRef  } from 'react';
 import axios from '../axiosConfig';


export default function Register() {
  const navigate=useNavigate();
  const useNameDom=useRef(null);
  const firstNameDom = useRef(null);
  const lastNameDom = useRef(null);
  const emailDom = useRef(null);
  const passwordDom = useRef(null);
  
  
  

  async function handleSubmit(e) {
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
          alert("please provide all requierd informations")
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
     navigate('/login')
      
    } catch (error) {
      alert("somthing went wrong ,please try again")
      console.log(error.response)
      
    }
  }

  return (
    <>
      <section>
        <div>
          <h2>Join the network</h2>
          <p>
            <span>
              Alrady have an account?<Link to="/login">Sign in</Link>
            </span>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="username">
            <input ref={useNameDom} name="username" type="text" placeholder="Username" />
          </div>
          <div className="F-L-name">
            <div className="F-name">
              <input ref={firstNameDom}name="firstname" type="text" placeholder="First name" />
            </div>
            <div className="L-name">
              <div className="L-name">
                <input 
                 ref={lastNameDom}name="lastname" type="text" placeholder="last name" />
              </div>
            </div>
          </div>
          <div className="email">
            <input ref={emailDom} name=" email" type="email" placeholder="email" />
          </div>
          <div className="pas-visble">
            <div className="password">
              <input 
              ref={passwordDom}name="password" type="password" placeholder="password" />
            </div>
            <div className="show">
              <img src="" alt="" /> to show the password{" "}
            </div>
          </div>
          I agree to the <Link to="/">privacy policy</Link> and{" "}
          <Link to="/">terms of service</Link>
          <div className="submit-btn">
            <button type="submit" className=" btn btn-primary" id="subm">
              Agree and Join
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
