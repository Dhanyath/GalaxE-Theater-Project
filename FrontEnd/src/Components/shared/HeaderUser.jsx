import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";
import logo1 from "../images/logo1.png";
import logo2 from "../images/logo2.png";
import "../styles/movie-style/Header.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function HeaderUser({ pass }) {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("code") != null) {
      setLoggedIn(true);
    }
  }, []);

  var navigate = useNavigate();
  return (
    <div className="header-finalmain">
      <div className="header-main">
        <div className="header-logo">
          <img src={logo} alt="Italian Trulli" />
        </div>

        <div className="header-logo2">
            <img src={logo2} alt="Italian Trulli" />
          <a href="/" style={{color:"white",textDecoration:"none"}}>
            Movies
          </a>
        </div>
        <div className="header-logo1">
          <img src={logo1} alt="Italian Trulli" />
          {/* <a href="/theater">&nbsp;Theaters</a> */}
          <a style={{ textDecoration: "none", color: "#ffff" }} href="/theater">
            &nbsp;Theaters
          </a>
        </div>
        <div>
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
