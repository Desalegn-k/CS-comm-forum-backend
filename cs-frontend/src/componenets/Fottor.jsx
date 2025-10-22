import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Fottor.css"; // for styling

export default function Layout() {
  return (
    <div>
      {/* Footer */}

      <footer className="app-footer">
        <div className="logo-icon">
          <img src="/stack.png" alt="StackCampus" />
          <div class="social-icons">
            <a href="https://www.instagram.com/desalegn.kerie" target="_blank">
              <i class="bi bi-instagram"></i>
            </a>
            <a href="https://t.me/Desu_Love" target="_blank">
              <i class="bi bi-telegram"></i>
            </a>
            <a href="https://twitter.com/Dkerie3265" target="_blank">
              <i class="bi bi-twitter"></i>
            </a>
            <a href="#" target="">
              <i class="bi bi-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="terms">
          <ul>
            <li>
              <Link to="#">Terms of service</Link>
            </li>
            <li>
              <Link to="#">Privacy Policy</Link>
            </li>
            <li>
              <li>
                <p>© {new Date().getFullYear()} MyApp. All rights reserved.</p>
              </li>
            </li>
          </ul>
        </div>
        <div className="contact">
          <ul>
            <li>
              <Link to="https://dessie.netlify.app/">dessie.netlify.app</Link>
            </li>
            <li>
              <Link to="#">+251 924644564//932655680</Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
