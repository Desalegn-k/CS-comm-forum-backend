import { React, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../componenets/Header.css";
import { Appstate } from "../App";

export default function Header() {
  const { user, setUser } = useContext(Appstate);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser({});
      navigate("/login");
    }
  }

  function handleHome() {
    const token = localStorage.getItem("token");
    if (!token) {
       
      navigate("/login");
      return;
    }
    navigate("/");
  }
  function handlehow(){
    navigate('/HowItWorks')

  }

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <>
      <header className="app-header">
        <Link to="#">
          <img src="/stack.png" alt="StackCampus" className="logo" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          <button className="home1" onClick={handleHome}>
            Home
          </button>

          <button className="how" onClick={handlehow}>
            <Link to="/HowItWorks"> How it Works</Link>
          </button>

          {user && user.firstname ? (
            <>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "#dc3545",
                  color: "#ffffff",
                  padding: "3px 20px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
              <span className="welcome">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstname}`}
                  alt="Profile"
                  className="avatar-pro"
                />
                <span className="usernamepro">{user.firstname}</span>
              </span>
            </>
          ) : (
            <>
              <Link to="/register">
                <button className="signup">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className="login-btn1">Login</button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="menu-container">
          <button
            onClick={toggleMenu}
            style={{
              border: "none",
              cursor: "pointer",
              background: "transparent",
            }}
          >
            <img
              src="/menu.png"
              alt="Menu"
              style={{
                width: "40px",
                height: "40px",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={handleHome} className="home">
            Home
          </button>
          <Link to="/HowItWorks" className="haw-m">
            How it Works
          </Link>

          {user && user.firstname ? (
            <>
              <button onClick={handleLogout} className="logout">
                Logout
              </button>
              <div className="mobile-user">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.firstname}`}
                  alt="Profile"
                  className="avatar-pro"
                />
                <span className="pro-m">{user.firstname}</span>
              </div>
            </>
          ) : (
            <Link to="/login" className="login-m">
              Login
            </Link>
          )}
        </div>
      )}
    </>
  );
}
