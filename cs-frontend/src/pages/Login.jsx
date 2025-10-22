import { React,useState } from "react";
 import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
 import axios from "../axiosConfig";
 import "./css/Login.css";
// import Header from "./Header";

export default function Login() {
  // const [loading, setLoading] = useState(false); // loading indicator only
  //
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [underlineWidth, setUnderlineWidth] = useState(100); // start at full width

  const navigate = useNavigate();
  const emailDom = useRef(null);
  const passwordDom = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();

    // console.log(useNameDom.current.value)
    // console.log(firstNameDom.current.value);
    // console.log(lastNameDom.current.value);
    // console.log(emailDom.current.value);
    // console.log(passwordDom.current.value);

    const emailVlue = emailDom.current.value;
    const paswordvalue = passwordDom.current.value;
    if (!emailVlue || !paswordvalue) {
      //  alert("please provide all requierd informations");
      // login_warning.innerHTML = `Please provide all requierd informations`;
      //  return;
    }

    try {
      const { data } = await axios.post("/users/login", {
        email: emailVlue,
        password: paswordvalue,
      });
      //  this is from the displaywd sceern but the sound is annoing can i srop the sound

      //  alert(data.msg);
      localStorage.setItem("token", data.token);

      // Clear input fields
      emailDom.current.value = "Loading";
      passwordDom.current.value = "Loading";
      //  console.log(data);

      setMessage(data?.msg);
      setMessageType("success"); // ✅ green for success
      setUnderlineWidth(100);

      // gradually shrink the underline
      const totalDuration = 2000; // 2 seconds
      const intervalTime = 20; // update every 20ms
      const decrement = (intervalTime / totalDuration) * 100;

      const interval = setInterval(() => {
        setUnderlineWidth((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            // navigate("/"); // redirect when done
            return 0;
          }
          return prev - decrement;
        });
      }, intervalTime);

        

      setTimeout(() => {
         
        navigate("/"); // go to homepage after 2 seconds
        window.location.reload();
      }, 2000);

      //  window.location.reload();
    } catch (error) {
      setMessage(error.response.data.msg);

      setMessageType("error"); 
      //  alert(error?.response?.data?.msg);
       

      
    }
  }

  return (
    <>
      {/* <Header/> */}
      <section className="whole-co">
        <section className="login-container">
          <div className="internal-regi-container">
            <h1>Login To Your Account</h1>
            <h6 className="addition">
              <span className="dont">
                Don't have an account?
                <Link to="/register" className="Link">
                  Create a new account
                </Link>
              </span>
            </h6>
          </div>

          <h6
            id="login-warning"
            className={
              messageType === "success" ? "success-message" : "error-message"
            }
          >
            {message}
          </h6>
          {message && messageType === "success" && (
            <div className="success-message-container">
              <span className="success-text"> Please wait...</span>
              <div
                className="underline"
                style={{ width: underlineWidth + "%" }}
              ></div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="form">
            <div className="input-cont">
              <input
                ref={emailDom}
                name=" email"
                type="email"
                placeholder=" Enter your Email"
              />
            </div>
            <div className="pass-vi">
              <div className="paswordl">
                <input
                  ref={passwordDom}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                />
              </div>
              <div
                className="showl"
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
                      ? "/icons/normal.png" // eye with slash (🙈)
                      : "/icons/hidn.png" // normal eye (👁)
                  }
                  alt={showPassword ? "Hide password" : "Show password"}
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
            </div>

            <p className="forgot">
              <Link to="/ForgotPassword" className="Link">
                {" "}
                Forgot password?
              </Link>
            </p>
            <div className="submit-btn">
              <button type="submit" className=" btn btn-primary" id="subm">
                Login
              </button>
            </div>
          </form>
        </section>

        <section className="discription">
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
