import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import logo1 from "../images/logo1.png";
import logo2 from "../images/logo2.png";
import "../styles/movie-style/Header.css";
export default function Header({ pass }) {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("code") != null) {
      setLoggedIn(true);
    }
  }, []);
  return (
    <div className="header-finalmain">
      <div className="header-main">
        <div className="header-logo">
          <img src={logo} alt="Italian Trulli" />
        </div>

        <div className="header-logo2">
          <img src={logo2} alt="Italian Trulli" />
          <p>&nbsp;Movies</p>
        </div>
        <div>
          <div className="header-logo1">
            <img src={logo1} alt="Italian Trulli" />
            <p>
              <a
                style={{ textDecoration: "none", color: "#ffff" }}
                href="/theater"
              >
                &nbsp;Theaters
              </a>
            </p>
          </div>
        </div>

        <div>
          {console.log("Before", loggedIn)}
          {loggedIn && (
            <div className="header-user">
              <p>
                <a href="/viewSettings" className="header-admin">
                  Settings
                </a>
              </p>
            </div>
          )}
          {!loggedIn && (
            <div className="header-user">
              <a href="/LogIn" className="header-admin">
                Login/SignUp
                {/* <img src={logo1} className="header-logo4"></img> */}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
